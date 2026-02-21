'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { getFeaturedProjects, type ProjectConfig } from '@/lib/config/projects'
import type { MarkdownProject } from '@/lib/markdown/types'
import type { XArticle } from '@/lib/config/x-articles'
import { cn } from '@/lib/utils'

interface Project extends ProjectConfig {
  title: string
  description: string
  tags: string[]
  contentHtml?: string
  content?: string
  category?: string
}

interface ProjectsSectionProps {
  projects?: MarkdownProject[]
  xArticles?: XArticle[]
}

export function ProjectsSection({ projects: markdownProjects, xArticles = [] }: ProjectsSectionProps = {}) {
  const t = useTranslations()
  const locale = useLocale()
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Use Markdown projects if provided, otherwise fall back to config
  let projects: Project[]

  if (markdownProjects && markdownProjects.length > 0) {
    // Map MarkdownProject to Project format
    projects = markdownProjects.map((project) => {
      // Infer category from tags
      const tags = project.tags.map(tag => tag.toLowerCase())
      let category = 'web'
      if (tags.some(t => ['react native', 'expo', 'mobile'].includes(t))) category = 'mobile'
      if (tags.some(t => ['ai', 'openai', 'ml', 'machine learning'].includes(t))) category = 'ai'

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
        category,
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
        category: 'web',
      }
    })
  }

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' },
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

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
    <section id="projects" className="py-24 bg-card scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-accent text-xl md:text-2xl text-primary mb-2">
            {t('projects.subtitle', { default: 'Selected Work' })}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t('projects.description', { default: 'A collection of projects I\'ve built, from AI-powered platforms to mobile apps and full-stack systems.' })}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-foreground border-2 border-border hover:bg-card hover:border-primary'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.id}`}
              className="group bg-background rounded-3xl overflow-hidden border-2 border-border transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-pressed-brown/10 hover:border-primary"
            >
              {/* Project Image/Visual */}
              <div className={cn(
                'w-full h-48 bg-gradient-to-br flex items-center justify-center text-6xl border-b-2 border-border relative',
                getGradientForIndex(index)
              )}>
                {project.featured && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                {/* Icon or emoji placeholder */}
                <span className="opacity-90">
                  {index === 0 ? '🧠' : index === 1 ? '🎲' : index === 2 ? '🌸' : '🏥'}
                </span>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-card text-deep-rose text-xs rounded-xl border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View Archive Link */}
        <div className="flex justify-center pt-12">
          <a
            href="https://github.com/irenehl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            {t('projects.viewArchive', { default: 'View More Projects' })}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
