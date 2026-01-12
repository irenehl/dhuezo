import { projectContentService } from '@/lib/services/project-content-service'
import { ProjectsSection } from './ProjectsSection'

export async function ProjectsSectionServer({ locale }: { locale: string }) {
  try {
    const projects = await projectContentService.getFeaturedProjects(locale)
    // Only use Markdown projects if we have any
    if (projects.length > 0) {
      return <ProjectsSection projects={projects} />
    }
  } catch (error) {
    // If Markdown service fails, fall back to config-based
    console.error('Failed to load Markdown projects:', error)
  }
  
  // Fallback to config-based projects
  return <ProjectsSection />
}

