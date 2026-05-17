'use client'

import { useCallback } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

import { COMMAND_PALETTE_OPEN_EVENT } from '@/components/layout/command-palette'
import { LocaleToggle } from './locale-toggle'
import { ThemeToggle } from './theme-toggle'
import { getNavItems } from '@/lib/navigation'
import { Link } from '@/i18n/routing'

export function SiteHeader(): JSX.Element {
  const t = useTranslations()
  const tPalette = useTranslations('commandPalette')
  const locale = useLocale()
  const pathname = usePathname()
  const navItems = getNavItems(t)

  const openPalette = useCallback((): void => {
    window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT))
  }, [])

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      {/* Left side: Navigation Links Pill */}
      <div className="flex w-full overflow-x-auto custom-scroll sm:w-auto sm:overflow-visible pb-2 sm:pb-0">
        <div className="flex items-center rounded-full bg-card/40 border border-border/60 p-1.5 backdrop-blur-sm shadow-sm relative">
          {navItems.map((item) => {
            // For the root path, we need an exact match to avoid highlighting it on every route
            const isRootPath = item.pathPattern === '/'
            const isActive = isRootPath 
              ? pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/'
              : pathname.includes(item.pathPattern)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap z-10 ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80 hover:bg-background/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-background shadow-sm border border-border/40"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                    }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={openPalette}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground hover:bg-card shadow-sm backdrop-blur-sm"
          aria-label={tPalette('openAria')}
        >
          <Search className="size-4" aria-hidden />
          <span className="tabular-nums">⌘K</span>
        </button>
        
        <LocaleToggle />
        <ThemeToggle />
      </div>
    </nav>
  )
}
