'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { locales } from '@/i18n/config'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1 border border-border rounded-md p-1">
      {locales.map((loc) => (
        <Button
          key={loc}
          variant="ghost"
          size="sm"
          onClick={() => handleLocaleChange(loc)}
          className={cn(
            'h-7 px-3 text-xs font-medium transition-colors',
            locale === loc
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          )}
        >
          {loc.toUpperCase()}
        </Button>
      ))}
    </div>
  )
}

