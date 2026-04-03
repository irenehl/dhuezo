'use client'

import { cn } from '@/lib/utils'

export interface SectionChapterProps {
  label: string
  title: string
  description?: string
  className?: string
  headingId?: string
  /** Immersive: mono scene index + tighter title scale for atmospheric sections */
  variant?: 'default' | 'immersive'
  /** Shown in mono when variant is immersive (e.g. "02", "III") */
  sceneIndex?: string
}

/**
 * Chapter header: small track label + display title + optional lede.
 * Use `variant="immersive"` with `sceneIndex` for scroll-story sections.
 */
export function SectionChapter({
  label,
  title,
  description,
  className,
  headingId,
  variant = 'default',
  sceneIndex,
}: SectionChapterProps): JSX.Element {
  if (variant === 'immersive') {
    return (
      <div className={cn('mb-12 md:mb-14', className)}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10 md:gap-14">
          {sceneIndex ? (
            <span
              className="shrink-0 font-mono text-5xl font-light tabular-nums leading-none tracking-tight text-primary/90 md:text-6xl lg:text-7xl"
              aria-hidden
            >
              {sceneIndex}
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <h2
              id={headingId}
              className="font-display text-3xl leading-[1.12] tracking-tight text-foreground md:text-4xl lg:text-5xl"
            >
              <span className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground md:text-xs">
                {label}
              </span>
              <span className="block">{title}</span>
            </h2>
            {description ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('mb-12', className)}>
      <h2
        id={headingId}
        className="font-display text-4xl text-foreground md:text-5xl lg:text-6xl"
      >
        <span className="mb-3 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground md:text-xs">
          {label}
        </span>
        <span className="block">{title}</span>
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
