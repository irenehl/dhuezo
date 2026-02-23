'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Menu } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LocaleToggle } from './LocaleToggle'
import { ThemeToggle } from './ThemeToggle'
import { MobileMenu } from './MobileMenu'
import { getNavItems } from '@/lib/navigation'

export function SiteHeader(): JSX.Element {
  const t = useTranslations()
  const locale = useLocale()
  const navItems = getNavItems(t, locale as any)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-40 border-b-2 border-border bg-background/85 backdrop-blur-xl transition-all"
        initial={{ y: -100 }}
        animate={{
          y: 0,
          backgroundColor: isScrolled ? 'hsl(var(--background) / 0.95)' : 'hsl(var(--background) / 0.85)',
        }}
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
