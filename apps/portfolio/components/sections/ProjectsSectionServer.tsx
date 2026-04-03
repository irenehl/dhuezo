import { projectContentService } from '@/lib/services/project-content-service'
import { getXArticles } from '@/lib/config/x-articles'
import { ProjectsSection } from './ProjectsSection'

export async function ProjectsSectionServer({ locale }: { locale: string }) {
  const xArticles = getXArticles(locale as 'en' | 'es')
  
  try {
    const projects = await projectContentService.getAllProjects(locale)
    return <ProjectsSection projects={projects} xArticles={xArticles} />
  } catch {
    // Fallback to config-based projects when markdown is missing or invalid
  }

  return <ProjectsSection xArticles={xArticles} />
}

