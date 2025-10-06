import { createClient } from '@/lib/supabase/server'
import type { Event } from '@/types/event'
import { cache } from 'react'

export const eventServiceServer = {
  // Obtener todos los eventos - Server Component
  getAllEvents: cache(async (): Promise<Event[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching events:', error)
      return []
    }

    return data as Event[]
  }),

  // Obtener eventos destacados - Server Component
  getFeaturedEvents: cache(async (): Promise<Event[]> => {
    const supabase = await createClient()
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
  }),

  // Obtener eventos por tipo - Server Component
  getEventsByType: cache(async (type: string): Promise<Event[]> => {
    const supabase = await createClient()
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
  }),

  // Obtener evento por ID - Server Component
  getEventById: cache(async (id: string): Promise<Event | null> => {
    const supabase = await createClient()
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
  }),
}
