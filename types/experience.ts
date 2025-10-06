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
