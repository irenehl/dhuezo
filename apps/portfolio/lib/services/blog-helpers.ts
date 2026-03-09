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
  const [posts, files] = await Promise.all([
    blogService.getPublishedPosts(locale, limit),
    getMarkdownFilesInDir(CONTENT_DIR),
  ])

  const fileBySlugLocale = new Map<string, string>()
  for (const filePath of files) {
    const fileName = path.basename(filePath, '.md')
    const fileParts = fileName.split('.')
    if (fileParts.length < 2) continue

    const fileLocale = fileParts[fileParts.length - 1]
    const fileSlug = fileParts.slice(0, -1).join('.')
    fileBySlugLocale.set(`${fileSlug}::${fileLocale}`, filePath)
  }

  const metaBySlugLocale = new Map<
    string,
    { tags: string[]; readingTimeText: string | undefined }
  >()

  await Promise.all(
    posts.map(async (post) => {
      const key = `${post.slug}::${post.locale}`
      const matchingFile = fileBySlugLocale.get(key)

      if (!matchingFile) {
        return
      }

      const parsed = await parseMarkdownFile<BlogPostFrontmatter>(matchingFile)
      metaBySlugLocale.set(key, {
        tags: parsed.frontmatter.tags || [],
        readingTimeText:
          parsed.frontmatter.readingTimeText ||
          calculateReadingTime(parsed.content),
      })
    })
  )

  const enrichedPosts = posts.map((post) => {
    const key = `${post.slug}::${post.locale}`
    const meta = metaBySlugLocale.get(key)

    return {
      ...post,
      tags: meta?.tags || [],
      readingTimeText: meta?.readingTimeText,
    }
  })

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





