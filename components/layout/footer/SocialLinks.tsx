'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function SocialLinks() {
  const socials = [
    {
      icon: Github,
      href: siteConfig.links.github,
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: siteConfig.links.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: `mailto:${siteConfig.links.email}`,
      label: 'Email',
    },
  ]

  return (
    <div className="flex items-center space-x-4">
      {socials.map((social, index) => {
        const Icon = social.icon
        return (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.label !== 'Email' ? '_blank' : undefined}
            rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
            aria-label={social.label}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        )
      })}
    </div>
  )
}
