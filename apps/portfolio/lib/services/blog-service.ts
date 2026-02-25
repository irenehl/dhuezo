import path from 'path'
import type {
  BlogCategory,
  BlogPost,
  BlogPostImage,
  CreateBlogPostParams,
  UpdateBlogPostParams,
} from '@/types/blog'
import {
  parseMarkdownFile,
  getMarkdownFilesInDir,
  calculateReadingTime,
} from '@/lib/markdown/md'
import type {
  BlogPostFrontmatter,
  MarkdownBlogPost,
} from '@/lib/markdown/types'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

function sanitizeExternalUrl(url: string | null | undefined): string | null {
  if (!url) return null

  const trimmedUrl = url.trim()
  if (!trimmedUrl) return null

  try {
    const parsed = new URL(trimmedUrl)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString()
    }
  } catch {
    return null
  }

  return null
}

function sanitizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null

  const trimmedUrl = url.trim()
  if (!trimmedUrl) return null

  if (trimmedUrl.startsWith('/')) {
    return trimmedUrl
  }

  return sanitizeExternalUrl(trimmedUrl)
}

function mapMarkdownToBlogPost(
  parsed: {
    frontmatter: BlogPostFrontmatter
    content: string
    contentHtml: string
  },
  filePath: string
): BlogPost {
  const { frontmatter, content, contentHtml } = parsed
  const now = new Date().toISOString()

  // Generate a stable ID from slug and locale
  const id = `${frontmatter.slug}-${frontmatter.locale}`

  return {
    id,
    slug: frontmatter.slug,
    locale: frontmatter.locale,
    title: frontmatter.title,
    description: frontmatter.description,
    content: contentHtml, // Store HTML content
    featured_image_url: sanitizeImageUrl(frontmatter.featuredImageUrl),
    pdf_url: null,
    pdf_preview_images: [],
    images: [],
    author_id: 'system', // Default author for Markdown posts
    published: frontmatter.published ?? true,
    published_at: frontmatter.published ? frontmatter.date : null,
    created_at: frontmatter.date || now,
    updated_at: frontmatter.date || now,
    stage_type: frontmatter.stageType || null,
    event_location: frontmatter.eventLocation || null,
    event_date: frontmatter.eventDate || null,
    cta_label: frontmatter.ctaLabel || null,
    cta_url: sanitizeExternalUrl(frontmatter.ctaUrl),
    categories: [],
  }
}

export const blogService = {
  // Get all categories
  async getCategories(): Promise<BlogCategory[]> {
    return []
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    return null
  },

  // Get all posts (for admin)
  async getAllPosts(): Promise<BlogPost[]> {
    const files = await getMarkdownFilesInDir(CONTENT_DIR)
    const posts = await Promise.all(
      files.map(async (filePath) => {
        const parsed = await parseMarkdownFile<BlogPostFrontmatter>(filePath)
        return mapMarkdownToBlogPost(parsed, filePath)
      })
    )
    return posts.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  },

  // Get published posts
  async getPublishedPosts(
    locale: string,
    limit = 10,
    categoryId?: string
  ): Promise<BlogPost[]> {
    const files = await getMarkdownFilesInDir(CONTENT_DIR)
    const posts = await Promise.all(
      files.map(async (filePath) => {
        const parsed = await parseMarkdownFile<BlogPostFrontmatter>(filePath)
        return mapMarkdownToBlogPost(parsed, filePath)
      })
    )

    // Filter by locale and published status
    const filtered = posts.filter(
      (post) => post.locale === locale && post.published
    )

    // Sort by date (newest first)
    const sorted = filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    return sorted.slice(0, limit)
  },

  // Get post by slug
  async getPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
    const files = await getMarkdownFilesInDir(CONTENT_DIR)
    
    // Find file matching slug and locale
    const matchingFile = files.find((filePath) => {
      const fileName = path.basename(filePath, '.md')
      // Check if filename matches slug pattern (e.g., "example-post.en.md")
      return fileName.startsWith(`${slug}.`) && fileName.endsWith(`.${locale}`)
    })

    if (!matchingFile) {
      return null
    }

    const parsed = await parseMarkdownFile<BlogPostFrontmatter>(matchingFile)
    
    // Verify slug and locale match
    if (parsed.frontmatter.slug !== slug || parsed.frontmatter.locale !== locale) {
      return null
    }

    return mapMarkdownToBlogPost(parsed, matchingFile)
  },

  // Get related posts
  async getRelatedPosts(
    postId: string,
    categoryId: string,
    limit = 3
  ): Promise<BlogPost[]> {
    // For now, return empty array - can be enhanced later
    return []
  },

  // Search posts
  async searchPosts(query: string, locale: string): Promise<BlogPost[]> {
    const allPosts = await this.getPublishedPosts(locale, 100)
    const lowerQuery = query.toLowerCase()
    
    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery)
    )
  },

  // Get post images
  async getPostImages(postId: string): Promise<BlogPostImage[]> {
    return []
  },

  // Delete post - Client Action (not applicable for Markdown)
  async deletePost(id: string): Promise<boolean> {
    return false
  },

  // Upload multiple post images - Client Action (not applicable for Markdown)
  async uploadPostImages(
    files: File[],
    postId: string
  ): Promise<BlogPostImage[]> {
    return []
  },

  // Delete post image - Client Action (not applicable for Markdown)
  async deletePostImage(imageId: string): Promise<boolean> {
    return false
  },
}
