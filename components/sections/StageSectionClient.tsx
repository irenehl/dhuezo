'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

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
      <section id="stage" className="space-y-12">
        <div className="border-b border-border pb-4 mb-8 dark:border-zinc-800">
          <h2 className="font-header text-4xl md:text-5xl text-foreground uppercase tracking-tighter mb-2 dark:text-zinc-100">
            {t('stage.title')}
          </h2>
          <p className="text-muted-foreground text-sm font-light dark:text-zinc-500">
            {t('stage.subtitle')}
          </p>
        </div>
        <p className="text-muted-foreground text-sm dark:text-zinc-500">{t('stage.empty')}</p>
      </section>
    )
  }

  return (
    <section id="stage" className="space-y-12">
      <div className="border-b border-border pb-4 mb-8 dark:border-zinc-800">
        <h2 className="font-header text-4xl md:text-5xl text-foreground uppercase tracking-tighter mb-2 dark:text-zinc-100">
          {t('stage.title')}
        </h2>
        <p className="text-muted-foreground text-sm font-light dark:text-zinc-500">
          {t('stage.subtitle')}
        </p>
      </div>

      <div className="flex flex-col divide-y divide-border dark:divide-zinc-800/50">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="group py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 transition-colors hover:bg-muted/50 dark:hover:bg-zinc-900/20"
          >
            <div className="w-24 shrink-0 text-xs text-muted-foreground font-mono dark:text-zinc-500">
              {entry.date}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    entry.type === 'talk'
                      ? 'bg-muted text-foreground dark:bg-zinc-800 dark:text-zinc-300'
                      : 'bg-muted text-foreground dark:bg-zinc-100 dark:text-black'
                  }`}
                >
                  {t(`stage.type.${entry.type}`)}
                </span>
                {entry.eventLocation && (
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider dark:text-rose-700">
                    {entry.eventLocation}
                  </span>
                )}
              </div>
              {entry.ctaUrl && entry.ctaUrl.startsWith('/') ? (
                <Link href={entry.ctaUrl}>
                  <h3 className="text-xl md:text-2xl font-display text-foreground group-hover:text-accent transition-colors cursor-pointer dark:text-zinc-200 dark:group-hover:text-rose-500">
                    {entry.title}
                  </h3>
                </Link>
              ) : (
                <h3 className="text-xl md:text-2xl font-display text-foreground group-hover:text-accent transition-colors cursor-pointer dark:text-zinc-200 dark:group-hover:text-rose-500">
                  {entry.title}
                </h3>
              )}
              <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-2xl dark:text-zinc-500">
                {entry.description}
              </p>
            </div>
            <div className="shrink-0 pt-2 md:pt-0">
              {entry.ctaUrl && entry.ctaUrl.startsWith('/') ? (
                <Link
                  href={entry.ctaUrl}
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground border-b border-transparent group-hover:border-foreground transition-all dark:text-zinc-600 dark:group-hover:text-zinc-300 dark:group-hover:border-zinc-300"
                >
                  {entry.ctaLabel}
                </Link>
              ) : (
                <a
                  href={entry.ctaUrl || '#'}
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground border-b border-transparent group-hover:border-foreground transition-all dark:text-zinc-600 dark:group-hover:text-zinc-300 dark:group-hover:border-zinc-300"
                >
                  {entry.ctaLabel}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

