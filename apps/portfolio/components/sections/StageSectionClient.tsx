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

  if (entries.length === 0) {
    return (
      <section id="stage" className="relative py-24 bg-background scroll-mt-20 overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-accent text-xl md:text-2xl text-primary mb-2">
              {t('stage.subtitle', { default: 'Latest Thoughts' })}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              {t('stage.title', { default: 'Writing' })}
            </h2>
          </motion.div>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t('stage.empty', { default: 'No posts yet. Check back soon!' })}
          </motion.p>
        </div>
      </section>
    )
  }

  return (
    <section id="stage" className="relative py-24 bg-background scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-accent text-xl md:text-2xl text-primary mb-2">
            {t('stage.subtitle', { default: 'Latest Thoughts' })}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('stage.title', { default: 'Writing' })}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t('stage.description', { default: 'Insights on development, leadership, and lessons learned along the way.' })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <motion.div whileHover={{ y: -8 }}>
                <Link
                  href={entry.ctaUrl || '#'}
                  className="group relative block bg-card rounded-3xl overflow-hidden border-2 border-border transition-all hover:shadow-2xl hover:shadow-pressed-brown/20 hover:border-primary"
                >
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, hsl(var(--primary)) 0%, transparent 50%)`,
                      filter: 'blur(20px)',
                    }}
                  />
                  
                  <div className="w-full h-52 bg-gradient-to-br from-dusty-rose to-sage-blue border-b-2 border-border relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={cn(
                          'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block',
                          entry.type === 'talk'
                            ? 'bg-pressed-brown text-warm-cream'
                            : 'bg-primary text-primary-foreground'
                        )}
                      >
                        {t(`stage.type.${entry.type}`, { default: entry.type })}
                      </span>
                    </div>
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>

                  <div className="p-6 space-y-3 relative z-10">
                    <motion.div
                      className="text-xs text-primary font-medium"
                      whileHover={{ x: 4 }}
                    >
                      {entry.date}
                    </motion.div>
                    <motion.h3
                      className="font-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors line-clamp-2"
                      whileHover={{ x: 4 }}
                    >
                      {entry.title}
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      {entry.description}
                    </motion.p>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
