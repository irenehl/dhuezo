'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link as I18nLink } from '@/i18n/routing'
import { ArrowUpRight, ArrowRight, ExternalLink, Github } from 'lucide-react'
import { getFeaturedProjects, type ProjectConfig } from '@/lib/config/projects'

interface Project extends ProjectConfig {
  title: string
  description: string
  tags: string[]
}

export function ProjectsSection() {
  const t = useTranslations()
  const projectsConfig = getFeaturedProjects()
  
  // Merge config with translations
  const projects: Project[] = projectsConfig.map((config) => {
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

  return (
    <section id="projects" className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-900 pb-6 dark:border-zinc-900">
        <h2 className="font-header text-4xl md:text-6xl text-zinc-100 uppercase tracking-tighter dark:text-zinc-100">
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
              className="group md:mt-16 first:mt-0 md:first:mt-0 md:[&:nth-child(2)]:mt-16"
            >
              <div className="relative aspect-[4/3] bg-zinc-900 border border-zinc-800 overflow-hidden mb-6 dark:bg-zinc-900 dark:border-zinc-800">
                {/* Preview Image */}
                {project.previewImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={project.previewImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors z-10 dark:bg-zinc-950/20" />
                  </div>
                ) : (
                  <>
                    {/* Fallback: Abstract Representation */}
                    <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(60,60,60,.1)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                      <span className="font-header text-8xl text-zinc-800 group-hover:text-zinc-600 dark:text-zinc-800 dark:group-hover:text-zinc-600">
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
                      className="px-2 py-1 text-[10px] font-medium bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 text-zinc-400 uppercase tracking-wider dark:bg-zinc-950/80 dark:border-zinc-800 dark:text-zinc-400"
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
                        className="p-2 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 text-zinc-400 hover:text-rose-600 hover:border-rose-600 transition-colors dark:bg-zinc-950/80 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-rose-600 dark:hover:border-rose-600"
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
                        className="p-2 bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 text-zinc-400 hover:text-rose-600 hover:border-rose-600 transition-colors dark:bg-zinc-950/80 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-rose-600 dark:hover:border-rose-600"
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
                      <h3 className="font-display text-2xl text-zinc-100 hover-glitch mb-1 dark:text-zinc-100 group-hover/link:text-rose-600 transition-colors">
                        {project.title}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="font-display text-2xl text-zinc-100 hover-glitch mb-1 dark:text-zinc-100">
                      {project.title}
                    </h3>
                  )}
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-sm dark:text-zinc-500">
                    {project.description}
                  </p>
                </div>
                {hasLinks && (
                  <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-rose-600 transition-colors dark:text-zinc-600 dark:group-hover:text-rose-600 flex-shrink-0 ml-4" />
                )}
              </div>
            </article>
          )
        })}
      </div>

      <div className="flex justify-center pt-8">
        <I18nLink
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-rose-600 transition-colors dark:text-zinc-400 dark:hover:text-rose-600"
        >
          {t('projects.viewArchive')} <ArrowRight className="w-4 h-4" />
        </I18nLink>
      </div>
    </section>
  )
}

