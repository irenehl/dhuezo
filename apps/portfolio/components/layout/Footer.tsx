'use client'

import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/config'

export const Footer = (): JSX.Element => {
  const tFooter = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-card pt-16 pb-[max(4rem,env(safe-area-inset-bottom,0px))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_100%,hsl(var(--primary)/0.06),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.006] md:opacity-[0.012]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left Side - Cozy Message */}
          <div className="text-center font-accent text-lg text-muted-foreground md:text-left md:text-xl">
            {tFooter('cozyMessage', { default: 'Built with coffee, flowers, and way too many Taylor Swift songs' })}
          </div>

          {/* Right Side - Links */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#intro" className="transition-colors hover:text-primary">
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
