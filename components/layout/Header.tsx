'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const t = useTranslations()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-40 border-b transition-all duration-300',
          isScrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-zinc-200 dark:border-zinc-900'
            : 'bg-transparent border-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-widest uppercase text-zinc-500">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            <button
              className="text-zinc-900 dark:text-zinc-100 hover:text-rose-600 transition-colors md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={t('common.openMenu')}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
