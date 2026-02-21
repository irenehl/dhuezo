'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
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

  // If no entries, show placeholder or empty state
  if (entries.length === 0) {
    return (
      <section id="stage" className="py-24 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="mb-12">
            <div className="font-accent text-xl md:text-2xl text-primary mb-2">
              {t('stage.subtitle', { default: 'Latest Thoughts' })}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              {t('stage.title', { default: 'Writing' })}
            </h2>
          </div>
          <p className="text-muted-foreground">{t('stage.empty', { default: 'No posts yet. Check back soon!' })}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="stage" className="py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-accent text-xl md:text-2xl text-primary mb-2">
            {t('stage.subtitle', { default: 'Latest Thoughts' })}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('stage.title', { default: 'Writing' })}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t('stage.description', { default: 'Insights on development, leadership, and lessons learned along the way.' })}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={entry.ctaUrl || '#'}
                className="group block bg-card rounded-3xl overflow-hidden border-2 border-border transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-pressed-brown/10 hover:border-primary"
              >
                {/* Image placeholder */}
                <div className="w-full h-52 bg-gradient-to-br from-dusty-rose to-sage-blue border-b-2 border-border relative">
                  {/* Type badge */}
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider',
                      entry.type === 'talk'
                        ? 'bg-pressed-brown text-warm-cream'
                        : 'bg-primary text-primary-foreground'
                    )}>
                      {t(`stage.type.${entry.type}`, { default: entry.type })}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="text-xs text-primary font-medium">
                    {entry.date}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {entry.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {entry.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
