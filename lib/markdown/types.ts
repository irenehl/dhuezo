import type { BlogPost } from '@/types/blog'
import type { Project } from '@/types/project'
import type { Experience } from '@/types/experience'

export interface BlogPostFrontmatter {
  slug: string
  locale: 'en' | 'es'
  title: string
  description: string
  date: string
  tags?: string[]
  featuredImageUrl?: string | null
  readingTimeText?: string
  published?: boolean
  stageType?: 'talk' | 'article' | 'slide' | null
  eventLocation?: string | null
  eventDate?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
}

export interface MarkdownBlogPost extends Omit<BlogPost, 'content'> {
  contentHtml: string
  content: string
  meta: {
    title: string
    summary: string
    date: string
    tags?: string[]
    coverImage?: string | null
    ogImage?: string | null
    readingTimeText?: string
    canonicalUrl?: string
  }
}

export interface ProjectFrontmatter {
  projectId: string
  locale: 'en' | 'es'
  orderIndex: number
  previewImageUrl: string
  deployedUrl?: string | null
  repoUrl?: string | null
  featured: boolean
  title: string
  description: string
  tags: string[]
}

export interface MarkdownProject extends Omit<Project, 'description'> {
  description: string
  contentHtml: string
  content: string
}

export interface ExperienceFrontmatter {
  id: string
  locale: 'en' | 'es'
  title: string
  company: string
  description: string
  longDescription?: string
  technologies: string[]
  startDate: string
  endDate?: string | null
  imageUrl?: string | null
  companyLogo?: string | null
  location?: string
  type?: 'full-time' | 'part-time' | 'contract' | 'freelance'
  featured: boolean
  orderIndex: number
}

export interface MarkdownExperience extends Omit<Experience, 'long_description'> {
  longDescription?: string
  contentHtml: string
  content: string
}

