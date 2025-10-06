# Módulo 09: Galería de Eventos Estilo Polaroid

## Objetivo
Crear una galería de eventos con diseño tipo colección de polaroids, donde cada evento tiene información detallada y se puede ver en un modal.

---

## Tarea 9.1: Crear tabla de eventos en Supabase
**Objetivo**: Estructura para almacenar eventos

**Ejecutar en Supabase SQL Editor**:
```sql
-- Crear tabla de events
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT NOT NULL,
  location TEXT,
  event_type TEXT, -- 'conference', 'workshop', 'meetup', 'hackathon', 'talk'
  role TEXT, -- 'speaker', 'attendee', 'organizer', 'sponsor', 'volunteer'
  technologies TEXT[] DEFAULT '{}',
  website_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

-- Índices
CREATE INDEX events_date_idx ON events(date DESC);
CREATE INDEX events_order_idx ON events(order_index);
CREATE INDEX events_featured_idx ON events(featured);
```

---

## Tarea 9.2: Insertar datos de ejemplo de eventos
**Objetivo**: Agregar eventos de muestra

**Ejecutar en Supabase SQL Editor**:
```sql
INSERT INTO events (name, date, description, long_description, image_url, location, event_type, role, technologies, website_url, featured, order_index)
VALUES
  (
    'React Conf 2024',
    '2024-05-15',
    'La conferencia anual más grande de React con los mejores speakers de la comunidad.',
    'Participé en React Conf 2024, el evento más importante del ecosistema React. Durante tres días intensos, asistí a talks sobre Server Components, el nuevo compilador de React, y las últimas tendencias en desarrollo web. Fue una experiencia increíble conectar con otros desarrolladores y aprender de los creadores del framework.',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    'San Francisco, CA',
    'conference',
    'attendee',
    ARRAY['React', 'Next.js', 'TypeScript', 'Server Components'],
    'https://conf.react.dev',
    true,
    1
  ),
  (
    'JS Nation 2024',
    '2024-06-20',
    'La conferencia de JavaScript más grande de Europa con talks sobre el futuro del lenguaje.',
    'Tuve el honor de ser speaker en JS Nation 2024, presentando mi talk "Building Real-time Applications with WebSockets". La audiencia fue increíble y recibí feedback muy positivo. Además, participé en varios workshops sobre performance optimization y modern JavaScript patterns.',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    'Ámsterdam, Países Bajos',
    'conference',
    'speaker',
    ARRAY['JavaScript', 'WebSockets', 'Node.js', 'Performance'],
    'https://jsnation.com',
    true,
    2
  ),
  (
    'Local Dev Meetup',
    '2024-07-10',
    'Meetup mensual de desarrolladores locales para compartir conocimientos y networking.',
    'Organicé nuestro meetup mensual de desarrolladores donde presentamos tres talks cortos sobre diferentes temas. Mi presentación fue sobre "Tips for Better Code Reviews". Fue genial ver a la comunidad local crecer y conectar con otros developers de la zona.',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    'Santa Tecla, El Salvador',
    'meetup',
    'organizer',
    ARRAY['Community', 'Best Practices', 'Code Review'],
    null,
    false,
    3
  ),
  (
    'Hackathon 2024',
    '2024-08-15',
    '48 horas de desarrollo intensivo creando soluciones innovadoras.',
    'Participé en un hackathon de 48 horas donde mi equipo desarrolló una aplicación de gestión de tareas con IA. Utilizamos Next.js, Supabase y OpenAI para crear una solución que ganó el segundo lugar. Fue una experiencia agotadora pero muy gratificante trabajar bajo presión y ver el resultado final.',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    'Online',
    'hackathon',
    'attendee',
    ARRAY['Next.js', 'Supabase', 'OpenAI', 'Tailwind CSS'],
    null,
    false,
    4
  ),
  (
    'Web Performance Workshop',
    '2024-09-05',
    'Workshop intensivo sobre optimización de performance en aplicaciones web modernas.',
    'Asistí a un workshop de día completo sobre web performance impartido por expertos de Google. Aprendimos técnicas avanzadas de optimización, cómo usar Lighthouse de manera efectiva, y estrategias para mejorar Core Web Vitals. Implementé muchas de estas técnicas en mis proyectos.',
    'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800',
    'Online',
    'workshop',
    'attendee',
    ARRAY['Performance', 'Lighthouse', 'Core Web Vitals', 'Optimization'],
    null,
    false,
    5
  );
```

---

## Tarea 9.3: Crear tipos para eventos
**Objetivo**: Definir interfaces TypeScript

**Archivo**: `/types/event.ts`
```typescript
export type EventType = 'conference' | 'workshop' | 'meetup' | 'hackathon' | 'talk'
export type EventRole = 'speaker' | 'attendee' | 'organizer' | 'sponsor' | 'volunteer'

export interface Event {
  id: string
  name: string
  date: string
  description: string
  long_description?: string
  image_url: string
  location?: string
  event_type?: EventType
  role?: EventRole
  technologies: string[]
  website_url?: string
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}
```

---

## Tarea 9.4: Crear servicio de eventos
**Objetivo**: Funciones para obtener eventos

**Archivo**: `/lib/services/event-service.ts`
```typescript
import { createClient } from '@/lib/supabase/client'
import type { Event } from '@/types/event'

const supabase = createClient()

export const eventService = {
  // Obtener todos los eventos
  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching events:', error)
      return []
    }

    return data as Event[]
  },

  // Obtener eventos destacados
  async getFeaturedEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('featured', true)
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching featured events:', error)
      return []
    }

    return data as Event[]
  },

  // Obtener eventos por tipo
  async getEventsByType(type: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('event_type', type)
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching events by type:', error)
      return []
    }

    return data as Event[]
  },

  // Obtener evento por ID
  async getEventById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching event:', error)
      return null
    }

    return data as Event
  },
}
```

---

## Tarea 9.5: Crear componente de tarjeta Polaroid
**Objetivo**: Tarjeta con estilo polaroid para cada evento

**Archivo**: `/components/events/PolaroidCard.tsx`
```typescript
'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, User } from 'lucide-react'
import type { Event } from '@/types/event'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface PolaroidCardProps {
  event: Event
  index: number
  onClick: () => void
}

export function PolaroidCard({ event, index, onClick }: PolaroidCardProps) {
  // Rotación aleatoria para efecto polaroid
  const randomRotation = (index % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 2)

  return (
    <motion.div
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
    </motion.div>
  )
}
```

---

## Tarea 9.6: Agregar fuente handwriting
**Objetivo**: Estilo de letra manuscrita para polaroids

**Archivo**: `/app/layout.tsx` (actualización de fuentes)
```typescript
import { Inter, Caveat } from "next/font/google"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const caveat = Caveat({ 
  subsets: ["latin"],
  variable: '--font-handwriting',
  weight: ['400', '700']
})

// En el body:
<body className={`${inter.variable} ${caveat.variable} font-sans`}>
```

**Archivo**: `/app/globals.css` (agregar clase)
```css
.font-handwriting {
  font-family: var(--font-handwriting);
}
```

---

## Tarea 9.7: Crear modal de detalle de evento
**Objetivo**: Dialog con información completa del evento

**Archivo**: `/components/events/EventDetailDialog.tsx`
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
```

---

## Tarea 9.8: Crear grid de polaroids
**Objetivo**: Layout de colección de polaroids

**Archivo**: `/components/events/EventsGallery.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import { eventService } from '@/lib/services/event-service'
import type { Event } from '@/types/event'
import { PolaroidCard } from './PolaroidCard'
import { EventDetailDialog } from './EventDetailDialog'
import { Loader2 } from 'lucide-react'

export function EventsGallery() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await eventService.getAllEvents()
      setEvents(data)
      setLoading(false)
    }

    fetchEvents()
  }, [])

  const handleCardClick = (event: Event) => {
    setSelectedEvent(event)
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay eventos disponibles</p>
      </div>
    )
  }

  return (
    <>
      {/* Polaroid Collection - Masonry style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
        {events.map((event, index) => (
          <PolaroidCard
            key={event.id}
            event={event}
            index={index}
            onClick={() => handleCardClick(event)}
          />
        ))}
      </div>

      <EventDetailDialog
        event={selectedEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
```

---

## Tarea 9.9: Crear filtros de eventos
**Objetivo**: Filtrar por tipo y rol

**Archivo**: `/components/events/EventFilters.tsx`
```typescript
'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface EventFiltersProps {
  eventTypes: string[]
  roles: string[]
  selectedType: string | null
  selectedRole: string | null
  onTypeSelect: (type: string | null) => void
  onRoleSelect: (role: string | null) => void
}

export function EventFilters({
  eventTypes,
  roles,
  selectedType,
  selectedRole,
  onTypeSelect,
  onRoleSelect,
}: EventFiltersProps) {
  const hasFilters = selectedType || selectedRole

  const handleClearAll = () => {
    onTypeSelect(null)
    onRoleSelect(null)
  }

  return (
    <div className="space-y-6">
      {/* Clear All */}
      {hasFilters && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Filtros activos</span>
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            <X className="mr-2 h-4 w-4" />
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* Type Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Tipo de Evento</h3>
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <Badge
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              className="cursor-pointer capitalize hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onTypeSelect(selectedType === type ? null : type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Role Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Mi Rol</h3>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <Badge
              key={role}
              variant={selectedRole === role ? 'default' : 'outline'}
              className="cursor-pointer capitalize hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onRoleSelect(selectedRole === role ? null : role)}
            >
              {role}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## Tarea 9.10: Crear página de eventos
**Objetivo**: Página principal de la galería de eventos

**Archivo**: `/app/events/page.tsx`
```typescript
import { PageWrapper } from '@/components/layout/PageWrapper'
import { EventsGallery } from '@/components/events/EventsGallery'
import { Calendar, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Eventos | Portfolio',
  description: 'Colección de eventos en los que he participado',
}

export default function EventsPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <Calendar className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Eventos & Conferencias
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Una colección de eventos, conferencias y meetups en los que he participado
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Galería Estilo Polaroid</h3>
                <p className="text-sm text-muted-foreground">
                  Cada evento está representado como una foto polaroid con información clave.
                  Haz click en cualquier evento para ver detalles completos, incluyendo mi rol,
                  tecnologías utilizadas y más información sobre la experiencia.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Gallery */}
        <EventsGallery />
      </div>
    </PageWrapper>
  )
}
```

---

## Verificación Final del Módulo 09
- [ ] La tabla de eventos está creada
- [ ] Los datos de ejemplo están insertados
- [ ] Las tarjetas tienen estilo polaroid
- [ ] Las tarjetas tienen rotación aleatoria
- [ ] El efecto hover funciona correctamente
- [ ] La fuente handwriting se muestra
- [ ] El modal de detalles se abre correctamente
- [ ] Los filtros por tipo y rol funcionan
- [ ] El diseño es responsivo
- [ ] Las animaciones son suaves

**Siguiente módulo**: `module-10-integration.md`