export interface SharedImage {
  id: string
  user_id: string
  image_url: string
  storage_path: string
  caption: string | null
  file_name: string
  file_size: number | null
  mime_type: string | null
  created_at: string
  user?: {
    email: string
    full_name?: string
    avatar_url?: string
  }
}

export interface UploadImageParams {
  file: File
  caption?: string
}

export interface ImageUploadProgress {
  progress: number
  uploading: boolean
  error: string | null
}

