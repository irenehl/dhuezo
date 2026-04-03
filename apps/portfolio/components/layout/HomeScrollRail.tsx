'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  HOME_SCROLL_SECTION_IDS,
  type HomeScrollSectionId,
} from '@/lib/home-scroll-sections'

export interface HomeScrollRailProps {
  ariaLabel: string
  sectionLabels: Record<HomeScrollSectionId, string>
}

export function HomeScrollRail({
  ariaLabel,
  sectionLabels,
}: HomeScrollRailProps): JSX.Element {
  const [activeId, setActiveId] = useState<HomeScrollSectionId | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) {
          return
        }
        const best = visible.reduce((a, b) =>
          b.intersectionRatio > a.intersectionRatio ? b : a,
        )
        const id = best.target.id
        if (HOME_SCROLL_SECTION_IDS.includes(id as HomeScrollSectionId)) {
          setActiveId(id as HomeScrollSectionId)
        }
      },
      {
        root: null,
        rootMargin: '-42% 0px -42% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const id of HOME_SCROLL_SECTION_IDS) {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    }

    return () => observer.disconnect()
  }, [])

  const activeIndex = activeId
    ? HOME_SCROLL_SECTION_IDS.indexOf(activeId) + 1
    : 1
  const total = HOME_SCROLL_SECTION_IDS.length

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block',
        'pr-[max(0px,env(safe-area-inset-right,0px))]',
      )}
    >
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto rounded-2xl border border-border/60 bg-background/80 px-4 py-5 shadow-[0_16px_48px_-28px_hsl(var(--pressed-brown)/0.35)] backdrop-blur-md dark:bg-card/70"
      >
        <p className="mb-4 font-mono text-[0.65rem] font-semibold tabular-nums tracking-[0.2em] text-muted-foreground">
          {String(activeIndex).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <ul className="flex flex-col gap-1">
          {HOME_SCROLL_SECTION_IDS.map((id) => {
            const isActive = activeId === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    'block rounded-lg px-2 py-1.5 text-left text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                  )}
                >
                  {sectionLabels[id]}
                </a>
              </li>
            )
          })}
        </ul>
      </motion.div>
    </nav>
  )
}
