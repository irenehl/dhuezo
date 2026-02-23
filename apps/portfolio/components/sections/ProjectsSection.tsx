'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { animate, motion } from 'framer-motion'
import { getFeaturedProjects, type ProjectConfig } from '@/lib/config/projects'
import type { MarkdownProject } from '@/lib/markdown/types'
import type { XArticle } from '@/lib/config/x-articles'
import { AnimatedSection, StaggerContainer, staggerItemVariants } from '@/components/ui/AnimatedSection'
import { Carousel } from '@/components/ui/carousel'
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
    <section id="projects" className="relative py-24 bg-card scroll-mt-20 overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <AnimatedSection>
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
        </AnimatedSection>

        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'relative px-5 py-2.5 rounded-full text-sm font-medium transition-all overflow-hidden',
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-foreground border-2 border-border hover:bg-card hover:border-primary'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === filter.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
              <span className="relative z-10">{filter.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="mb-8">
          <Carousel
            slidesToShow={3}
            autoPlay={true}
            autoPlayInterval={5000}
            showArrows={true}
            showDots={true}
            className="w-full"
          >
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="px-4">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <a
                  href={project.deployedUrl || project.repoUrl || '#'}
                  target={project.deployedUrl || project.repoUrl ? "_blank" : undefined}
                  rel={project.deployedUrl || project.repoUrl ? "noopener noreferrer" : undefined}
                  className="group relative bg-background rounded-3xl overflow-hidden border-2 border-border transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10 block h-full"
                  style={{
                    outline: 'none',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onFocus={(e) => e.currentTarget.blur()}
                >
                  <div className={cn(
                    'w-full h-48 bg-gradient-to-br flex items-center justify-center text-6xl border-b-2 border-border relative overflow-hidden z-10',
                    getGradientForIndex(index)
                  )}>
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                    
                    {project.featured && (
                      <motion.div
                        className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold z-10"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                      >
                        Featured
                      </motion.div>
                    )}
                    
                    <motion.span
                      className="opacity-90 relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {getProjectEmoji(project.id)}
                    </motion.span>
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  <div className="p-6 space-y-4 relative z-10 bg-background">
                    <motion.h3
                      className="font-display text-2xl text-foreground group-hover:text-primary transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1 bg-card text-deep-rose text-xs rounded-xl border border-border group-hover:border-primary/50 transition-colors"
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ delay: tagIndex * 0.05 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
          ))}
          </Carousel>
        </div>

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
