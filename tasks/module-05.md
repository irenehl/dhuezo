# Módulo 05: Página de Experiencia

## Objetivo
Crear una página con tarjetas flotantes que muestran experiencias laborales. Las tarjetas deben ser clickeables para mostrar más información en un modal.

---

## Tarea 5.1: Configurar tabla de experiencias en Supabase
**Objetivo**: Crear estructura de datos para experiencias

**Ejecutar en Supabase SQL Editor**:
```sql
-- Crear tabla de experiencias
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[] DEFAULT '{}',
  start_date DATE NOT NULL,
  end_date DATE,
  image_url TEXT,
  company_logo TEXT,
  location TEXT,
  type TEXT, -- 'full-time', 'part-time', 'contract', 'freelance'
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Anyone can view experiences"
  ON experiences FOR SELECT
  USING (true);

-- Índice para ordenar
CREATE INDEX experiences_order_idx ON experiences(order_index);
CREATE INDEX experiences_date_idx ON experiences(start_date DESC);
```

---

## Tarea 5.2: Insertar datos de ejemplo
**Objetivo**: Agregar experiencias de prueba

**Ejecutar en Supabase SQL Editor**:
```sql
INSERT INTO experiences (title, company, description, long_description, technologies, start_date, end_date, image_url, location, type, featured, order_index)
VALUES
  (
    'Senior Full Stack Developer',
    'TechCorp Inc.',
    'Lideré el desarrollo de aplicaciones web escalables usando tecnologías modernas.',
    'En mi rol como Senior Full Stack Developer, lideré un equipo de 5 desarrolladores en la creación de una plataforma SaaS que alcanzó más de 10,000 usuarios activos. Implementé arquitecturas de microservicios, optimicé el rendimiento de la base de datos y establecí prácticas de CI/CD que redujeron el tiempo de despliegue en un 60%.',
    ARRAY['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    '2022-01-01',
    NULL,
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    'San Francisco, CA',
    'full-time',
    true,
    1
  ),
  (
    'Frontend Developer',
    'StartupXYZ',
    'Desarrollé interfaces de usuario modernas y responsivas para aplicaciones web.',
    'Como Frontend Developer, transformé diseños de Figma en componentes React reutilizables y optimizados. Implementé animaciones suaves con Framer Motion, mejoré la accesibilidad web siguiendo estándares WCAG 2.1, y reduje el tiempo de carga de la página en un 40% mediante técnicas de optimización.',
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    '2020-06-01',
    '2021-12-31',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    'Remote',
    'full-time',
    true,
    2
  ),
  (
    'Freelance Web Developer',
    'Varios Clientes',
    'Proyectos freelance de desarrollo web para clientes internacionales.',
    'Durante mi etapa como freelancer, trabajé con más de 15 clientes de diferentes industrias, entregando proyectos desde landing pages hasta aplicaciones web completas. Desarrollé soluciones personalizadas usando WordPress, React, y Node.js, siempre enfocándome en la experiencia del usuario y el rendimiento.',
    ARRAY['WordPress', 'JavaScript', 'PHP', 'React', 'CSS'],
    '2018-03-01',
    '2020-05-31',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    'Remote',
    'freelance',
    false,
    3
  );
```

---

## Tarea 5.3: Crear tipos para experiencias
**Objetivo**: Definir interfaces TypeScript

**Archivo**: `/types/experience.ts`
```typescript
export interface Experience {
  id: string
  title: string
  company: string
  description: string
  long_description?: string
  technologies: string[]
  start_date: string
  end_date: string | null
  image_url: string | null
  company_logo: string | null
  location?: string
  type?: 'full-time' | 'part-time' | 'contract' | 'freelance'
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}
```

---

## Tarea 5.4: Crear servicio de experiencias
**Objetivo**: Funciones para obtener datos de Supabase

**Archivo**: `/lib/services/experience-service.ts`
```typescript
import { createClient } from '@/lib/supabase/client'
import type { Experience } from '@/types/experience'

const supabase = createClient()

export const experienceService = {
  // Obtener todas las experiencias
  async getAllExperiences(): Promise<Experience[]> {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching experiences:', error)
      return []
    }

    return data as Experience[]
  },

  // Obtener experiencias destacadas
  async getFeaturedExperiences(): Promise<Experience[]> {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('featured', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching featured experiences:', error)
      return []
    }

    return data as Experience[]
  },

  // Obtener una experiencia por ID
  async getExperienceById(id: string): Promise<Experience | null> {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching experience:', error)
      return null
    }

    return data as Experience
  },
}
```

---

## Tarea 5.5: Crear componente de tarjeta de experiencia
**Objetivo**: Tarjeta flotante con animación

**Archivo**: `/components/experience/ExperienceCard.tsx`
```typescript
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
```

---

## Tarea 5.6: Crear modal de detalle de experiencia
**Objetivo**: Dialog con información completa

**Archivo**: `/components/experience/ExperienceDetailDialog.tsx`
```typescript
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
```

---

## Tarea 5.7: Crear página de experiencias
**Objetivo**: Layout principal con grid de tarjetas

**Archivo**: `/app/experience/page.tsx`
```typescript
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ExperienceGrid } from '@/components/experience/ExperienceGrid'

export const metadata = {
  title: 'Experiencia | Portfolio',
  description: 'Mi experiencia profesional en desarrollo de software',
}

export default function ExperiencePage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Mi Experiencia
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un recorrido por los proyectos y roles que han dado forma a mi carrera en desarrollo de software
          </p>
        </div>

        {/* Experience Grid */}
        <ExperienceGrid />
      </div>
    </PageWrapper>
  )
}
```

---

## Tarea 5.8: Crear componente de grid de experiencias
**Objetivo**: Grid responsivo con animaciones

**Archivo**: `/components/experience/ExperienceGrid.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
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
```

---

## Tarea 5.9: Crear efecto de partículas flotantes (opcional)
**Objetivo**: Fondo animado para la página

**Archivo**: `/components/experience/FloatingParticles.tsx`
```typescript
'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function FloatingParticles() {
  const particles = Array.from({ length: 20 })

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  )
}
```

---

## Tarea 5.10: Agregar filtros de experiencia
**Objetivo**: Filtrar por tipo o tecnología

**Archivo**: `/components/experience/ExperienceFilters.tsx`
```typescript
'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ExperienceFiltersProps {
  technologies: string[]
  selectedTech: string | null
  onTechSelect: (tech: string | null) => void
}

export function ExperienceFilters({
  technologies,
  selectedTech,
  onTechSelect,
}: ExperienceFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtrar por tecnología</h3>
        {selectedTech && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTechSelect(null)}
          >
            <X className="mr-2 h-4 w-4" />
            Limpiar filtro
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge
            key={tech}
            variant={selectedTech === tech ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => onTechSelect(selectedTech === tech ? null : tech)}
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  )
}
```

---

## Tarea 5.11: Actualizar ExperienceGrid con filtros
**Objetivo**: Implementar funcionalidad de filtrado

**Archivo**: `/components/experience/ExperienceGrid.tsx` (actualización)
```typescript
'use client'

import { useState, useEffect, useMemo } from 'react'
import { experienceService } from '@/lib/services/experience-service'
import type { Experience } from '@/types/experience'
import { ExperienceCard } from './ExperienceCard'
import { ExperienceDetailDialog } from './ExperienceDetailDialog'
import { ExperienceFilters } from './ExperienceFilters'
import { Loader2 } from 'lucide-react'

export function ExperienceGrid() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = await experienceService.getAllExperiences()
      setExperiences(data)
      setLoading(false)
    }

    fetchExperiences()
  }, [])

  // Extraer todas las tecnologías únicas
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>()
    experiences.forEach((exp) => {
      exp.technologies.forEach((tech) => techs.add(tech))
    })
    return Array.from(techs).sort()
  }, [experiences])

  // Filtrar experiencias
  const filteredExperiences = useMemo(() => {
    if (!selectedTech) return experiences
    return experiences.filter((exp) =>
      exp.technologies.includes(selectedTech)
    )
  }, [experiences, selectedTech])

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
      {allTechnologies.length > 0 && (
        <ExperienceFilters
          technologies={allTechnologies}
          selectedTech={selectedTech}
          onTechSelect={setSelectedTech}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
            onClick={() => handleCardClick(experience)}
          />
        ))}
      </div>

      {filteredExperiences.length === 0 && selectedTech && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No hay experiencias con la tecnología <strong>{selectedTech}</strong>
          </p>
        </div>
      )}

      <ExperienceDetailDialog
        experience={selectedExperience}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
```

---

## Tarea 5.12: Agregar animación de timeline (opcional)
**Objetivo**: Vista alternativa en timeline

**Archivo**: `/components/experience/ExperienceTimeline.tsx`
```typescript
'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin } from 'lucide-react'
import type { Experience } from '@/types/experience'
import { formatDate } from '@/lib/utils'

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

      {/* Timeline Items */}
      <div className="space-y-12">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative flex ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8`}
            >
              {/* Content */}
              <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                <h3 className="text-2xl font-bold">{exp.title}</h3>
                <p className="text-lg text-muted-foreground">{exp.company}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Presente'}
                  </span>
                  {exp.location && (
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {exp.location}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-muted-foreground">{exp.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.technologies.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
```

---

## Verificación Final del Módulo 05
- [ ] La tabla de experiencias está creada en Supabase
- [ ] Los datos de ejemplo están insertados
- [ ] Las tarjetas de experiencia se muestran correctamente
- [ ] Las tarjetas tienen animación de hover
- [ ] El modal de detalles se abre al hacer click
- [ ] Los filtros por tecnología funcionan
- [ ] El grid es responsivo en móvil
- [ ] Las animaciones se ejecutan suavemente
- [ ] Las imágenes se cargan correctamente
- [ ] El formateo de fechas es correcto

**Siguiente módulo**: `module-06-color-palette.md`