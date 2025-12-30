'use client'

import { useTranslations } from 'next-intl'
import { Zap } from 'lucide-react'

export function Footer() {
  const t = useTranslations()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-900 bg-black py-12 dark:border-zinc-900 dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xs text-zinc-600 font-mono dark:text-zinc-600">
          {t('footer.copyright', { year: currentYear })}
        </div>
        <div className="flex items-center gap-1 text-zinc-700 text-xs uppercase tracking-widest dark:text-zinc-700">
          <span>{t('footer.designed')}</span>
          <Zap className="w-3 h-3 text-yellow-600 dark:text-yellow-600" />
        </div>
      </div>
    </footer>
  )
}
