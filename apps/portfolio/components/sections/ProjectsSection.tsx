'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight, ExternalLink, Github } from 'lucide-react'
import { getFeaturedProjects, type ProjectConfig } from '@/lib/config/projects'
import type { MarkdownProject } from '@/lib/markdown/types'

interface Project extends ProjectConfig {
  title: string
  description: string
  tags: string[]
}

interface ProjectsSectionProps {
  projects?: MarkdownProject[]
}

export function ProjectsSection({ projects: markdownProjects }: ProjectsSectionProps = {}) {
  const t = useTranslations()
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  
  // Use Markdown projects if provided, otherwise fall back to config
  let projects: Project[]
  
  if (markdownProjects && markdownProjects.length > 0) {
    // Map MarkdownProject to Project format
    projects = markdownProjects.map((project) => {
      return {
        id: project.project_id,
        number: String(project.order_index).padStart(2, '0'),
        previewImage: project.preview_image_url,
        deployedUrl: project.deployed_url || undefined,
        repoUrl: project.repo_url || undefined,
        featured: project.featured,
        title: project.title,
        description: project.description,
        tags: project.tags,
      }
    })
  } else {
    // Fallback to config-based projects
    const projectsConfig = getFeaturedProjects()
    projects = projectsConfig.map((config) => {
      const projectKey = `project${config.id}` as const
      return {
        ...config,
        title: t(`projects.${projectKey}.title`),
        description: t(`projects.${projectKey}.description`),
        tags: [
          t(`projects.${projectKey}.tag1`),
          t(`projects.${projectKey}.tag2`),
        ],
      }
    })
  }

  return (
    <section id="projects" className="space-y-16 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-900">
        <h2 className="font-header text-4xl md:text-6xl text-zinc-900 uppercase tracking-tighter dark:text-zinc-100">
          {t('projects.title')}
        </h2>
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold text-right max-w-xs dark:text-zinc-500">
          {t('projects.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => {
          const hasLinks = project.deployedUrl || project.repoUrl
          const primaryLink = project.deployedUrl || project.repoUrl
          
          return (
            <article
              key={project.id}
              className="group cursor-pointer md:mt-16 first:mt-0 md:first:mt-0 md:[&:nth-child(2)]:mt-16"
            >
              <div className="relative aspect-[4/3] bg-white border border-zinc-200 overflow-hidden mb-6 shadow-sm group-hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
                {/* Preview Image */}
                {project.previewImage && !imageErrors.has(project.id) ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={project.previewImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                      onError={() => {
                        setImageErrors((prev) => new Set(prev).add(project.id))
                      }}
                    />
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10 dark:bg-zinc-950/20" />
                  </div>
                ) : (
                  <>
                    {/* Fallback: Abstract Representation */}
                    <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(200,200,200,.2)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px]" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                      <span className="font-header text-8xl text-zinc-200 group-hover:text-zinc-300 dark:text-zinc-800 dark:group-hover:text-zinc-600">
                        {project.number}
                      </span>
                    </div>
                  </>
                )}
                
                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex gap-2 z-20">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-[10px] font-semibold bg-white border border-zinc-200 text-zinc-600 uppercase tracking-wider shadow-sm dark:bg-zinc-950/80 dark:border-zinc-800 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Link Icons */}
                {hasLinks && (
                  <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.deployedUrl && (
                      <a
                        href={project.deployedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors dark:bg-zinc-950/80 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-rose-600 dark:hover:border-rose-600"
                        aria-label={`Visit ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors dark:bg-zinc-950/80 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-rose-600 dark:hover:border-rose-600"
                        aria-label={`View ${project.title} repository`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
              
              {/* Project Info */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {primaryLink ? (
                    <a
                      href={primaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group/link"
                    >
                      <h3 className="font-display text-2xl text-zinc-900 hover-glitch mb-1 font-semibold dark:text-zinc-100">
                        {project.title}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="font-display text-2xl text-zinc-900 hover-glitch mb-1 font-semibold dark:text-zinc-100">
                      {project.title}
                    </h3>
                  )}
                  <p className="text-sm text-zinc-600 leading-relaxed max-w-sm dark:text-zinc-500">
                    {project.description}
                  </p>
                </div>
                {hasLinks && (
                  <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-rose-600 transition-colors dark:text-zinc-600 dark:group-hover:text-rose-600 flex-shrink-0 ml-4" />
                )}
              </div>
            </article>
          )
        })}
      </div>

      <div className="flex justify-center pt-8">
        <a
          href="https://github.com/irenehl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-rose-600 transition-colors dark:text-zinc-400 dark:hover:text-rose-600"
        >
          {t('projects.viewArchive')} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

