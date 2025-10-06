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

