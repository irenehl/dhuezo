'use client'

import { useTranslations, useLocale } from 'next-intl'
import { getNavItems } from '@/lib/navigation'

interface NavLinksProps {
  isMobile?: boolean
  onLinkClick?: () => void
}

export function NavLinks({ isMobile = false, onLinkClick }: NavLinksProps) {
  const t = useTranslations()
  const locale = useLocale()
  const navItems = getNavItems(t, locale as any)

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
          className={`block py-3 px-4 text-sm font-semibold tracking-widest uppercase transition-colors ${
            isMobile
              ? 'text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          {item.label}
        </a>
      ))}
    </>
  )
}
