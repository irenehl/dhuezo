'use client'

import { useLocale } from 'next-intl'
import { usePathname as useNextPathname } from 'next/navigation'

import { Link } from '@/i18n/routing'

export function LocaleToggle(): JSX.Element {
  const locale = useLocale()
  const nextPathname = useNextPathname()

  // Determine current locale from URL pathname
  const pathnameLocale = nextPathname?.split('/')[1]
  const currentLocale = (pathnameLocale === 'en' || pathnameLocale === 'es') ? pathnameLocale : locale
  
  const targetLocale = currentLocale === 'en' ? 'es' : 'en'

  // Always use '/' for root path - next-intl's Link will handle the locale prefix
  const href = '/'

  return (
    <Link
      href={href}
      locale={targetLocale}
      aria-label={`Switch language to ${targetLocale.toUpperCase()}`}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-border/22 bg-card/40 text-xs font-medium text-foreground hover:bg-card hover:border-border/32 transition-all shadow-sm backdrop-blur-sm uppercase"
    >
      {targetLocale}
    </Link>
  )
}
