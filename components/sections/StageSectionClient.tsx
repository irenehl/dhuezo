'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Plus } from 'lucide-react'

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
        <div className="border-b border-zinc-200 pb-4 mb-8 dark:border-zinc-800">
          <h2 className="font-header text-4xl md:text-5xl text-zinc-900 uppercase tracking-tighter mb-2 dark:text-zinc-100">
            {t('stage.title')}
          </h2>
          <p className="text-zinc-500 text-sm font-medium dark:text-zinc-500">
            {t('stage.subtitle')}
          </p>
        </div>
        <p className="text-zinc-600 text-sm dark:text-zinc-500">{t('stage.empty')}</p>
      </section>
    )
  }

  return (
    <section id="stage" className="space-y-12 relative">
      <div className="border-b border-zinc-200 pb-4 mb-8 dark:border-zinc-800">
        <h2 className="font-header text-4xl md:text-5xl text-zinc-900 uppercase tracking-tighter mb-2 dark:text-zinc-100">
          {t('stage.title')}
        </h2>
        <p className="text-zinc-500 text-sm font-medium dark:text-zinc-500">
          {t('stage.subtitle')}
        </p>
      </div>

      {/* Container with fade-out effect */}
      <div className="relative">
        {/* The Content List (Height constrained) */}
        <div className="flex flex-col divide-y divide-zinc-200 relative pb-24 dark:divide-zinc-800/50">
          {entries.map((entry, index) => {
            // Apply opacity to last few entries for fade effect
            const opacityClass = index >= entries.length - 2 ? (index === entries.length - 1 ? 'opacity-50' : 'opacity-80') : ''
            
            return (
              <div
                key={entry.id}
                className={`group py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 transition-colors hover:bg-white hover:shadow-sm rounded-lg px-2 -mx-2 ${opacityClass} dark:hover:bg-zinc-900/20`}
              >
                <div className="w-24 shrink-0 text-xs text-zinc-500 font-mono font-semibold dark:text-zinc-500">
                  {entry.date}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        entry.type === 'talk'
                          ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-300'
                          : 'bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-100 dark:text-black'
                      }`}
                    >
                      {t(`stage.type.${entry.type}`)}
                    </span>
                    {entry.eventLocation && (
                      <span className="text-xs font-bold text-rose-700 uppercase tracking-wider dark:text-rose-700">
                        {entry.eventLocation}
                      </span>
                    )}
                  </div>
                  {entry.ctaUrl && entry.ctaUrl.startsWith('/') ? (
                    <Link href={entry.ctaUrl}>
                      <h3 className="text-xl md:text-2xl font-display text-zinc-800 group-hover:text-rose-600 transition-colors cursor-pointer font-semibold dark:text-zinc-200 dark:group-hover:text-rose-500">
                        {entry.title}
                      </h3>
                    </Link>
                  ) : (
                    <h3 className="text-xl md:text-2xl font-display text-zinc-800 group-hover:text-rose-600 transition-colors cursor-pointer font-semibold dark:text-zinc-200 dark:group-hover:text-rose-500">
                      {entry.title}
                    </h3>
                  )}
                  <p className="text-sm text-zinc-600 font-normal leading-relaxed max-w-2xl dark:text-zinc-500">
                    {entry.description}
                  </p>
                </div>
                <div className="shrink-0 pt-2 md:pt-0">
                  {entry.ctaUrl && entry.ctaUrl.startsWith('/') ? (
                    <Link
                      href={entry.ctaUrl}
                      className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 border-b border-transparent group-hover:border-zinc-900 transition-all dark:text-zinc-600 dark:group-hover:text-zinc-300 dark:group-hover:border-zinc-300"
                    >
                      {entry.ctaLabel}
                    </Link>
                  ) : (
                    <a
                      href={entry.ctaUrl || '#'}
                      className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 border-b border-transparent group-hover:border-zinc-900 transition-all dark:text-zinc-600 dark:group-hover:text-zinc-300 dark:group-hover:border-zinc-300"
                    >
                      {entry.ctaLabel}
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* The "Difuminate" (Fade Out) Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent flex flex-col items-center justify-end pb-8 z-10 pointer-events-none dark:from-zinc-950 dark:via-zinc-950/90">
          {/* Button needs pointer-events-auto since the parent is none */}
          <button
            className="pointer-events-auto group flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-300 bg-white shadow-sm hover:border-rose-600 hover:text-rose-600 transition-all hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-rose-600 dark:hover:text-rose-600"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {t('stage.loadArchive')}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

