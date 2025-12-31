'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Menu } from 'lucide-react'
import { LocaleToggle } from './LocaleToggle'
import { ThemeToggle } from './ThemeToggle'
import { MobileMenu } from './MobileMenu'
import { getNavItems } from '@/lib/navigation'
import { siteConfig } from '@/lib/config'

export function SiteHeader(): JSX.Element {
  const t = useTranslations()
  const locale = useLocale()
  const navItems = getNavItems(t, locale as any)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg tracking-widest text-zinc-900 hover:text-rose-600 transition-colors uppercase font-display font-semibold dark:text-zinc-100 dark:hover:text-rose-400"
          >
            {siteConfig.name.split(' ').map((n) => n[0]).join('. ')}
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-zinc-900 transition-colors dark:hover:text-zinc-100"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LocaleToggle />
            </div>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-zinc-900 hover:text-rose-600 transition-colors md:hidden dark:text-zinc-100 dark:hover:text-rose-400"
              aria-label={t('common.openMenu')}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}


