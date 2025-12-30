import type { Event } from '@/types/event'

export const eventService = {
  // Obtener todos los eventos
  async getAllEvents(): Promise<Event[]> {
    return []
  },

  // Obtener eventos destacados
  async getFeaturedEvents(): Promise<Event[]> {
    return []
  },

  // Obtener eventos por tipo
  async getEventsByType(type: string): Promise<Event[]> {
    return []
  },

  // Obtener evento por ID
  async getEventById(id: string): Promise<Event | null> {
    return null
  },
}
