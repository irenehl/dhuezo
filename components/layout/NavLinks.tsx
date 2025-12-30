'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { getNavItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface NavLinksProps {
  isMobile?: boolean
  onLinkClick?: () => void
}

export function NavLinks({ isMobile = false, onLinkClick }: NavLinksProps) {
  const t = useTranslations()
  const locale = useLocale()
  const navItems = getNavItems(t, locale as any)
  const [activeHash, setActiveHash] = useState<string>('')

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }
    
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.pushState(null, '', href)
        setActiveHash(href)
      }
    }
    onLinkClick?.()
  }

  if (isMobile) {
    return (
      <>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleAnchorClick(e, item.href)}
            className={cn(
              'block text-lg py-3 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors',
              activeHash === item.href && 'text-rose-600 dark:text-rose-600'
            )}
          >
            {item.label}
          </a>
        ))}
      </>
    )
  }

  return (
    <>
      {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleAnchorClick(e, item.href)}
            className={cn(
              'hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-zinc-500 dark:text-zinc-500',
              activeHash === item.href && 'text-zinc-900 dark:text-zinc-100'
            )}
          >
            {item.label}
          </a>
      ))}
    </>
  )
}
