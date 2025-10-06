'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
