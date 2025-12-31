import path from 'path'
import type { Experience } from '@/types/experience'
import {
  parseMarkdownFile,
  getMarkdownFilesInDir,
} from '@/lib/markdown/md'
import type {
  ExperienceFrontmatter,
  MarkdownExperience,
} from '@/lib/markdown/types'

const CONTENT_DIR = path.join(process.cwd(), 'content/experience')

function mapMarkdownToExperience(
  parsed: {
    frontmatter: ExperienceFrontmatter
    content: string
    contentHtml: string
  },
  filePath: string
): MarkdownExperience {
  const { frontmatter, contentHtml } = parsed
  const now = new Date().toISOString()

  return {
    id: frontmatter.id,
    title: frontmatter.title,
    company: frontmatter.company,
    description: frontmatter.description,
    longDescription: frontmatter.longDescription,
    technologies: frontmatter.technologies,
    start_date: frontmatter.startDate,
    end_date: frontmatter.endDate || null,
    image_url: frontmatter.imageUrl || null,
    company_logo: frontmatter.companyLogo || null,
    location: frontmatter.location,
    type: frontmatter.type,
    featured: frontmatter.featured,
    order_index: frontmatter.orderIndex,
    created_at: now,
    updated_at: now,
    contentHtml,
    content: parsed.content,
  }
}

export const experienceService = {
  // Get all experiences
  async getAllExperiences(locale: string): Promise<MarkdownExperience[]> {
    const files = await getMarkdownFilesInDir(CONTENT_DIR)
    const experiences = await Promise.all(
      files.map(async (filePath) => {
        const parsed = await parseMarkdownFile<ExperienceFrontmatter>(filePath)
        // Filter by locale during parsing
        if (parsed.frontmatter.locale !== locale) {
          return null
        }
        return mapMarkdownToExperience(parsed, filePath)
      })
    )

    // Filter out null values
    const filtered = experiences.filter(
      (exp): exp is MarkdownExperience => exp !== null
    )

    // Sort by orderIndex or startDate
    return filtered.sort((a, b) => {
      if (a.order_index !== b.order_index) {
        return a.order_index - b.order_index
      }
      return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    })
  },

  // Get featured experiences
  async getFeaturedExperiences(locale: string): Promise<MarkdownExperience[]> {
    const allExperiences = await this.getAllExperiences(locale)
    return allExperiences.filter((exp) => exp.featured)
  },

  // Get experience by ID
  async getExperienceById(
    id: string,
    locale: string
  ): Promise<MarkdownExperience | null> {
    const files = await getMarkdownFilesInDir(CONTENT_DIR)
    
    // Find file matching id and locale
    const matchingFile = files.find((filePath) => {
      const fileName = path.basename(filePath, '.md')
      // Check if filename matches id pattern (e.g., "experience-1.en.md")
      return fileName.startsWith(`${id}.`) && fileName.endsWith(`.${locale}`)
    })

    if (!matchingFile) {
      return null
    }

    const parsed = await parseMarkdownFile<ExperienceFrontmatter>(matchingFile)
    
    // Verify id and locale match
    if (parsed.frontmatter.id !== id || parsed.frontmatter.locale !== locale) {
      return null
    }

    return mapMarkdownToExperience(parsed, matchingFile)
  },
}
