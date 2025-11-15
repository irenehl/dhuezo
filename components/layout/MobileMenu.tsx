'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { NavLinks } from './NavLinks'
import { CTAButton } from './CTAButton'
import { ThemeToggle } from './ThemeToggle'
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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l border-border z-50 p-4 sm:p-6 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label={t('common.openMenu')}
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            <nav className="mt-12 space-y-1">
              <NavLinks isMobile onLinkClick={onClose} />
            </nav>

            {/* Theme Toggle */}
            <div className="mt-8 flex justify-center">
              <ThemeToggle />
            </div>

            {/* CTA */}
            <div className="mt-4">
              <CTAButton variant="default" size="lg" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
