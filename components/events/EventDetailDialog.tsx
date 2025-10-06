'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, MapPin, User, ExternalLink, Award } from 'lucide-react'
import type { Event } from '@/types/event'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface EventDetailDialogProps {
  event: Event | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventDetailDialog({
  event,
  open,
  onOpenChange,
}: EventDetailDialogProps) {
  if (!event) return null

  const roleEmoji = {
    speaker: '🎤',
    attendee: '👤',
    organizer: '🎯',
    sponsor: '💼',
    volunteer: '🤝',
  }

  const typeEmoji = {
    conference: '🎪',
    workshop: '🛠️',
    meetup: '☕',
    hackathon: '💻',
    talk: '🗣️',
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header Image */}
        <div className="relative h-64 w-full -mx-6 -mt-6 mb-4">
          <Image
            src={event.image_url}
            alt={event.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {event.featured && (
            <Badge className="absolute top-4 right-4 bg-yellow-500">
              <Award className="mr-1 h-3 w-3" />
              Evento Destacado
            </Badge>
          )}
        </div>

        <DialogHeader>
          <DialogTitle className="text-3xl">{event.name}</DialogTitle>
          <DialogDescription className="text-base">
            {event.description}
          </DialogDescription>
        </DialogHeader>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(event.date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          )}
          {event.role && (
            <Badge variant="secondary" className="gap-1">
              <span>{roleEmoji[event.role]}</span>
              <span className="capitalize">{event.role}</span>
            </Badge>
          )}
          {event.event_type && (
            <Badge variant="outline" className="gap-1">
              <span>{typeEmoji[event.event_type]}</span>
              <span className="capitalize">{event.event_type}</span>
            </Badge>
          )}
        </div>

        <Separator />

        {/* Long Description */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Sobre el evento</h3>
          <p className="text-muted-foreground leading-relaxed">
            {event.long_description || event.description}
          </p>
        </div>

        {/* Technologies */}
        {event.technologies.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                {event.technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge variant="secondary" className="text-sm py-1 px-3">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Website Link */}
        {event.website_url && (
          <>
            <Separator />
            <Button asChild className="w-full">
              <a
                href={event.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visitar sitio web del evento
              </a>
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
