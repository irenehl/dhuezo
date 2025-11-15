'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function FooterCTA() {
  const t = useTranslations()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground">{t('common.workTogether')}</h3>
      <p className="text-sm text-muted-foreground">
        {t('common.scheduleMeeting')}
      </p>
      <Button
        asChild
        size="lg"
        className="w-full group"
      >
        <a
          href={siteConfig.calendarLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {t('common.letsTalk')}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
    </motion.div>
  )
}
