import { projectContentService } from '@/lib/services/project-content-service'
import { ProjectsSection } from './ProjectsSection'

export async function ProjectsSectionServer({ locale }: { locale: string }) {
  try {
    const projects = await projectContentService.getFeaturedProjects(locale)
    // #region agent log
    await fetch('http://127.0.0.1:7246/ingest/4716d069-a486-46d4-9cfe-1b3c1d3447eb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProjectsSectionServer.tsx:7',message:'getFeaturedProjects result',data:{locale,projectsCount:projects.length,projects:projects.map(p=>({id:p.project_id,preview_image_url:p.preview_image_url}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    // Only use Markdown projects if we have any
    if (projects.length > 0) {
      return <ProjectsSection projects={projects} />
    }
  } catch (error) {
    // #region agent log
    await fetch('http://127.0.0.1:7246/ingest/4716d069-a486-46d4-9cfe-1b3c1d3447eb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProjectsSectionServer.tsx:13',message:'getFeaturedProjects error',data:{locale,errorMessage:error instanceof Error?error.message:String(error),errorStack:error instanceof Error?error.stack:undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    // If Markdown service fails, fall back to config-based
    console.error('Failed to load Markdown projects:', error)
  }
  
  // Fallback to config-based projects
  return <ProjectsSection />
}

