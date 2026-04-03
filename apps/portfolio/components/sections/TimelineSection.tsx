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
    <section id="experience" className="relative py-24 bg-card scroll-mt-20 overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.006] md:opacity-[0.015] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-accent text-xl md:text-2xl text-primary mb-2">
            {t('experience.subtitle', { default: 'Career Journey' })}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('experience.title', { default: 'The Eras' })}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t('experience.description', { default: 'Each chapter brought new lessons, challenges, and growth. From building systems to leading teams, here\'s the journey so far.' })}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'relative px-5 py-2.5 rounded-full text-sm font-medium transition-all overflow-hidden',
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-foreground border-2 border-border hover:bg-background hover:border-primary'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active state shimmer */}
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
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col">
          {filteredExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="py-8 md:py-4 border-b border-border/40 last:border-b-0 group relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ x: 4 }}
            >
              {/* Subtle glow on hover */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(to bottom, hsl(var(--primary)), transparent)`,
                }}
              />
              
              {/* Header Row */}
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <motion.h3
                    className="text-xl md:text-2xl text-foreground font-semibold transition-colors group-hover:text-primary"
                    whileHover={{ x: 4 }}
                  >
                    {exp.company}
                  </motion.h3>
                  <motion.div
                    className={cn("w-2 h-2 rounded-full bg-gradient-to-br", exp.eraStyle)}
                    whileHover={{ scale: 1.5, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                <motion.div
                  className="font-mono text-sm text-muted-foreground/80 md:text-right"
                  whileHover={{ scale: 1.05 }}
                >
                  {exp.period}
                </motion.div>
              </div>

              {/* Role Row */}
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-lg text-foreground/80 group-hover:text-foreground transition-colors">
                  {exp.title}
                </h4>
                <motion.div
                  className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <motion.span
                    className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                    whileHover={{ scale: 1.1 }}
                  >
                    {exp.type}
                  </motion.span>
                  {exp.featured && (
                    <motion.span
                      className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary"
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        boxShadow: [
                          '0 0 0px rgba(var(--primary-rgb), 0)',
                          '0 0 8px rgba(var(--primary-rgb), 0.3)',
                          '0 0 0px rgba(var(--primary-rgb), 0)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{ '--primary-rgb': '212, 165, 196' } as React.CSSProperties}
                    >
                      leadership
                    </motion.span>
                  )}
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                className="text-muted-foreground leading-relaxed max-w-4xl mb-4 group-hover:text-foreground/90 transition-colors"
                whileHover={{ x: 4 }}
              >
                {exp.description}
              </motion.p>

              {/* Technologies */}
              <motion.div
                className="font-mono text-sm text-muted-foreground/60 leading-relaxed group-hover:text-muted-foreground/80 transition-colors"
                whileHover={{ x: 4 }}
              >
                {exp.technologies.join(', ')}
              </motion.div>
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
              className="relative text-center p-6 bg-background rounded-2xl border-2 border-border group cursor-default overflow-hidden"
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
              whileHover={{ y: -4, borderColor: 'hsl(var(--primary))' }}
            >
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                }}
              />
              <motion.div
                className="font-display text-4xl md:text-5xl text-primary mb-2 relative z-10"
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
                className="text-sm text-muted-foreground relative z-10"
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
