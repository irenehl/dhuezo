'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { locales } from '@/i18n/config'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1 border border-zinc-800 rounded-md p-1 dark:border-zinc-800">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={cn(
            'h-7 px-3 text-xs font-medium transition-colors uppercase tracking-wider',
            locale === loc
              ? 'bg-zinc-800 text-zinc-100 dark:bg-zinc-800 dark:text-zinc-100'
              : 'text-zinc-500 hover:text-zinc-100 dark:text-zinc-500 dark:hover:text-zinc-100'
          )}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

