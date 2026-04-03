'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { MarkdownExperience } from '@/lib/markdown/types'
import { SectionChapter } from '@/components/ui/SectionChapter'
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

function formatPeriod(
  startDate: string,
  endDate: string | null,
  locale: string,
): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }
  const start = new Date(startDate).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    options,
  )
  const end = endDate
    ? new Date(endDate).toLocaleDateString(
        locale === 'es' ? 'es-ES' : 'en-US',
        options,
      )
    : locale === 'es'
      ? 'Presente'
      : 'Present'
  return `${start} — ${end}`
}

/** Gradient tokens per experience order (stable across locales). */
const eraStyleByIndex: Record<number, string> = {
  1: 'from-dusty-rose to-deep-rose',
  2: 'from-sage-blue to-burlap',
  3: 'from-soft-pink to-dusty-rose',
  4: 'from-gentle-beige to-burlap',
  5: 'from-pressed-brown to-burlap',
  6: 'from-dusty-rose to-deep-rose',
  7: 'from-sage-blue to-deep-rose',
  8: 'from-soft-pink to-gentle-beige',
  9: 'from-deep-rose to-pressed-brown',
  10: 'from-burlap to-gentle-beige',
}

const PREVIEW_EXPERIENCE_COUNT = 3

export function TimelineSection({
  experiences: markdownExperiences,
}: TimelineSectionProps = {}) {
  const t = useTranslations()
  const locale = useLocale()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAllExperiences, setShowAllExperiences] = useState(false)

  function normalizeType(
    type: string | undefined,
  ): 'full-time' | 'freelance' | 'contract' | 'volunteer' | 'leadership' | undefined {
    if (!type) return undefined

    const normalized = type.toLowerCase().trim()

    if (normalized === 'voluntario') return 'volunteer'
    if (normalized === 'liderazgo') return 'leadership'
    if (normalized === 'tiempo completo' || normalized === 'tiempo-completo')
      return 'full-time'
    if (normalized === 'contrato') return 'contract'

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
      const eraIndex = Math.min(10, Math.max(1, exp.order_index))
      const eraName = t(
        `experience.eraNames.${eraIndex}` as
          | 'experience.eraNames.1'
          | 'experience.eraNames.2'
          | 'experience.eraNames.3'
          | 'experience.eraNames.4'
          | 'experience.eraNames.5'
          | 'experience.eraNames.6'
          | 'experience.eraNames.7'
          | 'experience.eraNames.8'
          | 'experience.eraNames.9'
          | 'experience.eraNames.10',
      )
      const responsibilities = exp.content
        ? exp.content
            .match(/(?:##\s*Responsibilities)([\s\S]*?)(?=##|$)/i)?.[1]
            ?.split('\n')
            .filter((line) => line.trim().startsWith('-'))
            .map((line) =>
              line.replace(/^-\s*/, '').replace(/\[cite.*?\]/g, '').trim(),
            )
            .filter(Boolean) || []
        : []

      const normalizedType = normalizeType(exp.type)

      return {
        id: exp.id,
        title: exp.title,
        company: exp.company,
        period: formatPeriod(exp.start_date, exp.end_date, locale),
        description: exp.description,
        responsibilities,
        technologies: exp.technologies,
        type: normalizedType || 'full-time',
        featured: exp.featured,
        eraName,
        eraStyle:
          eraStyleByIndex[eraIndex] || 'from-dusty-rose to-deep-rose',
      }
    })
  } else {
    experiences = []
  }

  const yearsOfExperience =
    experiences.length > 0
      ? new Date().getFullYear() -
        new Date(
          markdownExperiences?.[markdownExperiences.length - 1]?.start_date ||
            '2021',
        ).getFullYear()
      : 4
  const companiesCount = experiences.length
  const technologiesCount = Array.from(
    new Set(experiences.flatMap((e) => e.technologies)),
  ).length

  const stats = [
    {
      value: `${yearsOfExperience}+`,
      label: t('experience.stats.years', { default: 'Years Experience' }),
    },
    {
      value: `${companiesCount}+`,
      label: t('experience.stats.companies', { default: 'Companies & Projects' }),
    },
    {
      value: `${technologiesCount}+`,
      label: t('experience.stats.technologies', {
        default: 'Technologies Mastered',
      }),
    },
    {
      value: '∞',
      label: t('experience.stats.problems', { default: 'Problems Solved' }),
      isInfinity: true,
    },
  ]

  const hasMoreExperiences = experiences.length > PREVIEW_EXPERIENCE_COUNT
  const visibleExperiences =
    showAllExperiences || !hasMoreExperiences
      ? experiences
      : experiences.slice(0, PREVIEW_EXPERIENCE_COUNT)

  return (
    <section
      id="experience"
      className="relative scroll-mt-header overflow-hidden border-t border-border/50 bg-card py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.08),transparent_50%)]" />
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
            sceneIndex="04"
            label={t('sections.chapter.experience')}
            title={t('experience.title', { default: 'The Eras' })}
            description={t('experience.description', {
              default:
                "Each chapter brought new lessons, challenges, and growth. From building systems to leading teams, here's the journey so far.",
            })}
          />
        </motion.div>

        <motion.div
          role="region"
          className="mb-12 flex flex-col divide-y divide-border/60 border-y border-border/60 bg-muted/25 py-2 dark:bg-muted/15 md:flex-row md:divide-x md:divide-y-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          aria-label={t('experience.statsAria', {
            default: 'Career highlights at a glance',
          })}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-1 flex-col items-center justify-center px-4 py-6 text-center md:py-8"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
                },
              }}
            >
              <motion.span
                className="font-display text-3xl text-primary md:text-4xl"
                animate={
                  stat.isInfinity
                    ? {
                        scale: [1, 1.04, 1],
                        opacity: [1, 0.92, 1],
                      }
                    : undefined
                }
                transition={
                  stat.isInfinity
                    ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                    : undefined
                }
              >
                {stat.value}
              </motion.span>
              <span className="mt-1 max-w-[12rem] text-xs font-medium uppercase tracking-wider text-muted-foreground md:text-sm">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-[15px] top-3 bottom-3 hidden w-px bg-gradient-to-b from-primary/50 via-border to-border/30 md:block md:left-[19px]"
            aria-hidden
          />

          <div className="flex flex-col gap-10 md:gap-8">
            {visibleExperiences.map((exp, index) => {
              const isOpen = expandedId === exp.id
              const hasExpandableDetails = exp.responsibilities.length > 0

              return (
                <motion.article
                  key={exp.id}
                  className="relative pl-10 md:pl-14"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  <div
                    className="absolute left-0 top-7 z-10 flex size-8 items-center justify-center rounded-full border-2 border-background bg-card shadow-sm md:left-1 md:top-8 md:size-9"
                    aria-hidden
                  >
                    <span
                      className={cn(
                        'block size-3 rounded-full bg-gradient-to-br ring-2 ring-background',
                        exp.eraStyle,
                      )}
                    />
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-background/75 p-5 shadow-[0_12px_40px_-20px_hsl(var(--pressed-brown)/0.15)] backdrop-blur-sm transition-shadow hover:shadow-[0_16px_48px_-20px_hsl(var(--pressed-brown)/0.2)] dark:bg-card/60 md:p-7 md:pl-8">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
                          {exp.eraName}
                        </p>
                        <h3 className="mt-1 font-display text-2xl text-foreground md:text-3xl">
                          {exp.company}
                        </h3>
                        <p className="mt-0.5 text-lg text-foreground/85">
                          {exp.title}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                        <span className="font-mono text-sm text-muted-foreground">
                          {exp.period}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                            {exp.type}
                          </span>
                          {exp.featured ? (
                            <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                              {t('experience.leadershipBadge', {
                                default: 'Leadership',
                              })}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground/85 md:text-sm">
                      {exp.technologies.join(' · ')}
                    </p>

                    {hasExpandableDetails ? (
                      <div className="mt-5">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          onClick={() =>
                            setExpandedId(isOpen ? null : exp.id)
                          }
                          aria-expanded={isOpen}
                        >
                          {isOpen
                            ? t('experience.collapseDetails', {
                                default: 'Hide details',
                              })
                            : t('experience.expandDetails', {
                                default: 'Show responsibilities',
                              })}
                          <ChevronDown
                            className={cn(
                              'size-4 transition-transform',
                              isOpen && 'rotate-180',
                            )}
                            aria-hidden
                          />
                        </button>

                        {isOpen ? (
                          <ul className="mt-4 list-inside list-disc space-y-1.5 border-t border-border/50 pt-4 text-sm text-muted-foreground">
                            {exp.responsibilities.map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        {hasMoreExperiences ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background/80 px-8 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => setShowAllExperiences((v) => !v)}
              aria-expanded={showAllExperiences}
            >
              {showAllExperiences
                ? t('experience.viewLess', { default: 'Show less' })
                : t('experience.viewMore', { default: 'View more roles' })}
              <ChevronDown
                className={cn(
                  'size-4 transition-transform',
                  showAllExperiences && 'rotate-180',
                )}
                aria-hidden
              />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
