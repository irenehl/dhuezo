import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/routing'

interface ProjectCardProps {
  project: {
    project_id: string
    title: string
    description: string
    tags?: string[]
    deployed_url?: string | null
    repo_url?: string | null
  }
  translations: {
    liveLink: string
    sourceLink: string
  }
}

export function ProjectCard({ project, translations }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col gap-4 border-b border-border/40 py-8 sm:flex-row sm:items-baseline sm:justify-between transition-all duration-500 hover:bg-muted/10 -mx-4 px-4 sm:mx-[-1rem] sm:px-4 rounded-lg">
      <div className="relative z-10 min-w-0 flex-1 transition-transform duration-500 group-hover:translate-x-2">
        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.project_id}`}
            className="text-xl font-medium text-foreground transition-colors group-hover:text-primary before:absolute before:inset-0"
          >
            {project.title}
          </Link>
          <ArrowUpRight className="size-4 text-muted-foreground/40 transition-all duration-500 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0 group-hover:translate-y-0" />
        </div>
        
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground pr-4">
          {project.description}
        </p>
        
        {project.tags?.length ? (
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground/60 font-mono">
            {project.tags.map((tag, i) => (
              <span key={tag} className="flex items-center">
                <span className="transition-colors group-hover:text-muted-foreground/80">{tag}</span>
                {i < project.tags!.length - 1 && <span className="ml-2 opacity-40">,</span>}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      
      <div className="relative z-20 flex shrink-0 items-center gap-5 text-sm mt-4 sm:mt-0">
        {project.deployed_url ? (
          <a
            href={project.deployed_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
          >
            <span className="text-xs font-medium uppercase tracking-wider">{translations.liveLink}</span>
          </a>
        ) : null}
        {project.repo_url ? (
          <a
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
          >
            <span className="text-xs font-medium uppercase tracking-wider">{translations.sourceLink}</span>
          </a>
        ) : null}
      </div>
    </div>
  )
}
