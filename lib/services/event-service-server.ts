import type { Event } from '@/types/event'
import { cache } from 'react'

export const eventServiceServer = {
  // Obtener todos los eventos - Server Component
  getAllEvents: cache(async (): Promise<Event[]> => {
    return []
  }),

  // Obtener eventos destacados - Server Component
  getFeaturedEvents: cache(async (): Promise<Event[]> => {
    return []
  }),

  // Obtener eventos por tipo - Server Component
  getEventsByType: cache(async (type: string): Promise<Event[]> => {
    return []
  }),

  // Obtener evento por ID - Server Component
  getEventById: cache(async (id: string): Promise<Event | null> => {
    return null
  }),
}
