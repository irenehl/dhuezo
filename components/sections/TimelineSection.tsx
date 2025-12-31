'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link as I18nLink } from '@/i18n/routing'
import { Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import type { MarkdownExperience } from '@/lib/markdown/types'

interface Experience {
  id: string
  title: string
  company: string
  period: string
  bullets: string[]
  tags: string[]
  isActive?: boolean
}

interface TimelineSectionProps {
  experiences?: MarkdownExperience[]
}

function formatPeriod(startDate: string, endDate: string | null): string {
  const start = new Date(startDate).getFullYear()
  const end = endDate ? new Date(endDate).getFullYear() : 'PRESENT'
  return `${start} — ${end}`
}

// Individual experience item component with its own scroll animation
function ExperienceItem({ 
  exp, 
  opacityOverride 
}: { 
  exp: Experience
  opacityOverride?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-20%', amount: 0.2 })

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: opacityOverride ?? 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 md:pl-12 group"
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="absolute -left-[5px] top-6 w-[9px] h-[9px] bg-white border border-zinc-400 group-hover:bg-rose-600 group-hover:border-rose-500 transition-colors shadow-sm rotate-45 rounded-[1px] dark:bg-zinc-900 dark:border-zinc-600 dark:group-hover:bg-rose-600 dark:group-hover:border-rose-500" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h3 className="text-2xl font-display text-zinc-900 font-semibold dark:text-zinc-100">
          {exp.title}
        </h3>
        <span className="text-xs font-mono text-zinc-500 font-medium dark:text-zinc-500">
          {exp.period}
        </span>
      </div>
      <div
        className={`text-sm font-bold uppercase tracking-wider mb-4 ${
          exp.isActive ? 'text-rose-700 dark:text-rose-700' : 'text-zinc-500 dark:text-zinc-500'
        }`}
      >
        {exp.company}
      </div>

      <ul className="space-y-2 text-sm text-zinc-600 font-normal list-disc list-inside marker:text-zinc-400 dark:text-zinc-400 dark:marker:text-zinc-700">
        {exp.bullets.map((bullet, idx) => (
          <li key={idx}>{bullet}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-zinc-600 border border-zinc-300 px-2 py-0.5 rounded-full uppercase tracking-wide bg-white dark:text-zinc-600 dark:border-zinc-800"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function TimelineSection({ experiences: markdownExperiences }: TimelineSectionProps = {}) {
  const t = useTranslations()
  const locale = useLocale()
  const [showAll, setShowAll] = useState(false)

  // Use Markdown experiences if provided, otherwise fall back to translations
  let experiences: Experience[]
  
  if (markdownExperiences && markdownExperiences.length > 0) {
    // Map MarkdownExperience to Experience format
    experiences = markdownExperiences.map((exp) => {
      // Use longDescription split by newlines, or fallback to description
      let bullets: string[] = []
      if (exp.longDescription) {
        bullets = exp.longDescription.split('\n').filter(Boolean).map((line) => line.trim())
      }
      if (bullets.length === 0) {
        bullets = [exp.description]
      }
      
      return {
        id: exp.id,
        title: exp.title,
        company: exp.company,
        period: formatPeriod(exp.start_date, exp.end_date),
        bullets,
        tags: exp.technologies,
        isActive: !exp.end_date,
      }
    })
  } else {
    // Fallback to translation-based experiences
    experiences = [
      {
        id: '1',
        title: t('timeline.exp1.title'),
        company: t('timeline.exp1.company'),
        period: t('timeline.exp1.period'),
        bullets: [
          t('timeline.exp1.bullet1'),
          t('timeline.exp1.bullet2'),
          t('timeline.exp1.bullet3'),
        ],
        tags: [t('timeline.exp1.tag1'), t('timeline.exp1.tag2'), t('timeline.exp1.tag3')],
        isActive: true,
      },
      {
        id: '2',
        title: t('timeline.exp2.title'),
        company: t('timeline.exp2.company'),
        period: t('timeline.exp2.period'),
        bullets: [
          t('timeline.exp2.bullet1'),
          t('timeline.exp2.bullet2'),
        ],
        tags: [t('timeline.exp2.tag1'), t('timeline.exp2.tag2'), t('timeline.exp2.tag3')],
      },
    ]
  }

  // Determine how many items to show initially (show first 2, rest hidden)
  const initialVisibleCount = 2
  const visibleExperiences = showAll ? experiences : experiences.slice(0, initialVisibleCount)
  const hasMore = experiences.length > initialVisibleCount

  return (
    <section id="timeline" className="space-y-16 relative scroll-mt-20">
      <div className="border-b border-zinc-200 pb-4 mb-8 dark:border-zinc-800">
        <h2 className="font-header text-4xl md:text-5xl text-zinc-900 uppercase tracking-tighter mb-2 dark:text-zinc-100">
          {t('timeline.title')}
        </h2>
        <p className="text-zinc-500 text-sm font-medium dark:text-zinc-500">
          {t('timeline.subtitle')}
        </p>
      </div>

      {/* Container with fade-out effect */}
      <div className="relative">
        {/* The Content List */}
        <div className={`relative border-l border-zinc-300 ml-3 md:ml-6 space-y-12 py-4 dark:border-zinc-800 ${!showAll && hasMore ? 'pb-24' : ''}`}>
          {visibleExperiences.map((exp, index) => {
            // Apply opacity to last few entries for fade effect (only when not showing all)
            const isLastVisible = index === visibleExperiences.length - 1
            const isSecondLast = index === visibleExperiences.length - 2
            const opacityOverride = !showAll && hasMore 
              ? (isLastVisible ? 0.5 : isSecondLast ? 0.8 : undefined)
              : undefined
            
            return (
              <ExperienceItem
                key={`${locale}-${exp.id}-${index}`}
                exp={exp}
                opacityOverride={opacityOverride}
              />
            )
          })}
        </div>

        {/* The "Difuminate" (Fade Out) Overlay - only show when there are more items and not showing all */}
        {!showAll && hasMore && (
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent flex flex-col items-center justify-end pb-8 z-10 pointer-events-none dark:from-zinc-950 dark:via-zinc-950/90">
            {/* Button needs pointer-events-auto since the parent is none */}
            <I18nLink
              href="/blog"
              className="pointer-events-auto group flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-300 bg-white shadow-sm hover:border-rose-600 hover:text-rose-600 transition-all hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-rose-600 dark:hover:text-rose-600"
            >
              <Plus className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                {t('timeline.loadArchive')}
              </span>
            </I18nLink>
          </div>
        )}

        {/* Show Less button - appears when all items are shown */}
        {showAll && hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                setShowAll(false)
                // Scroll to timeline section smoothly
                setTimeout(() => {
                  document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 100)
              }}
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-300 bg-white shadow-sm hover:border-rose-600 hover:text-rose-600 transition-all hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-rose-600 dark:hover:text-rose-600"
            >
              <Minus className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                {t('timeline.showLess')}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

