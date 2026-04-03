'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { getFeaturedProjects, type ProjectConfig } from '@/lib/config/projects'
import type { MarkdownProject } from '@/lib/markdown/types'
import type { XArticle } from '@/lib/config/x-articles'
import { SectionChapter } from '@/components/ui/SectionChapter'
import { Carousel } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface Project extends Omit<ProjectConfig, 'previewImage'> {
  title: string
  description: string
  tags: string[]
  previewImage?: string
  contentHtml?: string
  content?: string
  category?: string
  role?: string | null
  outcome?: string | null
  constraint?: string | null
}

interface ProjectsSectionProps {
  projects?: MarkdownProject[]
  xArticles?: XArticle[]
}

export function ProjectsSection({ projects: markdownProjects, xArticles = [] }: ProjectsSectionProps = {}) {
  const t = useTranslations()
  const [activeFilter, setActiveFilter] = useState<string>('all')

  let projects: Project[]

  if (markdownProjects && markdownProjects.length > 0) {
    projects = markdownProjects.map((project) => {
      const tags = project.tags.map(tag => tag.toLowerCase())
      let category = 'web'
      if (tags.some(t => ['react native', 'expo', 'mobile'].includes(t))) category = 'mobile'
      if (tags.some(t => ['ai', 'openai', 'ml', 'machine learning'].includes(t))) category = 'ai'

      return {
        id: project.project_id,
        number: String(project.order_index).padStart(2, '0'),
        previewImage: project.preview_image_url || undefined,
        deployedUrl: project.deployed_url || undefined,
        repoUrl: project.repo_url || undefined,
        featured: project.featured,
        title: project.title,
        description: project.description,
        tags: project.tags,
        contentHtml: project.contentHtml,
        content: project.content,
        category,
        role: project.role ?? undefined,
        outcome: project.outcome ?? undefined,
        constraint: project.constraint ?? undefined,
      }
    })
  } else {
    const projectsConfig = getFeaturedProjects()
    projects = projectsConfig.map((config) => {
      const projectKey = `project${config.id}` as const
      return {
        ...config,
        previewImage: config.previewImage || undefined,
        title: t(`projects.${projectKey}.title`),
        description: t(`projects.${projectKey}.description`),
        tags: [
          t(`projects.${projectKey}.tag1`),
          t(`projects.${projectKey}.tag2`),
        ],
        category: 'web',
        role: undefined,
        outcome: undefined,
        constraint: undefined,
      }
    })
  }

  const filters = [
    { id: 'all', label: t('projects.filters.all', { default: 'All' }) },
    { id: 'web', label: t('projects.filters.web', { default: 'Web' }) },
    { id: 'mobile', label: t('projects.filters.mobile', { default: 'Mobile' }) },
    { id: 'ai', label: t('projects.filters.ai', { default: 'AI/ML' }) },
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const primaryProjectUrl = (p: Project): string =>
    p.deployedUrl || p.repoUrl || '#'

  const getProjectEmoji = (projectId: string): string => {
    const emojiMap: Record<string, string> = {
      'cerebryx': '🧠',
      'food-dice': '🎲',
      'nameless-mindfulness-app': '🌸',
      'travel-guide': '✈️',
      'smart-resume': '📄',
      'pixel-meet': '🎮',
    }
    return emojiMap[projectId] || '💼'
  }

  const getGradientForIndex = (index: number) => {
    const gradients = [
      'from-sage-blue to-dusty-rose',
      'from-dusty-rose to-soft-pink',
      'from-burlap to-gentle-beige',
      'from-deep-rose to-dusty-rose',
    ]
    return gradients[index % gradients.length]
  }

  return (
    <section
      id="projects"
      className="relative scroll-mt-header overflow-hidden border-t border-border/50 bg-card py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_50%_at_15%_-10%,hsl(var(--secondary)/0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.006] md:opacity-[0.014]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <SectionChapter
            variant="immersive"
            sceneIndex="02"
            label={t('sections.chapter.projects')}
            title={t('projects.title')}
            description={t('projects.description')}
          />
        </motion.div>

        <motion.div
          className="mb-12 inline-flex flex-wrap gap-1 rounded-full border border-border/60 bg-background/60 p-1.5 shadow-sm backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06 }}
          role="toolbar"
          aria-label={t('projects.filtersAria', {
            default: 'Filter projects by category',
          })}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground',
              )}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 mb-8 w-screen max-w-[100vw]">
        {filteredProjects.length === 0 ? (
          <p className="mx-auto max-w-xl rounded-2xl border border-border/50 bg-background/60 px-6 py-10 text-center text-muted-foreground backdrop-blur-sm">
            {t('projects.emptyState')}
          </p>
        ) : (
          <Carousel
            key={activeFilter}
            layout="strip"
            slidesToShow={3}
            autoPlay={true}
            autoPlayInterval={4000}
            pauseOnHover={false}
            showArrows={true}
            showDots={true}
            className="w-screen"
            stripSlideClassName="w-[min(420px,85vw)] md:w-[min(400px,40vw)] lg:w-[min(420px,32vw)]"
          >
            {filteredProjects.map((project, index) => {
              const href = primaryProjectUrl(project)
              const hasExternal = Boolean(project.deployedUrl || project.repoUrl)
              return (
                <div key={project.id}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                  >
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-background/85 shadow-[0_12px_40px_-20px_hsl(var(--pressed-brown)/0.12)] backdrop-blur-sm transition-shadow duration-300 hover:border-primary/30 hover:shadow-[0_20px_56px_-24px_hsl(var(--pressed-brown)/0.18)] dark:bg-card/70">
                      <a
                        href={href}
                        target={hasExternal ? '_blank' : undefined}
                        rel={hasExternal ? 'noopener noreferrer' : undefined}
                        className="flex min-h-0 flex-1 flex-col outline-none"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        <div
                          className={cn(
                            'relative z-10 flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b border-border/60 bg-gradient-to-br text-6xl',
                            !project.previewImage && getGradientForIndex(index),
                          )}
                        >
                          <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.012] md:opacity-[0.03]" />

                          {project.previewImage ? (
                            <>
                              <Image
                                src={project.previewImage}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) min(90vw, calc(100vw - 3rem)), 33vw"
                                unoptimized={project.previewImage.startsWith('http')}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                            </>
                          ) : (
                            <motion.span
                              className="relative z-10 opacity-90"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                              {getProjectEmoji(project.id)}
                            </motion.span>
                          )}

                          {project.featured ? (
                            <motion.div
                              className="absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                            >
                              {t('projects.featuredBadge', { default: 'Featured' })}
                            </motion.div>
                          ) : null}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>

                        <div className="relative z-10 flex flex-1 flex-col space-y-3 bg-background p-6">
                          {project.role ? (
                            <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                              {project.role}
                            </p>
                          ) : null}
                          <motion.h3
                            className="font-display text-2xl text-foreground transition-colors group-hover:text-primary"
                            whileHover={{ x: 4 }}
                          >
                            {project.title}
                          </motion.h3>
                          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
                            {project.description}
                          </p>
                          {project.outcome ? (
                            <p className="text-sm font-medium leading-snug text-foreground/90">
                              {project.outcome}
                            </p>
                          ) : null}
                          {project.constraint ? (
                            <p className="text-xs italic leading-relaxed text-muted-foreground">
                              {project.constraint}
                            </p>
                          ) : null}

                          <div className="flex flex-wrap gap-2 pt-1">
                            {project.tags.slice(0, 4).map((tag, tagIndex) => (
                              <motion.span
                                key={tag}
                                className="rounded-xl border border-border bg-card px-3 py-1 text-xs text-deep-rose transition-colors group-hover:border-primary/50"
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ delay: tagIndex * 0.05 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </a>

                      {(project.deployedUrl || project.repoUrl) && (
                        <div className="flex flex-wrap gap-2 border-t border-border/60 bg-card/30 px-6 py-3">
                          {project.deployedUrl ? (
                            <a
                              href={project.deployedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                              <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                              {t('projects.liveLink')}
                            </a>
                          ) : null}
                          {project.repoUrl ? (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                              <Github className="size-3.5 shrink-0" aria-hidden />
                              {t('projects.sourceLink')}
                            </a>
                          ) : null}
                        </div>
                      )}
                    </article>
                  </motion.div>
                </div>
              )
            })}
          </Carousel>
        )}
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl justify-center px-6 pt-12 lg:px-16">
        <a
          href="https://github.com/irenehl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          {t('projects.viewArchive', { default: 'View More Projects' })}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
