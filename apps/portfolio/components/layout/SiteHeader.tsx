'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LocaleToggle } from './LocaleToggle'
import { ThemeToggle } from './ThemeToggle'
import { MobileMenu } from './MobileMenu'
import { getNavItems } from '@/lib/navigation'
import type { Locale } from '@/i18n/config'

export function SiteHeader(): JSX.Element {
  const t = useTranslations()
  const locale = useLocale()
  const navItems = getNavItems(t, locale as Locale)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = (): void => {
      setIsScrolled(window.scrollY > 50)
      ticking = false
    }
    const onScroll = (): void => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 w-full z-40 border-b-2 border-border backdrop-blur-xl transition-colors duration-300',
          isScrolled ? 'bg-background/95' : 'bg-background/85',
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <Image
              src="/logo-with-bg.svg"
              alt="Daniela Huezo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors hidden sm:block">
              Daniela Huezo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LocaleToggle />
            </div>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-foreground hover:text-primary transition-colors md:hidden p-2"
              aria-label={t('common.openMenu')}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
