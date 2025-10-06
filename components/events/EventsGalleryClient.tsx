'use client'

import { useState, useMemo } from 'react'
import type { Event } from '@/types/event'
import { PolaroidCard } from './PolaroidCard'
import { EventDetailDialog } from './EventDetailDialog'
import { EventFilters } from './EventFilters'

interface EventsGalleryClientProps {
  initialEvents: Event[]
}

export function EventsGalleryClient({ initialEvents }: EventsGalleryClientProps) {
  const [events] = useState<Event[]>(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleCardClick = (event: Event) => {
    setSelectedEvent(event)
    setDialogOpen(true)
  }

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const typeMatch = !selectedType || event.event_type === selectedType
      const roleMatch = !selectedRole || event.role === selectedRole
      return typeMatch && roleMatch
    })
  }, [events, selectedType, selectedRole])

  // Get unique event types and roles for filters
  const eventTypes = useMemo(() => {
    return Array.from(new Set(events.map(e => e.event_type).filter(Boolean))) as string[]
  }, [events])

  const roles = useMemo(() => {
    return Array.from(new Set(events.map(e => e.role).filter(Boolean))) as string[]
  }, [events])

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay eventos disponibles</p>
      </div>
    )
  }

  return (
    <>
      {/* Filters */}
      <div className="mb-8">
        <EventFilters
          eventTypes={eventTypes}
          roles={roles}
          selectedType={selectedType}
          selectedRole={selectedRole}
          onTypeSelect={setSelectedType}
          onRoleSelect={setSelectedRole}
        />
      </div>

      {/* Polaroid Collection - Masonry style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
        {filteredEvents.map((event, index) => (
          <PolaroidCard
            key={event.id}
            event={event}
            index={index}
            onClick={() => handleCardClick(event)}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (selectedType || selectedRole) && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron eventos con los filtros seleccionados</p>
        </div>
      )}

      <EventDetailDialog
        event={selectedEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}

