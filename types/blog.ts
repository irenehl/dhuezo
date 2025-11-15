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
  author_id: string
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  categories?: BlogCategory[]
  author?: {
    email: string
    full_name?: string
    avatar_url?: string
  }
}

export interface BlogPostImage {
  id: string
  post_id: string
  image_url: string
  storage_path: string
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
  category_ids?: string[]
  published?: boolean
}

export interface UpdateBlogPostParams {
  slug?: string
  title?: string
  description?: string
  content?: string
  featured_image_url?: string | null
  pdf_url?: string | null
  pdf_preview_images?: string[]
  category_ids?: string[]
  published?: boolean
}

export interface UploadImageParams {
  file: File
  alt_text?: string
}

export interface UploadPDFParams {
  file: File
}

