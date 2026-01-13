import { projectContentService } from '@/lib/services/project-content-service'
import { getXArticles } from '@/lib/config/x-articles'
import { ProjectsSection } from './ProjectsSection'

export async function ProjectsSectionServer({ locale }: { locale: string }) {
  const xArticles = getXArticles(locale as 'en' | 'es')
  
  try {
    const projects = await projectContentService.getFeaturedProjects(locale)
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/4716d069-a486-46d4-9cfe-1b3c1d3447eb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H3',location:'apps/portfolio/components/sections/ProjectsSectionServer.tsx:ProjectsSectionServer',message:'Loaded featured markdown projects',data:{locale,projectCount:projects.length,firstProject:{id:projects[0]?.id,project_id:projects[0]?.project_id,preview_image_url:(projects[0]?.preview_image_url||'').slice(0,160)}},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log
    // Only use Markdown projects if we have any
    if (projects.length > 0) {
      return <ProjectsSection projects={projects} xArticles={xArticles} />
    }
  } catch (error) {
    // If Markdown service fails, fall back to config-based
    console.error('Failed to load Markdown projects:', error)
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/4716d069-a486-46d4-9cfe-1b3c1d3447eb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H4',location:'apps/portfolio/components/sections/ProjectsSectionServer.tsx:ProjectsSectionServer',message:'Failed to load markdown projects (fallback to config)',data:{locale,errorName:(error as Error)?.name,errorMessage:(error as Error)?.message},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log
  }
  
  // Fallback to config-based projects
  return <ProjectsSection xArticles={xArticles} />
}

