import path from 'path'
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
  
  // #region agent log
  const logData = { originalUrl: url, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' };
  // #endregion
  
  // If it's already a full URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/4716d069-a486-46d4-9cfe-1b3c1d3447eb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...logData,location:'project-content-service.ts:18',message:'normalizeImageUrl: external URL',data:{normalized:url,reason:'external'}})}).catch(()=>{});
    // #endregion
    return url
  }
  
  // If it starts with /, it's already a valid public path
  if (url.startsWith('/')) {
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/4716d069-a486-46d4-9cfe-1b3c1d3447eb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...logData,location:'project-content-service.ts:24',message:'normalizeImageUrl: already absolute',data:{normalized:url,reason:'already_absolute'}})}).catch(()=>{});
    // #endregion
    return url
  }
  
  // If it's a relative path like "content/projects/image.jpg", convert to public path
  // Remove "content/" prefix if present and add leading slash
  const normalized = url.replace(/^content\//, '/')
  const result = normalized.startsWith('/') ? normalized : `/${normalized}`
  // #region agent log
  fetch('http://127.0.0.1:7246/ingest/4716d069-a486-46d4-9cfe-1b3c1d3447eb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...logData,location:'project-content-service.ts:31',message:'normalizeImageUrl: normalized relative',data:{normalized:result,reason:'relative_normalized'}})}).catch(()=>{});
  // #endregion
  return result
}

function mapMarkdownToProject(
  parsed: {
    frontmatter: ProjectFrontmatter
    content: string
    contentHtml: string
  },
  filePath: string
): MarkdownProject {
  const { frontmatter, contentHtml } = parsed
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
    content: parsed.content,
  }
}

export const projectContentService = {
  // Get all projects
  async getAllProjects(locale: string): Promise<MarkdownProject[]> {
    const files = await getMarkdownFilesInDir(CONTENT_DIR)
    const projects = await Promise.all(
      files.map(async (filePath) => {
        const parsed = await parseMarkdownFile<ProjectFrontmatter>(filePath)
        return mapMarkdownToProject(parsed, filePath)
      })
    )

    // Filter by locale
    const filtered = projects.filter(
      (project) => project.locale === locale
    )

    // Sort by orderIndex
    return filtered.sort((a, b) => a.order_index - b.order_index)
  },

  // Get featured projects
  async getFeaturedProjects(locale: string): Promise<MarkdownProject[]> {
    const allProjects = await this.getAllProjects(locale)
    return allProjects.filter((project) => project.featured)
  },

  // Get project by ID
  async getProjectById(
    projectId: string,
    locale: string
  ): Promise<MarkdownProject | null> {
    const files = await getMarkdownFilesInDir(CONTENT_DIR)
    
    // Find file matching projectId and locale
    const matchingFile = files.find((filePath) => {
      const fileName = path.basename(filePath, '.md')
      // Check if filename matches projectId pattern (e.g., "project-1.en.md")
      return fileName.startsWith(`${projectId}.`) && fileName.endsWith(`.${locale}`)
    })

    if (!matchingFile) {
      return null
    }

    const parsed = await parseMarkdownFile<ProjectFrontmatter>(matchingFile)
    
    // Verify projectId and locale match
    if (parsed.frontmatter.projectId !== projectId || parsed.frontmatter.locale !== locale) {
      return null
    }

    return mapMarkdownToProject(parsed, matchingFile)
  },
}

