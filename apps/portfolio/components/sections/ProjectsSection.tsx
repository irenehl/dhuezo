'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, ExternalLink, Github, X } from 'lucide-react'
import { getFeaturedProjects, type ProjectConfig } from '@/lib/config/projects'
import type { MarkdownProject } from '@/lib/markdown/types'
import type { XArticle } from '@/lib/config/x-articles'
import { XIcon } from '@/components/icons/XIcon'
import { ScrollRevealImage } from '@/components/ui/ScrollRevealImage'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface Project extends ProjectConfig {
  title: string
  description: string
  tags: string[]
  contentHtml?: string
  content?: string
}

interface ProjectsSectionProps {
  projects?: MarkdownProject[]
  xArticles?: XArticle[]
}

export function ProjectsSection({ projects: markdownProjects, xArticles = [] }: ProjectsSectionProps = {}) {
  const t = useTranslations()
  const locale = useLocale()
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  
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
        contentHtml: project.contentHtml,
        content: project.content,
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

  const activeProject = projects.find((p) => p.id === activeProjectId)

  // Extract markdown sections
  const extractMarkdownSection = (content: string | undefined, sectionTitles: string[]): string => {
    if (!content) return ''
    
    // Try each title variant
    for (const title of sectionTitles) {
      const exactMatch = content.match(new RegExp(`## ${title}\\s*\\n\\n([\\s\\S]*?)(?=\\n## |$)`, 'i'))
      if (exactMatch) {
        return exactMatch[1].trim()
      }
    }
    
    return ''
  }

  const extractOverview = (content: string | undefined): string => {
    if (!content) return ''
    // Try both English and Spanish
    return extractMarkdownSection(content, ['Overview', 'Resumen'])
  }

  const extractChallengeSolution = (content: string | undefined): string => {
    if (!content) return ''
    // Try both English and Spanish variants
    const challenge = extractMarkdownSection(content, [
      'The Challenge & Solution',
      'Challenge & Solution',
      'El Desafío y la Solución',
      'Desafío y Solución'
    ])
    if (challenge) return challenge
    
    // Fallback: try to find a section that might contain challenge/solution content
    const sections = content.split(/## /)
    for (const section of sections) {
      const lowerSection = section.toLowerCase()
      if (lowerSection.includes('challenge') || lowerSection.includes('solution') ||
          lowerSection.includes('desafío') || lowerSection.includes('solución')) {
        const contentMatch = section.match(/^[^\n]+\n\n([\s\S]*?)(?=\n## |$)/)
        if (contentMatch) {
          return contentMatch[1].trim()
        }
      }
    }
    
    return ''
  }

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/4716d069-a486-46d4-9cfe-1b3c1d3447eb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H5',location:'apps/portfolio/components/sections/ProjectsSection.tsx:ProjectsSection',message:'ProjectsSection computed projects',data:{locale,source:markdownProjects && markdownProjects.length>0?'markdown':'config',projectCount:projects.length,projects:projects.slice(0,6).map((p)=>({id:p.id,previewImage:(p.previewImage||'').slice(0,160)}))},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log
  }, [locale, markdownProjects, projects.length])

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

      {/* Zig-zag List View */}
      <div className="w-full max-w-5xl mx-auto space-y-24 pt-20">
        {projects.map((project, index) => {
          const isOdd = index % 2 === 1
          
          return (
            <div
              key={project.id}
              onClick={() => setActiveProjectId(project.id)}
              className={cn(
                'group relative flex flex-col md:flex-row items-center gap-8 md:gap-16 cursor-pointer',
                isOdd && 'md:flex-row-reverse'
              )}
            >
              {/* Image Card */}
              <div className="w-full md:w-1/2 aspect-[16/10] overflow-hidden rounded-sm relative border border-white/5 bg-neutral-900 shadow-2xl shadow-black/50 dark:border-zinc-800 dark:bg-zinc-900">
                {project.previewImage && !imageErrors.has(project.id) ? (
                  <>
                    <div className="absolute inset-0 bg-neutral-800 animate-pulse dark:bg-zinc-800" />
                    <ScrollRevealImage
                      src={project.previewImage}
                      alt={project.title}
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                      onError={() => {
                        setImageErrors((prev) => new Set(prev).add(project.id))
                      }}
                    />
                    {/* Hover Overlay Text */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 z-10">
                      <div className="bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 text-white text-xs font-medium tracking-wide dark:bg-black/60 dark:border-white/20">
                        VIEW CASE STUDY
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(200,200,200,.2)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px]" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <span className="font-header text-8xl text-zinc-200 dark:text-zinc-800">
                        {project.number}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Text Content */}
              <div className={cn(
                'w-full md:w-1/2 space-y-6 flex flex-col',
                isOdd ? 'md:items-end md:text-right' : 'md:items-start md:text-left'
              )}>
                <div className="space-y-2">
                  <h2 className="text-3xl text-zinc-900 font-medium tracking-tight group-hover:text-zinc-700 transition-colors dark:text-zinc-100 dark:group-hover:text-zinc-200">
                    {project.title}
                  </h2>
                  <div className={cn(
                    'w-12 h-[1px] bg-neutral-800 dark:bg-zinc-800',
                    isOdd && 'ml-auto'
                  )} />
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed max-w-md group-hover:text-zinc-700 transition-colors dark:text-zinc-400 dark:group-hover:text-zinc-300">
                  {project.description}
                </p>
                
                <div className={cn('flex flex-wrap gap-2', isOdd && 'justify-end')}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider text-zinc-500 border border-neutral-800 px-2 py-1 rounded bg-neutral-950/50 dark:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Full-screen Split-view Modal */}
      <Dialog open={activeProjectId !== null} onOpenChange={(open) => !open && setActiveProjectId(null)}>
        <DialogContent className="fixed inset-0 z-50 max-w-none w-full h-full rounded-none border-0 p-0 bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row [&>button]:hidden translate-x-0 translate-y-0 left-0 top-0 data-[state=open]:animate-in data-[state=closed]:animate-out">
          {activeProject && (
            <>
              {/* Close Button */}
              <button
                onClick={() => setActiveProjectId(null)}
                className="absolute top-6 right-6 z-50 p-2 text-zinc-400 hover:text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10 transition-colors dark:bg-black/50 dark:border-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Left Side (Visuals & High Level) */}
              <div className="w-full md:w-5/12 lg:w-1/3 h-[40vh] md:h-full relative border-r border-white/5 bg-neutral-900/20 dark:border-zinc-800 dark:bg-zinc-900/20">
                <div className="absolute inset-0">
                  {activeProject.previewImage && !imageErrors.has(activeProject.id) ? (
                    <>
                      <ScrollRevealImage
                        src={activeProject.previewImage}
                        alt={activeProject.title}
                        fill
                        className="object-cover opacity-40 mix-blend-overlay grayscale"
                        sizes="33vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/60 to-transparent dark:from-zinc-950 dark:via-zinc-950/60" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/60 to-transparent dark:from-zinc-950 dark:via-zinc-950/60" />
                  )}
                </div>

                <div className="relative h-full flex flex-col justify-end p-8 md:p-12 space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-zinc-300 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <DialogTitle className="text-4xl md:text-5xl lg:text-6xl text-zinc-900 font-medium tracking-tighter leading-[0.9] dark:text-zinc-100">
                      {activeProject.title}
                    </DialogTitle>
                  </div>
                </div>
              </div>

              {/* Right Side (Detailed Content & CTAs) */}
              <div className="w-full md:w-7/12 lg:w-2/3 h-[60vh] md:h-full overflow-y-auto custom-scroll bg-zinc-50 dark:bg-zinc-950">
                <ScrollArea className="h-full">
                  <div className="max-w-2xl mx-auto px-6 py-12 md:p-20 space-y-12">
                    {/* Overview Section */}
                    <div className="space-y-6">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest block border-b border-white/10 pb-4 mb-6 dark:text-zinc-500 dark:border-zinc-800">
                        Overview
                      </span>
                      {extractOverview(activeProject.content) ? (
                        <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-light dark:text-zinc-200">
                          {extractOverview(activeProject.content)}
                        </p>
                      ) : (
                        <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-light dark:text-zinc-200">
                          {activeProject.description}
                        </p>
                      )}
                    </div>

                    {/* Challenge & Solution Section */}
                    {extractChallengeSolution(activeProject.content) && (
                      <div className="space-y-6">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest block border-b border-white/10 pb-4 mb-6 dark:text-zinc-500 dark:border-zinc-800">
                          The Challenge & Solution
                        </span>
                        <p className="text-zinc-400 leading-8 text-sm md:text-base font-light dark:text-zinc-400">
                          {extractChallengeSolution(activeProject.content)}
                        </p>
                      </div>
                    )}

                    {/* CTA Section */}
                    {(activeProject.deployedUrl || activeProject.repoUrl) && (
                      <div className="pt-12 mt-12 border-t border-white/10 dark:border-zinc-800">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {activeProject.deployedUrl && (
                            <a
                              href={activeProject.deployedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 group flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-sm font-medium text-sm hover:bg-neutral-200 transition-all duration-200 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                            >
                              <span>Visit Website</span>
                              <ArrowUpRight className="w-4 h-4 stroke-[1.5] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                          )}
                          {activeProject.repoUrl && (
                            <a
                              href={activeProject.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 group flex items-center justify-center gap-3 bg-neutral-900 border border-neutral-800 text-white px-6 py-4 rounded-sm font-medium text-sm hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-200 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800"
                            >
                              <Github className="w-4 h-4 stroke-[1.5]" />
                              <span>View Repository</span>
                            </a>
                          )}
                        </div>
                        <p className="text-center text-xs text-zinc-600 mt-6 font-medium dark:text-zinc-500">
                          Private repository access may require authorization.
                        </p>
                      </div>
                    )}

                    {/* Read Full Story Link */}
                    <div className="pt-8 border-t border-white/10 dark:border-zinc-800">
                      <Link
                        href={`/${locale}/projects/${activeProject.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                      >
                        Read full story <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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

      {/* X Articles Subsection */}
      {xArticles.length > 0 && (
        <div className="space-y-8 pt-16 border-t border-zinc-200 dark:border-zinc-900">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <XIcon className="w-8 h-8 text-zinc-900 dark:text-zinc-100" />
              <h3 className="font-header text-2xl md:text-3xl text-zinc-900 uppercase tracking-tighter dark:text-zinc-100">
                {t('projects.xArticles.title')}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold text-right max-w-xs dark:text-zinc-500">
              {t('projects.xArticles.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {xArticles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Preview Image */}
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 overflow-hidden">
                    {article.previewImageUrl ? (
                      <ScrollRevealImage
                        src={article.previewImageUrl}
                        alt={article.title}
                        fill
                        className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 192px"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <XIcon className="w-16 h-16 text-zinc-300 dark:text-zinc-700" />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <XIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                          irene (@irenehl26__) on X
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-lg text-foreground transition-colors group-hover:text-accent mb-2 line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <span className="text-xs text-zinc-500 dark:text-zinc-500 font-mono">
                        x.com
                      </span>
                      {article.date && (
                        <>
                          <span className="h-2.5 w-px bg-border/60" />
                          <time className="font-mono text-xs text-muted-foreground/60">
                            {article.date}
                          </time>
                        </>
                      )}
                      <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-rose-600 transition-colors dark:text-zinc-600 dark:group-hover:text-rose-600 ml-auto" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
