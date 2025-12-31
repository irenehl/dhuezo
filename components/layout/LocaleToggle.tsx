'use client'

import { useLocale } from 'next-intl'
import { usePathname as useNextPathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
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
    <Button
      asChild
      type="button"
      variant="outline"
      size="sm"
      className="rounded-full border-border/50 bg-background/80 backdrop-blur-sm font-mono text-[0.7rem] px-3 py-1 text-foreground hover:bg-muted hover:border-border transition-colors dark:border-white/20 dark:bg-black/20 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/40"
    >
      <Link
        href={href}
        locale={targetLocale}
        aria-label={`Switch language to ${targetLocale.toUpperCase()}`}
      >
        {targetLocale.toUpperCase()}
      </Link>
    </Button>
  )
}


