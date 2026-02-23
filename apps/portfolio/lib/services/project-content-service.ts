import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import type { Project } from '@/types/project'
import {
  parseMarkdownFile,
  getMarkdownFilesInDir,
} from '@/lib/markdown/md'
import type {
  ProjectFrontmatter,
  MarkdownProject,
} from '@/lib/markdown/types'

const CONTENT_DIR = path.join(process.cwd(), 'content/projects')

function normalizeImageUrl(url: string | undefined): string {
  if (!url) return ''

  // If it's already a full URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  
  // Handle filesystem paths that include "apps/portfolio/public/" prefix
  // Convert "apps/portfolio/public/og-image.webp" -> "/og-image.webp"
  if (url.includes('apps/portfolio/public/')) {
    return url.replace(/^.*\/public\//, '/')
  }
  
  // If it starts with /, it's already a valid public path
  if (url.startsWith('/')) {
    return url
  }
  
  // If it's a relative path like "content/projects/image.jpg", convert to public path
  // Remove "content/" prefix if present and add leading slash
  const normalized = url.replace(/^content\//, '/')
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

function mapMarkdownToProject(
  frontmatter: ProjectFrontmatter,
  content: string = '',
  contentHtml: string = ''
): MarkdownProject {
  const now = new Date().toISOString()

  // Generate a stable ID from projectId and locale
  const id = `${frontmatter.projectId}-${frontmatter.locale}`

  return {
    id,
    project_id: frontmatter.projectId,
    locale: frontmatter.locale,
    order_index: frontmatter.orderIndex,
    preview_image_url: normalizeImageUrl(frontmatter.previewImageUrl),
    deployed_url: frontmatter.deployedUrl || null,
    repo_url: frontmatter.repoUrl || null,
    featured: frontmatter.featured,
    title: frontmatter.title,
    description: frontmatter.description,
    tags: frontmatter.tags,
    created_at: now,
    updated_at: now,
    contentHtml,
    content,
  }
}

async function parseConsolidatedProjectsFile(
  filePath: string,
  locale: string
): Promise<MarkdownProject[]> {
  const fileContents = await fs.readFile(filePath, 'utf-8')
  const blocks = fileContents.split(/\n---\n/).filter(block => block.trim())
  
  const projects: MarkdownProject[] = []
  
  for (const block of blocks) {
    if (!block.trim().startsWith('---')) {
      continue
    }
    
    const { data, content } = matter(block)
    
    if (data.locale === locale) {
      projects.push(
        mapMarkdownToProject(
          data as ProjectFrontmatter,
          content.trim(),
          ''
        )
      )
    }
  }
  
  return projects
}

export const projectContentService = {
  async getAllProjects(locale: string): Promise<MarkdownProject[]> {
    const consolidatedFile = path.join(CONTENT_DIR, `projects.${locale}.md`)
    
    try {
      const projects = await parseConsolidatedProjectsFile(consolidatedFile, locale)
      
      if (projects.length > 0) {
        return projects.sort((a, b) => a.order_index - b.order_index)
      }
    } catch (error) {
      // Fallback to individual files
    }
    
    const files = await getMarkdownFilesInDir(CONTENT_DIR)
    const projects = await Promise.all(
      files
        .filter(filePath => {
          const fileName = path.basename(filePath)
          return !fileName.startsWith('projects.')
        })
        .map(async (filePath) => {
          const parsed = await parseMarkdownFile<ProjectFrontmatter>(filePath)
          return mapMarkdownToProject(parsed.frontmatter, parsed.content, parsed.contentHtml)
        })
    )

    const filtered = projects.filter(
      (project) => project.locale === locale
    )

    return filtered.sort((a, b) => a.order_index - b.order_index)
  },

  async getFeaturedProjects(locale: string): Promise<MarkdownProject[]> {
    const allProjects = await this.getAllProjects(locale)
    return allProjects.filter((project) => project.featured)
  },

  async getProjectById(
    projectId: string,
    locale: string
  ): Promise<MarkdownProject | null> {
    const allProjects = await this.getAllProjects(locale)
    return allProjects.find(p => p.project_id === projectId) || null
  },
}

