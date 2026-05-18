import { ArrowUpRight, Github } from 'lucide-react'

import { Link } from '@/i18n/routing'

interface ProjectListEntryProps {
  locale: string
  project: {
    project_id: string
    title: string
    description: string
    tags?: string[]
    deployed_url?: string | null
    repo_url?: string | null
    role?: string | null
    outcome?: string | null
    skip_detail_page?: boolean
  }
  index: number
  translations: {
    liveAriaLabel: string
    repoAriaLabel: string
  }
}

function getHostname(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

const titleLinkClass =
  'transition-colors hover:text-primary focus-visible:text-primary'

export function ProjectListEntry({
  locale,
  project,
  index,
  translations,
}: ProjectListEntryProps): JSX.Element {
  const detailHref = `/projects/${project.project_id}`
  const homeProjectsHref = `/${locale}#projects`
  const hostname = getHostname(project.deployed_url)
  const stack = project.tags ?? []
  const stackPreview = stack.slice(0, 3).join(' · ')
  const meta = project.role ?? stackPreview
  const formattedIndex = String(index).padStart(2, '0')
  const skip = project.skip_detail_page === true

  const titleLink =
    skip && project.deployed_url ? (
      <a
        href={project.deployed_url}
        target="_blank"
        rel="noopener noreferrer"
        className={titleLinkClass}
      >
        {project.title}
      </a>
    ) : skip && project.repo_url ? (
      <a
        href={project.repo_url}
        target="_blank"
        rel="noopener noreferrer"
        className={titleLinkClass}
      >
        {project.title}
      </a>
    ) : !skip ? (
      <Link href={detailHref} className={titleLinkClass}>
        {project.title}
      </Link>
    ) : (
      <Link href={homeProjectsHref} className={titleLinkClass}>
        {project.title}
      </Link>
    )

  return (
    <article className="group border-t border-border/26 transition-colors hover:border-foreground/18">
      <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:gap-5 sm:py-6">
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-xs text-muted-foreground/60 sm:w-[3.25rem] sm:pl-1 sm:pt-1.5"
        >
          {formattedIndex}
        </span>

        <div className="min-w-0 flex-1 space-y-1">
          <h3 className="font-display text-base font-medium tracking-tight text-foreground sm:text-lg">
            {titleLink}
          </h3>
          {meta && (
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {meta}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 sm:pt-1.5">
          {hostname && project.deployed_url && (
            <a
              href={project.deployed_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${translations.liveAriaLabel}`}
              className="group/host inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground/70 transition-colors hover:text-foreground focus-visible:text-foreground"
            >
              <span className="max-w-[180px] truncate">{hostname}</span>
              <ArrowUpRight
                className="size-3 shrink-0 transition-transform duration-300 group-hover/host:-translate-y-0.5 group-hover/host:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${translations.repoAriaLabel}`}
              className="group/repo inline-flex items-center gap-1 font-mono text-[11px] text-foreground/70 transition-colors hover:text-foreground focus-visible:text-foreground"
            >
              <Github
                className="size-3.5 shrink-0 transition-transform duration-300 group-hover/repo:-translate-y-0.5 group-hover/repo:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
