'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

interface CTAButtonProps {
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

export function CTAButton({ variant = 'default', size = 'default' }: CTAButtonProps) {
  const t = useTranslations()
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant={variant}
        size={size}
        asChild
        className="group"
      >
        <a
          href={siteConfig.calendarLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Calendar className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
          {t('common.letsTalk')}
        </a>
      </Button>
    </motion.div>
  )
}
