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

