import { projectContentService } from '@/lib/services/project-content-service'
import { getXArticles } from '@/lib/config/x-articles'
import { ProjectsSection } from './ProjectsSection'

export async function ProjectsSectionServer({ locale }: { locale: string }) {
  const xArticles = getXArticles(locale as 'en' | 'es')
  
  try {
    const projects = await projectContentService.getAllProjects(locale)
    if (projects.length > 0) {
      return <ProjectsSection projects={projects} xArticles={xArticles} />
    }
  } catch (error) {
    // Fallback to config-based projects
  }
  
  return <ProjectsSection xArticles={xArticles} />
}

