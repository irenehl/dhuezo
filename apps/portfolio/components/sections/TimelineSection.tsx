'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import type { MarkdownExperience } from '@/lib/markdown/types'
import { cn } from '@/lib/utils'

interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  responsibilities: string[]
  technologies: string[]
  type: 'full-time' | 'freelance' | 'contract'
  featured: boolean
  eraName: string
  eraStyle: string
}

interface TimelineSectionProps {
  experiences?: MarkdownExperience[]
}

function formatPeriod(startDate: string, endDate: string | null, locale: string): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }
  const start = new Date(startDate).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', options)
  const end = endDate
    ? new Date(endDate).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', options)
    : (locale === 'es' ? 'Presente' : 'Present')
  return `${start} — ${end}`
}

export function TimelineSection({ experiences: markdownExperiences }: TimelineSectionProps = {}) {
  const t = useTranslations()
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Era names mapping
  const eraNames: Record<number, string> = {
    1: 'Tech Lead Era',
    2: 'Performance Era',
    3: 'E-Commerce Era',
    4: 'Civic Tech Era',
    5: 'Automation Era',
    6: 'API Architecture Era',
    7: 'React Mastery Era',
    8: 'Innovation Era',
    9: 'Security & Performance Era',
    10: 'Foundation Era',
  }

  const eraStyles: Record<string, string> = {
    'Tech Lead Era': 'from-dusty-rose to-deep-rose',
    'Performance Era': 'from-sage-blue to-burlap',
    'E-Commerce Era': 'from-soft-pink to-dusty-rose',
    'Civic Tech Era': 'from-gentle-beige to-burlap',
    'Automation Era': 'from-pressed-brown to-burlap',
    'API Architecture Era': 'from-dusty-rose to-deep-rose',
    'React Mastery Era': 'from-sage-blue to-deep-rose',
    'Innovation Era': 'from-soft-pink to-gentle-beige',
    'Security & Performance Era': 'from-deep-rose to-pressed-brown',
    'Foundation Era': 'from-burlap to-gentle-beige',
  }

  let experiences: Experience[]

  if (markdownExperiences && markdownExperiences.length > 0) {
    experiences = markdownExperiences.map((exp) => {
      const eraName = eraNames[exp.order_index] || 'Era'
      const responsibilities = exp.content
        ? exp.content.match(/(?:##\s*Responsibilities)([\s\S]*?)(?=##|$)/i)?.[1]
            ?.split('\n')
            .filter(line => line.trim().startsWith('-'))
            .map(line => line.replace(/^-\s*/, '').replace(/\[cite.*?\]/g, '').trim())
            .filter(Boolean) || []
        : []

      return {
        id: exp.id,
        title: exp.title,
        company: exp.company,
        period: formatPeriod(exp.start_date, exp.end_date, 'en'),
        description: exp.longDescription || exp.description,
        responsibilities,
        technologies: exp.technologies,
        type: exp.type as 'full-time' | 'freelance' | 'contract',
        featured: exp.featured,
        eraName,
        eraStyle: eraStyles[eraName] || 'from-dusty-rose to-deep-rose',
      }
    })
  } else {
    experiences = []
  }

  const filters = [
    { id: 'all', label: t('experience.filters.all', { default: 'All Eras' }) },
    { id: 'full-time', label: t('experience.filters.fullTime', { default: 'Full-Time' }) },
    { id: 'freelance', label: t('experience.filters.freelance', { default: 'Freelance' }) },
    { id: 'leadership', label: t('experience.filters.leadership', { default: 'Leadership' }) },
  ]

  const filteredExperiences = experiences.filter((exp) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'leadership') return exp.featured
    return exp.type === activeFilter
  })

  // Calculate stats
  const yearsOfExperience = experiences.length > 0
    ? new Date().getFullYear() - new Date(markdownExperiences?.[markdownExperiences.length - 1]?.start_date || '2021').getFullYear()
    : 4
  const companiesCount = experiences.length
  const technologiesCount = Array.from(new Set(experiences.flatMap(e => e.technologies))).length

  return (
    <section id="experience" className="py-24 bg-card scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-accent text-xl md:text-2xl text-primary mb-2">
            {t('experience.subtitle', { default: 'Career Journey' })}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('experience.title', { default: 'The Eras' })}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t('experience.description', { default: 'Each chapter brought new lessons, challenges, and growth. From building systems to leading teams, here\'s the journey so far.' })}
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
                  : 'bg-transparent text-foreground border-2 border-border hover:bg-background hover:border-primary'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {filteredExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="group relative bg-background rounded-3xl p-8 border-2 border-border overflow-hidden transition-all hover:translate-x-2 hover:shadow-xl hover:shadow-pressed-brown/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Colored left border that expands on hover */}
              <div className={cn(
                'absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b transition-all group-hover:w-2.5',
                exp.eraStyle
              )} />

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4 pl-4">
                <div className="flex-1">
                  <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                    {exp.eraName}
                  </h3>
                  <p className="text-lg font-semibold text-deep-rose mb-1">
                    {exp.company}
                  </p>
                  <span className="inline-block px-3 py-1 bg-card text-muted-foreground text-xs rounded-full border border-border">
                    {exp.type === 'full-time' ? 'Full-Time' : exp.type === 'freelance' ? 'Freelance' : 'Contract'}
                    {exp.featured && ' • Leadership'}
                  </span>
                </div>
                <div className="font-accent text-lg md:text-xl text-primary whitespace-nowrap">
                  {exp.period}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6 pl-4">
                {exp.description}
              </p>

              {/* Responsibilities */}
              {exp.responsibilities.length > 0 && (
                <div className="mb-6 pl-4">
                  <h4 className="font-display text-base font-semibold text-foreground mb-3">
                    {t('experience.responsibilities', { default: 'Key Responsibilities' })}
                  </h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">→</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pl-4">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-card text-deep-rose text-xs rounded-xl border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t-2 border-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {[
            { value: `${yearsOfExperience}+`, label: t('experience.stats.years', { default: 'Years Experience' }) },
            { value: `${companiesCount}+`, label: t('experience.stats.companies', { default: 'Companies & Projects' }) },
            { value: `${technologiesCount}+`, label: t('experience.stats.technologies', { default: 'Technologies Mastered' }) },
            { value: '∞', label: t('experience.stats.problems', { default: 'Problems Solved' }), isInfinity: true },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-background rounded-2xl border-2 border-border group cursor-default transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <motion.div
                className="font-display text-4xl md:text-5xl text-primary mb-2"
                animate={
                  stat.isInfinity
                    ? {
                        scale: [1, 1.05, 1],
                        opacity: [1, 0.9, 1],
                      }
                    : {}
                }
                transition={
                  stat.isInfinity
                    ? {
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : {}
                }
              >
                {stat.value}
              </motion.div>
              <motion.div
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
