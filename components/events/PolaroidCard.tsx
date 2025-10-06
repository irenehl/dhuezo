'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, User } from 'lucide-react'
import type { Event } from '@/types/event'
import { formatDate } from '@/lib/utils'
import { MotionWrapper, optimizedVariants } from '@/components/ui/motion-wrapper'
import Image from 'next/image'

interface PolaroidCardProps {
  event: Event
  index: number
  onClick: () => void
}

export function PolaroidCard({ event, index, onClick }: PolaroidCardProps) {
  // Rotación determinística para efecto polaroid (evita hydration mismatch)
  const hash = event.id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  const randomRotation = (index % 2 === 0 ? 1 : -1) * ((Math.abs(hash) % 30) / 10 + 1)

  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotate: randomRotation 
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100 
      }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.2 }
      }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="bg-white p-4 shadow-xl hover:shadow-2xl transition-shadow">
        {/* Polaroid Image */}
        <div className="relative aspect-square w-full mb-4 bg-muted overflow-hidden">
          <Image
            src={event.image_url}
            alt={event.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          
          {/* Featured Badge */}
          {event.featured && (
            <Badge className="absolute top-2 right-2 bg-yellow-500">
              ⭐ Destacado
            </Badge>
          )}
        </div>

        {/* Polaroid Caption Area */}
        <div className="space-y-3">
          {/* Event Name - Handwritten style */}
          <h3 className="font-handwriting text-xl text-center text-gray-800">
            {event.name}
          </h3>

          {/* Meta Info */}
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(event.date)}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
            {event.role && (
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span className="capitalize">{event.role}</span>
              </div>
            )}
          </div>

          {/* Type Badge */}
          {event.event_type && (
            <div className="flex justify-center">
              <Badge variant="outline" className="capitalize text-xs">
                {event.event_type}
              </Badge>
            </div>
          )}
        </div>
      </Card>
    </MotionWrapper>
  )
}
