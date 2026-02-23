'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { NavLinks } from './NavLinks'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations()
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background/95 backdrop-blur-xl border-l-2 border-border z-50 p-6 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-card rounded-full transition-all text-muted-foreground hover:text-foreground border-2 border-transparent hover:border-border"
              aria-label={t('common.openMenu')}
            >
              <X size={20} />
            </button>

            {/* Navigation */}
            <nav className="mt-16 space-y-2">
              <NavLinks isMobile onLinkClick={onClose} />
            </nav>

            {/* Theme Toggle & Language Switcher */}
            <div className="mt-12 flex flex-col items-center gap-4 pt-8 border-t-2 border-border">
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
