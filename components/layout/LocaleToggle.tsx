'use client'

import { useLocale } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/i18n/routing'

export function LocaleToggle(): JSX.Element {
  const locale = useLocale()
  const pathname = usePathname()

  const targetLocale = locale === 'en' ? 'es' : 'en'

  return (
    <Button
      asChild
      type="button"
      variant="outline"
      size="sm"
      className="rounded-full border-border/50 bg-background/80 backdrop-blur-sm font-mono text-[0.7rem] px-3 py-1 text-foreground hover:bg-muted hover:border-border transition-colors dark:border-white/20 dark:bg-black/20 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/40"
    >
      <Link
        href={pathname}
        locale={targetLocale}
        aria-label={`Switch language to ${targetLocale.toUpperCase()}`}
      >
        {targetLocale.toUpperCase()}
      </Link>
    </Button>
  )
}


