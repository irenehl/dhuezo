export interface User {
  id: string
  email: string
  created_at: string
}

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export interface ColorHistory {
  id: string
  user_id: string | null
  prompt: string
  palette: ColorPalette
  created_at: string
}

export interface Experience {
  id: string
  title: string
  company: string
  description: string
  technologies: string[]
  start_date: string
  end_date: string | null
  image_url: string | null
}

export interface Event {
  id: string
  name: string
  date: string
  description: string
  image_url: string
  location: string
}

export interface SharedImage {
  id: string
  user_id: string
  image_url: string
  caption: string | null
  created_at: string
}

export * from './blog'
