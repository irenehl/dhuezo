'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionChapter } from '@/components/ui/SectionChapter'
import { cn } from '@/lib/utils'

interface StageEntry {
  id: string
  date: string
  type: 'talk' | 'article' | 'slide'
  eventLocation?: string
  title: string
  description: string
  ctaLabel: string
  ctaUrl?: string
}

interface StageSectionClientProps {
  entries: StageEntry[]
}

export function StageSectionClient({ entries }: StageSectionClientProps) {
  const t = useTranslations()

  const header = (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <SectionChapter
        variant="immersive"
        sceneIndex="05"
        label={t('sections.chapter.stage')}
        title={t('stage.title', { default: 'Writing' })}
        description={t('stage.description', {
          default:
            'Insights on development, leadership, and lessons learned along the way.',
        })}
      />
    </motion.div>
  )

  if (entries.length === 0) {
    return (
      <section
        id="stage"
        className="relative scroll-mt-header overflow-hidden border-t border-border/50 bg-background py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_100%_0%,hsl(var(--secondary)/0.12),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.006] md:opacity-[0.014]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
          {header}
          <div className="relative mt-8 rounded-2xl border border-border/60 bg-card/40 p-10 backdrop-blur-sm">
            <p className="text-muted-foreground">
              {t('stage.empty', { default: 'No posts yet. Check back soon!' })}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const [featured, ...rest] = entries

  return (
    <section
      id="stage"
      className="relative scroll-mt-header overflow-hidden border-t border-border/50 bg-background py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_100%_0%,hsl(var(--secondary)/0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.006] md:opacity-[0.014]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
        {header}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <Link
            href={featured.ctaUrl || '#'}
            className="group relative mb-14 block overflow-hidden rounded-3xl border-2 border-border/70 bg-card/50 shadow-[0_20px_60px_-28px_hsl(var(--pressed-brown)/0.2)] backdrop-blur-sm transition-colors hover:border-primary/50 md:mb-16"
          >
            <div className="grid min-h-[280px] md:min-h-[320px] md:grid-cols-[1fr_42%]">
              <div className="relative flex flex-col justify-center p-8 md:p-10 lg:p-12">
                <span className="font-accent text-2xl text-primary md:text-3xl">
                  {t('stage.featured', { default: 'Spotlight' })}
                </span>
                <span className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {featured.date}
                  {featured.eventLocation
                    ? ` · ${featured.eventLocation}`
                    : ''}
                </span>
                <span
                  className={cn(
                    'mt-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider',
                    featured.type === 'talk'
                      ? 'bg-pressed-brown text-warm-cream'
                      : 'bg-primary text-primary-foreground',
                  )}
                >
                  {t(`stage.type.${featured.type}`, { default: featured.type })}
                </span>
                <h3 className="mt-5 font-display text-3xl leading-tight text-foreground transition-colors group-hover:text-primary md:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {featured.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {featured.ctaLabel}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
              <div
                className="relative min-h-[200px] border-t border-border/50 bg-gradient-to-br from-dusty-rose/35 via-gentle-beige/40 to-sage-blue/35 md:border-l md:border-t-0"
                aria-hidden
              >
                <div className="absolute inset-0 bg-noise opacity-[0.04]" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <span className="font-accent text-6xl text-primary/25 md:text-8xl">
                    {t(`stage.type.${featured.type}`, {
                      default: featured.type,
                    }).slice(0, 1)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {rest.length > 0 ? (
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {t('stage.moreLabel', { default: 'From the archive' })}
            </p>
            <ul
              className="divide-y divide-border/50 border-t border-border/50"
              aria-label={t('stage.archiveAria', {
                default: 'More articles and talks',
              })}
            >
              {rest.map((entry, index) => (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                >
                  <Link
                    href={entry.ctaUrl || '#'}
                    className="group grid gap-4 py-8 md:grid-cols-[minmax(0,7.5rem)_1fr] md:gap-10"
                  >
                    <div className="flex flex-col md:items-end md:text-right">
                      <span className="font-mono text-xs text-muted-foreground">
                        {entry.date}
                      </span>
                      <span className="mt-1 font-accent text-lg text-primary">
                        {t(`stage.type.${entry.type}`, { default: entry.type })}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display text-xl text-foreground transition-colors group-hover:text-primary md:text-2xl">
                        {entry.title}
                      </h4>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {entry.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-90 transition-opacity group-hover:opacity-100">
                        {entry.ctaLabel}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
