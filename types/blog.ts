export interface BlogCategory {
  id: string
  slug: string
  name_en: string
  name_es: string
  description_en: string | null
  description_es: string | null
  icon: string | null
  color: string | null
  order_index: number
  created_at: string
}

export interface BlogPost {
  id: string
  slug: string
  locale: 'en' | 'es'
  title: string
  description: string
  content: string
  featured_image_url: string | null
  pdf_url: string | null
  pdf_preview_images: string[]
  // Images metadata stored in the post document (files are in Storage bucket)
  images?: BlogPostImage[]
  author_id: string
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  // Stage-specific fields
  stage_type?: 'talk' | 'article' | 'slide' | null
  event_location?: string | null
  event_date?: string | null
  cta_label?: string | null
  cta_url?: string | null
  categories?: BlogCategory[]
  author?: {
    email: string
    full_name?: string
    avatar_url?: string
  }
}

export interface BlogPostImage {
  file_id: string // Storage file ID
  image_url: string // Public URL from Storage
  storage_path: string // Path in Storage bucket
  alt_text: string | null
  order_index: number
  created_at: string
}

export interface CreateBlogPostParams {
  slug: string
  locale: 'en' | 'es'
  title: string
  description: string
  content: string
  featured_image_url?: string | null
  pdf_url?: string | null
  pdf_preview_images?: string[]
  images?: BlogPostImage[] // Images metadata
  category_ids?: string[]
  published?: boolean
  stage_type?: 'talk' | 'article' | 'slide' | null
  event_location?: string | null
  event_date?: string | null
  cta_label?: string | null
  cta_url?: string | null
}

export interface UpdateBlogPostParams {
  slug?: string
  title?: string
  description?: string
  content?: string
  featured_image_url?: string | null
  pdf_url?: string | null
  pdf_preview_images?: string[]
  images?: BlogPostImage[] // Images metadata
  category_ids?: string[]
  published?: boolean
  stage_type?: 'talk' | 'article' | 'slide' | null
  event_location?: string | null
  event_date?: string | null
  cta_label?: string | null
  cta_url?: string | null
}




