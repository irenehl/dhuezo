'use client'

import { useTranslations, useLocale } from 'next-intl'
import { getNavItems } from '@/lib/navigation'
import type { Locale } from '@/i18n/config'

interface NavLinksProps {
  isMobile?: boolean
  onLinkClick?: () => void
}

export function NavLinks({ isMobile = false, onLinkClick }: NavLinksProps) {
  const t = useTranslations()
  const locale = useLocale()
  const navItems = getNavItems(t, locale as Locale)

  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick()
    }
  }

  return (
    <>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={handleClick}
          className={`block py-3 px-4 text-sm font-medium transition-all ${
            isMobile
              ? 'text-foreground hover:text-primary hover:bg-card rounded-full border-2 border-transparent hover:border-border'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          {item.label}
        </a>
      ))}
    </>
  )
}
