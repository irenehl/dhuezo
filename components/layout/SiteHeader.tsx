'use client'

import { LocaleToggle } from './LocaleToggle'
import { ThemeToggle } from './ThemeToggle'

export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-[60] border-b border-border/50 bg-background/80 backdrop-blur-md dark:border-black/20 dark:bg-black/40">
      <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-3">
        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}


