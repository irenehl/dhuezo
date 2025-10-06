'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function FooterContact() {
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${siteConfig.links.email}`,
      text: siteConfig.links.email,
    },
    {
      icon: Github,
      label: 'GitHub',
      href: siteConfig.links.github,
      text: 'GitHub',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: siteConfig.links.linkedin,
      text: 'LinkedIn',
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
      <h3 className="font-semibold text-foreground">Contacto</h3>
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
