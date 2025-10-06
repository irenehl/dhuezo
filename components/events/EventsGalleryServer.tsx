import { eventServiceServer } from '@/lib/services/event-service-server'
import type { Event } from '@/types/event'
import { Suspense } from 'react'
import { EventsGalleryClient } from './EventsGalleryClient'

async function EventsContent() {
  const events = await eventServiceServer.getAllEvents()
  return <EventsGalleryClient initialEvents={events} />
}

function EventsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Filters skeleton */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-32" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-muted rounded w-20" />
            ))}
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-4 shadow-xl rounded-lg animate-pulse">
            <div className="aspect-square bg-muted rounded mb-4" />
            <div className="space-y-3">
              <div className="h-6 bg-muted rounded w-3/4 mx-auto" />
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
              <div className="h-6 bg-muted rounded w-20 mx-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function EventsGalleryServer() {
  return (
    <Suspense fallback={<EventsSkeleton />}>
      <EventsContent />
    </Suspense>
  )
}

