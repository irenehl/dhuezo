export interface Project {
  id: string
  project_id: string // Shared ID across locales
  locale: 'en' | 'es'
  order_index: number
  preview_image_url: string
  deployed_url?: string | null
  repo_url?: string | null
  featured: boolean
  title: string
  description: string
  tags: string[]
  /** Short ownership / scope line (e.g. role on the work). */
  role?: string | null
  /** One-line outcome or what shipped. */
  outcome?: string | null
  /** Optional constraint or tradeoff worth naming. */
  constraint?: string | null
  created_at: string
  updated_at: string
}

export interface CreateProjectParams {
  project_id: string
  locale: 'en' | 'es'
  order_index: number
  preview_image_url: string
  deployed_url?: string | null
  repo_url?: string | null
  featured?: boolean
  title: string
  description: string
  tags: string[]
}

export interface UpdateProjectParams {
  order_index?: number
  preview_image_url?: string
  deployed_url?: string | null
  repo_url?: string | null
  featured?: boolean
  title?: string
  description?: string
  tags?: string[]
}





