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

