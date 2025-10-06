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

