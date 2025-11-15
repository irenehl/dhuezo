'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Mail, Github, Linkedin } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function FooterContact() {
  const t = useTranslations()
  const contactLinks = [
    {
      icon: Mail,
      label: t('common.email'),
      href: `mailto:${siteConfig.links.email}`,
      text: siteConfig.links.email,
    },
    {
      icon: Github,
      label: t('common.github'),
      href: siteConfig.links.github,
      text: t('common.github'),
    },
    {
      icon: Linkedin,
      label: t('common.linkedin'),
      href: siteConfig.links.linkedin,
      text: t('common.linkedin'),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground">{t('common.contact')}</h3>
      <ul className="space-y-3">
        {contactLinks.map((link) => {
          const Icon = link.icon
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>{link.text}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}
