'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { getNavItems } from '@/lib/navigation'

export function FooterNavigation() {
  const t = useTranslations()
  const locale = useLocale()
  const navItems = getNavItems(t, locale as any)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground">Navegación</h3>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/color-history"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Historial de Colores
          </Link>
        </li>
      </ul>
    </motion.div>
  )
}
