'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

export function FooterBranding() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">D</span>
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {siteConfig.name}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs">
        {siteConfig.description}
      </p>
    </motion.div>
  )
}
