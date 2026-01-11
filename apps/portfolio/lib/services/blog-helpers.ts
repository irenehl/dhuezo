import { blogService } from './blog-service'
import type { BlogPost } from '@/types/blog'
import type { BlogPostFrontmatter } from '@/lib/markdown/types'
import { parseMarkdownFile, getMarkdownFilesInDir, calculateReadingTime } from '@/lib/markdown/md'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPostWithMeta extends BlogPost {
  tags?: string[]
  readingTimeText?: string
}

/**
 * Get published posts with tags and reading time
 */
export async function getPublishedPostsWithMeta(
  locale: string,
  limit = 10
): Promise<BlogPostWithMeta[]> {
  const posts = await blogService.getPublishedPosts(locale, limit)
  
  // Enrich posts with tags and reading time from frontmatter
  const enrichedPosts = await Promise.all(
    posts.map(async (post) => {
      const files = await getMarkdownFilesInDir(CONTENT_DIR)
      const matchingFile = files.find((filePath) => {
        const fileName = path.basename(filePath, '.md')
        return fileName.startsWith(`${post.slug}.`) && fileName.endsWith(`.${post.locale}`)
      })

      if (!matchingFile) {
        return { ...post, tags: [], readingTimeText: undefined }
      }

      const parsed = await parseMarkdownFile<BlogPostFrontmatter>(matchingFile)
      const readingTimeText = parsed.frontmatter.readingTimeText || calculateReadingTime(parsed.content)

      return {
        ...post,
        tags: parsed.frontmatter.tags || [],
        readingTimeText,
      }
    })
  )

  return enrichedPosts
}

/**
 * Get posts by stage type (for The Stage section)
 */
export async function getPostsByStageType(
  locale: string,
  stageType: 'talk' | 'article' | 'slide'
): Promise<BlogPostWithMeta[]> {
  const allPosts = await getPublishedPostsWithMeta(locale, 100)
  return allPosts.filter((post) => post.stage_type === stageType)
}





