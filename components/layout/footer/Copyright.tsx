'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function Copyright() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex items-center space-x-2 text-sm text-muted-foreground"
    >
      <span>© {currentYear} {siteConfig.name}.</span>
      <span className="flex items-center">
        Hecho con
        <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500 animate-pulse" />
        y Next.js
      </span>
    </motion.div>
  )
}
