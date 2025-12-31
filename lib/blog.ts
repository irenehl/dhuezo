import { formatDate as formatDateUtil } from './utils'
import type { BlogPost } from '@/types/blog'
import { calculateReadingTime } from './markdown/md'

/**
 * Format date for blog posts
 */
export function formatDate(date: string | Date, locale: string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

/**
 * Get all blog posts (for static generation)
 */
export async function getAllPosts(locale: string): Promise<BlogPost[]> {
  const { blogService } = await import('./services/blog-service')
  return blogService.getPublishedPosts(locale, 1000)
}

/**
 * Get blog post by slug
 */
export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<BlogPost | null> {
  const { blogService } = await import('./services/blog-service')
  return blogService.getPostBySlug(slug, locale)
}


