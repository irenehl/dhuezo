'use client'

import { useState, useEffect, useMemo } from 'react'
import { experienceService } from '@/lib/services/experience-service'
import type { Experience } from '@/types/experience'
import { ExperienceCard } from './ExperienceCard'
import { ExperienceDetailDialog } from './ExperienceDetailDialog'
import { Loader2 } from 'lucide-react'

export function ExperienceGrid() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = await experienceService.getAllExperiences()
      setExperiences(data)
      setLoading(false)
    }

    fetchExperiences()
  }, [])

  const handleCardClick = (experience: Experience) => {
    setSelectedExperience(experience)
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay experiencias disponibles</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
            onClick={() => handleCardClick(experience)}
          />
        ))}
      </div>

      <ExperienceDetailDialog
        experience={selectedExperience}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
