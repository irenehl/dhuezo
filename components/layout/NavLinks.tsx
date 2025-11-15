'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { getNavItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface NavLinksProps {
  isMobile?: boolean
  onLinkClick?: () => void
}

export function NavLinks({ isMobile = false, onLinkClick }: NavLinksProps) {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const navItems = getNavItems(t, locale as any)

  return (
    <>
      {navItems.map((item, index) => {
        const isActive = pathname === item.href

        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                'relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                isActive ? 'text-primary' : 'text-muted-foreground',
                isMobile && 'block text-lg py-3'
              )}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId={isMobile ? 'mobile-active-nav' : 'desktop-active-nav'}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                />
              )}
            </Link>
          </motion.div>
        )
      })}
    </>
  )
}
