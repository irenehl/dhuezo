# Módulo 08: Compartir Imágenes con WebSockets en Tiempo Real

## Objetivo
Crear una galería donde usuarios autenticados pueden subir imágenes y ver en tiempo real lo que otros usuarios están subiendo usando Supabase Realtime (WebSockets).

---

## Tarea 8.1: Configurar Storage en Supabase
**Objetivo**: Crear bucket para almacenar imágenes

**Ejecutar en Supabase Dashboard**:

1. Ir a Storage > Create Bucket
2. Crear bucket llamado "shared-images"
3. Configurar:
   - Public bucket: Yes
   - File size limit: 5MB
   - Allowed MIME types: image/jpeg, image/png, image/gif, image/webp

**SQL para configurar políticas**:
```sql
-- Política para subir imágenes (solo usuarios autenticados)
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'shared-images');

-- Política para ver imágenes (todos)
CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'shared-images');

-- Política para eliminar imágenes (solo el dueño)
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'shared-images' AND auth.uid() = owner);
```

---

## Tarea 8.2: Crear tabla de imágenes compartidas
**Objetivo**: Guardar metadata de las imágenes

**Ejecutar en Supabase SQL Editor**:
```sql
-- Crear tabla de shared_images
CREATE TABLE IF NOT EXISTS shared_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  caption TEXT,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE shared_images ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Anyone can view images"
  ON shared_images FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert images"
  ON shared_images FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images"
  ON shared_images FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own images"
  ON shared_images FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Índices
CREATE INDEX shared_images_user_id_idx ON shared_images(user_id);
CREATE INDEX shared_images_created_at_idx ON shared_images(created_at DESC);

-- Habilitar Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE shared_images;
```

---

## Tarea 8.3: Crear tipos para imágenes compartidas
**Objetivo**: Definir interfaces TypeScript

**Archivo**: `/types/shared-image.ts`
```typescript
export interface SharedImage {
  id: string
  user_id: string
  image_url: string
  storage_path: string
  caption: string | null
  file_name: string
  file_size: number | null
  mime_type: string | null
  created_at: string
  user?: {
    email: string
    full_name?: string
    avatar_url?: string
  }
}

export interface UploadImageParams {
  file: File
  caption?: string
}

export interface ImageUploadProgress {
  progress: number
  uploading: boolean
  error: string | null
}
```

---

## Tarea 8.4: Crear servicio de imágenes
**Objetivo**: Funciones para subir y obtener imágenes

**Archivo**: `/lib/services/image-service.ts`
```typescript
import { createClient } from '@/lib/supabase/client'
import type { SharedImage, UploadImageParams } from '@/types/shared-image'

const supabase = createClient()

export const imageService = {
  // Subir imagen
  async uploadImage({ file, caption }: UploadImageParams): Promise<SharedImage> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    // Generar nombre único
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    const filePath = `${user.id}/${fileName}`

    // Subir a Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('shared-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) throw uploadError

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('shared-images')
      .getPublicUrl(filePath)

    // Guardar metadata en la base de datos
    const { data: imageData, error: dbError } = await supabase
      .from('shared_images')
      .insert({
        user_id: user.id,
        image_url: publicUrl,
        storage_path: filePath,
        caption: caption || null,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
      })
      .select()
      .single()

    if (dbError) {
      // Si falla el insert, eliminar imagen del storage
      await supabase.storage.from('shared-images').remove([filePath])
      throw dbError
    }

    return imageData as SharedImage
  },

  // Obtener todas las imágenes
  async getAllImages(limit = 50): Promise<SharedImage[]> {
    const { data, error } = await supabase
      .from('shared_images')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching images:', error)
      return []
    }

    return data as SharedImage[]
  },

  // Obtener imágenes de un usuario
  async getUserImages(userId: string): Promise<SharedImage[]> {
    const { data, error } = await supabase
      .from('shared_images')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user images:', error)
      return []
    }

    return data as SharedImage[]
  },

  // Eliminar imagen
  async deleteImage(imageId: string, storagePath: string): Promise<void> {
    // Eliminar de storage
    const { error: storageError } = await supabase.storage
      .from('shared-images')
      .remove([storagePath])

    if (storageError) throw storageError

    // Eliminar de base de datos
    const { error: dbError } = await supabase
      .from('shared_images')
      .delete()
      .eq('id', imageId)

    if (dbError) throw dbError
  },

  // Suscribirse a cambios en tiempo real
  subscribeToImages(callback: (image: SharedImage) => void) {
    const channel = supabase
      .channel('shared-images-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'shared_images',
        },
        (payload) => {
          callback(payload.new as SharedImage)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  },
}
```

---

## Tarea 8.5: Crear hook para tiempo real
**Objetivo**: Hook personalizado para manejar WebSockets

**Archivo**: `/lib/hooks/use-realtime-images.ts`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { imageService } from '@/lib/services/image-service'
import type { SharedImage } from '@/types/shared-image'
import { useToast } from '@/components/ui/use-toast'

export function useRealtimeImages() {
  const [images, setImages] = useState<SharedImage[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Cargar imágenes iniciales
    const loadImages = async () => {
      const data = await imageService.getAllImages()
      setImages(data)
      setLoading(false)
    }

    loadImages()

    // Suscribirse a cambios en tiempo real
    const unsubscribe = imageService.subscribeToImages((newImage) => {
      setImages((prev) => [newImage, ...prev])
      
      // Notificar al usuario
      toast({
        title: '¡Nueva imagen compartida!',
        description: newImage.caption || 'Alguien acaba de subir una imagen',
      })
    })

    return () => {
      unsubscribe()
    }
  }, [toast])

  const addImage = (image: SharedImage) => {
    setImages((prev) => [image, ...prev])
  }

  const removeImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  return {
    images,
    loading,
    addImage,
    removeImage,
  }
}
```

---

## Tarea 8.6: Crear componente de subida de imágenes
**Objetivo**: Formulario para subir imágenes con preview

**Archivo**: `/components/gallery/ImageUpload.tsx`
```typescript
'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { imageService } from '@/lib/services/image-service'
import { useToast } from '@/components/ui/use-toast'
import { Upload, Loader2, X, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ImageUploadProps {
  onUploadSuccess?: (image: any) => void
}

export function ImageUpload({ onUploadSuccess }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validar tipo de archivo
    if (!selectedFile.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Por favor selecciona un archivo de imagen válido',
        variant: 'destructive',
      })
      return
    }

    // Validar tamaño (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'La imagen no puede superar los 5MB',
        variant: 'destructive',
      })
      return
    }

    setFile(selectedFile)

    // Crear preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)

    try {
      const image = await imageService.uploadImage({
        file,
        caption: caption.trim() || undefined,
      })

      toast({
        title: '¡Imagen subida!',
        description: 'Tu imagen ha sido compartida con éxito',
      })

      onUploadSuccess?.(image)

      // Resetear formulario
      setFile(null)
      setPreview(null)
      setCaption('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: 'Error',
        description: 'No se pudo subir la imagen. Intenta de nuevo.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleClearFile = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Compartir Imagen
        </CardTitle>
        <CardDescription>
          Sube una imagen para compartirla con la comunidad en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          {/* File Input */}
          <div className="space-y-2">
            <Label htmlFor="image">Imagen</Label>
            <div className="flex gap-2">
              <Input
                ref={fileInputRef}
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="flex-1"
              />
              {file && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClearFile}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF o WEBP (máx. 5MB)
            </p>
          </div>

          {/* Preview */}
          <AnimatePresence>
            {preview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative w-full aspect-video rounded-lg overflow-hidden border border-border"
              >
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Descripción (opcional)</Label>
            <Textarea
              id="caption"
              placeholder="Añade una descripción a tu imagen..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              disabled={uploading}
              maxLength={200}
              rows={3}
            />
            <p className="text-xs text-muted-foreground text-right">
              {caption.length}/200
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!file || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Compartir Imagen
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

---

## Tarea 8.7: Crear componente de tarjeta de imagen
**Objetivo**: Mostrar cada imagen con info del usuario

**Archivo**: `/components/gallery/ImageCard.tsx`
```typescript
'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Trash2, Clock, User } from 'lucide-react'
import type { SharedImage } from '@/types/shared-image'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useAuth } from '@/lib/auth/use-auth'
import { imageService } from '@/lib/services/image-service'
import { useToast } from '@/components/ui/use-toast'

interface ImageCardProps {
  image: SharedImage
  index: number
  onDelete?: (imageId: string) => void
}

export function ImageCard({ image, index, onDelete }: ImageCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [deleting, setDeleting] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const isOwner = user?.id === image.user_id

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) return

    setDeleting(true)
    try {
      await imageService.deleteImage(image.id, image.storage_path)
      onDelete?.(image.id)
      toast({
        title: 'Imagen eliminada',
        description: 'La imagen ha sido eliminada correctamente',
      })
    } catch (error) {
      console.error('Error deleting image:', error)
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la imagen',
        variant: 'destructive',
      })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
        {/* Image */}
        <div className="relative aspect-square w-full bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse">
                <div className="h-12 w-12 rounded-full bg-muted-foreground/20" />
              </div>
            </div>
          )}
          <Image
            src={image.image_url}
            alt={image.caption || 'Shared image'}
            fill
            className={`object-cover transition-opacity ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {isOwner && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {deleting ? 'Eliminando...' : 'Eliminar'}
              </Button>
            )}
          </div>

          {/* New badge */}
          {isImageNew(image.created_at) && (
            <Badge className="absolute top-2 right-2 bg-green-500">
              Nuevo
            </Badge>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Caption */}
          {image.caption && (
            <p className="text-sm line-clamp-2">{image.caption}</p>
          )}

          {/* User Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-3 w-3" />
              <span>Usuario</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(image.created_at)}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Helper function to check if image is new (less than 5 minutes)
function isImageNew(createdAt: string): boolean {
  const imageTime = new Date(createdAt).getTime()
  const now = new Date().getTime()
  const fiveMinutes = 5 * 60 * 1000
  return now - imageTime < fiveMinutes
}
```

---

## Tarea 8.8: Crear grid de galería con tiempo real
**Objetivo**: Grid que se actualiza en tiempo real

**Archivo**: `/components/gallery/RealtimeGallery.tsx`
```typescript
'use client'

import { useRealtimeImages } from '@/lib/hooks/use-realtime-images'
import { ImageCard } from './ImageCard'
import { Loader2, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function RealtimeGallery() {
  const { images, loading, removeImage } = useRealtimeImages()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <ImageIcon className="h-16 w-16 text-muted-foreground" />
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">No hay imágenes aún</p>
          <p className="text-sm text-muted-foreground">
            Sé el primero en compartir una imagen
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            index={index}
            onDelete={removeImage}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
```

---

## Tarea 8.9: Crear página de galería
**Objetivo**: Página principal de compartir imágenes

**Archivo**: `/app/gallery/page.tsx`
```typescript
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ImageUpload } from '@/components/gallery/ImageUpload'
import { RealtimeGallery } from '@/components/gallery/RealtimeGallery'
import { ProtectedRoute } from '@/lib/auth/protected-route'
import { Image as ImageIcon, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Galería en Tiempo Real | Portfolio',
  description: 'Comparte imágenes y ve en tiempo real lo que otros suben',
}

export default function GalleryPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <ImageIcon className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Galería en Tiempo Real
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comparte tus imágenes y observa en tiempo real lo que otros usuarios están subiendo
          </p>
        </div>

        {/* Realtime Info */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Actualización en Tiempo Real</h3>
                <p className="text-sm text-muted-foreground">
                  Esta galería utiliza WebSockets para mostrar instantáneamente las imágenes que
                  otros usuarios suben. No necesitas recargar la página para ver el contenido nuevo.
                  Solo usuarios autenticados pueden subir imágenes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Section - Protected */}
        <div className="mb-12">
          <ProtectedRoute redirectTo="/gallery">
            <ImageUpload />
          </ProtectedRoute>
        </div>

        {/* Gallery */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Imágenes Compartidas</h2>
          <RealtimeGallery />
        </div>
      </div>
    </PageWrapper>
  )
}
```

---

## Tarea 8.10: Agregar indicador de usuarios en línea (opcional)
**Objetivo**: Mostrar cuántos usuarios están viendo la galería

**Archivo**: `/components/gallery/OnlineUsers.tsx`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function OnlineUsers() {
  const [onlineCount, setOnlineCount] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase.channel('online-users')

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        setOnlineCount(Object.keys(state).length)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
          })
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Badge variant="secondary" className="gap-2">
        <Users className="h-3 w-3" />
        <span>{onlineCount} {onlineCount === 1 ? 'usuario' : 'usuarios'} en línea</span>
      </Badge>
    </motion.div>
  )
}
```

---

## Verificación Final del Módulo 08
- [ ] El bucket de Storage está configurado
- [ ] La tabla de imágenes está creada
- [ ] Las políticas RLS están activas
- [ ] El Realtime está habilitado en la tabla
- [ ] Los usuarios pueden subir imágenes
- [ ] Las imágenes se muestran en la galería
- [ ] Los cambios se reflejan en tiempo real
- [ ] Solo usuarios autenticados pueden subir
- [ ] Los usuarios pueden eliminar sus propias imágenes
- [ ] El indicador de "Nuevo" funciona
- [ ] El contador de usuarios en línea funciona

**Siguiente módulo**: `module-09-events-gallery.md`