'use client'

import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/config'

export const Footer = (): JSX.Element => {
  const tCommon = useTranslations('common')
  const tFooter = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-border bg-card py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Side - Cozy Message */}
          <div className="font-accent text-lg md:text-xl text-muted-foreground text-center md:text-left">
            {tFooter('cozyMessage', { default: 'Built with coffee, flowers, and way too many Taylor Swift songs' })}
          </div>

          {/* Right Side - Links */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#hero" className="hover:text-primary transition-colors">
              {tFooter('top', { default: 'Top' })}
            </a>
            <span>•</span>
            <span>© {year} {siteConfig.name}</span>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const html = document.documentElement
                  html.classList.toggle('dark')
                  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light')
                }
              }}
              className="hover:text-primary transition-colors hidden sm:block"
            >
              {tFooter('toggleTheme', { default: 'Toggle Theme' })}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
