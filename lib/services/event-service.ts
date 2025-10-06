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

