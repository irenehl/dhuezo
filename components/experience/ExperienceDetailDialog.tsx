'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, MapPin, Briefcase, ExternalLink } from 'lucide-react'
import type { Experience } from '@/types/experience'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ExperienceDetailDialogProps {
  experience: Experience | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExperienceDetailDialog({
  experience,
  open,
  onOpenChange,
}: ExperienceDetailDialogProps) {
  if (!experience) return null

  const {
    title,
    company,
    long_description,
    description,
    technologies,
    start_date,
    end_date,
    image_url,
    location,
    type,
  } = experience

  const isCurrentJob = !end_date

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header Image */}
        {image_url && (
          <div className="relative h-64 w-full -mx-6 -mt-6 mb-4">
            <Image
              src={image_url}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            
            {isCurrentJob && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500">Posición Actual</Badge>
              </div>
            )}
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="text-3xl">{title}</DialogTitle>
          <DialogDescription className="text-lg flex items-center">
            <Briefcase className="mr-2 h-5 w-5" />
            {company}
          </DialogDescription>
        </DialogHeader>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {formatDate(start_date)} - {end_date ? formatDate(end_date) : 'Presente'}
          </div>
          {location && (
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {location}
            </div>
          )}
          {type && (
            <Badge variant="outline" className="capitalize">
              {type.replace('-', ' ')}
            </Badge>
          )}
        </div>

        <Separator />

        {/* Description */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Sobre el rol</h3>
          <p className="text-muted-foreground leading-relaxed">
            {long_description || description}
          </p>
        </div>

        <Separator />

        {/* Technologies */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Tecnologías utilizadas</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
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
      </DialogContent>
    </Dialog>
  )
}
