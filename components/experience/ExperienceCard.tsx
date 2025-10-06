'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Briefcase } from 'lucide-react'
import type { Experience } from '@/types/experience'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'

interface ExperienceCardProps {
  experience: Experience
  index: number
  onClick: () => void
}

export function ExperienceCard({ experience, index, onClick }: ExperienceCardProps) {
  const {
    title,
    company,
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden h-full hover:shadow-2xl transition-shadow duration-300 group">
        {/* Image */}
        {image_url && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={image_url}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            
            {isCurrentJob && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500">Actual</Badge>
              </div>
            )}
          </div>
        )}

        <CardContent className="p-6 space-y-4">
          {/* Title and Company */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-lg text-muted-foreground flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              {company}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(start_date)} - {end_date ? formatDate(end_date) : 'Presente'}
            </div>
            {location && (
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {location}
              </div>
            )}
          </div>

          {/* Type Badge */}
          {type && (
            <Badge variant="outline" className="capitalize">
              {type.replace('-', ' ')}
            </Badge>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {technologies.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{technologies.length - 5} más
              </Badge>
            )}
          </div>

          {/* Click indicator */}
          <p className="text-xs text-muted-foreground italic">
            Click para ver más detalles →
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
