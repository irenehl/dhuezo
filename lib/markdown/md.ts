import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import readingTime from 'reading-time'

export interface ParsedMarkdown<TFrontmatter = Record<string, unknown>> {
  frontmatter: TFrontmatter
  content: string
  contentHtml: string
}

/**
 * Parse a Markdown file and return frontmatter and HTML content
 */
export async function parseMarkdownFile<TFrontmatter = Record<string, unknown>>(
  filePath: string
): Promise<ParsedMarkdown<TFrontmatter>> {
  const fileContents = await fs.readFile(filePath, 'utf-8')
  const { data, content } = matter(fileContents)

  // Convert Markdown to HTML using remark/rehype
  const processor = remark().use(remarkGfm).use(remarkRehype).use(rehypeStringify)
  const result = await processor.process(content)
  let contentHtml = String(result)

  // Add IDs to headings (server-side, using regex)
  contentHtml = contentHtml.replace(
    /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/gi,
    (match, level, attrs, text) => {
      // Extract text content, removing HTML tags
      const textContent = text.replace(/<[^>]*>/g, '').trim()
      const id = textContent
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      
      // Check if id already exists in attributes
      if (attrs && attrs.includes('id=')) {
        return match
      }
      
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`
    }
  )

  return {
    frontmatter: data as TFrontmatter,
    content,
    contentHtml,
  }
}

/**
 * Get all Markdown files in a directory
 */
export async function getMarkdownFilesInDir(dir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(dir)
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => path.join(dir, file))
  } catch (error) {
    // Directory doesn't exist, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): string {
  const stats = readingTime(content)
  return `${Math.ceil(stats.minutes)} min read`
}

