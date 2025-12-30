'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function Logo() {
  const t = useTranslations()
  return (
    <Link
      href="/"
      className="font-header text-lg tracking-widest text-zinc-900 hover:text-rose-600 transition-colors uppercase dark:text-zinc-100 dark:hover:text-rose-600"
    >
      {t('site.name')}
    </Link>
  )
}
