import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import type { Experience } from '@/types/experience'
import {
  parseMarkdownFile,
  getMarkdownFilesInDir,
  renderMarkdownToHtml,
} from '@/lib/markdown/md'
import type {
  ExperienceFrontmatter,
  MarkdownExperience,
} from '@/lib/markdown/types'

const CONTENT_DIR = path.join(process.cwd(), 'content/experience')

/**
 * Parse a file that contains multiple frontmatter blocks (multiple experiences)
 * Pattern: ---\nfrontmatter\n---\ncontent\n---\nfrontmatter\n---\ncontent...
 */
async function parseMultipleExperiencesFromFile(
  filePath: string
): Promise<Array<{
  frontmatter: ExperienceFrontmatter
  content: string
  contentHtml: string
}>> {
  const fileContents = await fs.readFile(filePath, 'utf-8')
  
  // Match pattern: ---\n(frontmatter)\n---\n(content)\n---
  // Use regex to find all experience blocks
  const experienceRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*?)(?=\n---|$)/gm
  const matches = Array.from(fileContents.matchAll(experienceRegex))
  
  const experiences: Array<{
    frontmatter: ExperienceFrontmatter
    content: string
    contentHtml: string
  }> = []

  for (const match of matches) {
    const frontmatterText = match[1]?.trim()
    const contentText = match[2]?.trim() || ''

    if (!frontmatterText) continue

    try {
      // Parse frontmatter (add `---` delimiters for gray-matter)
      const frontmatterBlock = `---\n${frontmatterText}\n---`
      const parsed = matter(frontmatterBlock)

      if (parsed.data && Object.keys(parsed.data).length > 0) {
        const contentHtml = await renderMarkdownToHtml(contentText)

        experiences.push({
          frontmatter: parsed.data as ExperienceFrontmatter,
          content: contentText,
          contentHtml,
        })
      }
    } catch (error) {
      continue
    }
  }

  return experiences
}

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
  async getAllExperiences(locale: string): Promise<MarkdownExperience[]> {
    const files = await getMarkdownFilesInDir(CONTENT_DIR)
    const allExperiences: MarkdownExperience[] = []

    for (const filePath of files) {
      try {
        const multipleExperiences = await parseMultipleExperiencesFromFile(filePath)
        
        if (multipleExperiences.length > 0) {
          for (const parsed of multipleExperiences) {
            if (parsed.frontmatter.locale === locale) {
              allExperiences.push(mapMarkdownToExperience(parsed, filePath))
            }
          }
        } else {
          const parsed = await parseMarkdownFile<ExperienceFrontmatter>(filePath)
          if (parsed.frontmatter.locale === locale) {
            allExperiences.push(mapMarkdownToExperience(parsed, filePath))
          }
        }
      } catch (error) {
        try {
          const parsed = await parseMarkdownFile<ExperienceFrontmatter>(filePath)
          if (parsed.frontmatter.locale === locale) {
            allExperiences.push(mapMarkdownToExperience(parsed, filePath))
          }
        } catch (fallbackError) {
          // Skip file if parsing fails
        }
      }
    }

    // Sort by orderIndex or startDate
    return allExperiences.sort((a, b) => {
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
