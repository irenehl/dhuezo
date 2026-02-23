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
  type: 'full-time' | 'freelance' | 'contract' | 'volunteer' | 'leadership' | undefined
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

  // Normalize type values from markdown (handles both English and Spanish)
  function normalizeType(type: string | undefined): 'full-time' | 'freelance' | 'contract' | 'volunteer' | 'leadership' | undefined {
    if (!type) return undefined
    
    const normalized = type.toLowerCase().trim()
    
    // Handle Spanish type names
    if (normalized === 'voluntario') return 'volunteer'
    if (normalized === 'liderazgo') return 'leadership'
    if (normalized === 'tiempo completo' || normalized === 'tiempo-completo') return 'full-time'
    if (normalized === 'contrato') return 'contract'
    
    // Handle English type names
    if (normalized === 'volunteer') return 'volunteer'
    if (normalized === 'leadership') return 'leadership'
    if (normalized === 'full-time' || normalized === 'fulltime') return 'full-time'
    if (normalized === 'freelance') return 'freelance'
    if (normalized === 'contract') return 'contract'
    
    return undefined
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

      const normalizedType = normalizeType(exp.type)

      return {
        id: exp.id,
        title: exp.title,
        company: exp.company,
        period: formatPeriod(exp.start_date, exp.end_date, 'en'),
        description: exp.description,
        responsibilities,
        technologies: exp.technologies,
        type: normalizedType || 'full-time',
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
    { id: 'volunteer', label: t('experience.filters.volunteer', { default: 'Volunteer' }) },
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
        <div className="flex flex-col">
          {filteredExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="py-8 md:py-4 border-b border-border/40 last:border-b-0 group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {/* Header Row */}
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl md:text-2xl text-foreground font-semibold transition-colors group-hover:text-primary">
                    {exp.company}
                  </h3>
                  <div className={cn("w-2 h-2 rounded-full bg-gradient-to-br", exp.eraStyle)} />
                </div>
                <div className="font-mono text-sm text-muted-foreground/80 md:text-right">
                  {exp.period}
                </div>
              </div>

              {/* Role Row */}
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-lg text-foreground/80">
                  {exp.title}
                </h4>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                    {exp.type}
                  </span>
                  {exp.featured && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                      leadership
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed max-w-4xl mb-4">
                {exp.description}
              </p>

              {/* Technologies */}
              <div className="font-mono text-sm text-muted-foreground/60 leading-relaxed">
                {exp.technologies.join(', ')}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t-2 border-border"
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
            { value: `${technologiesCount}+`, label: t('experience.stats.technologies', { default: 'Technologies' }) },
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
