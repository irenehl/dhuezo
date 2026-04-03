'use client'

import { useTranslations } from 'next-intl'
import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { XIcon } from '@/components/icons/XIcon'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function AboutSection() {
  const t = useTranslations()

  const favorites = [
    {
      name: t('about.favorites.animalCrossing', { default: 'Animal Crossing' }),
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </svg>
      ),
    },
    {
      name: t('about.favorites.pokemon', { default: 'Pokémon' }),
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
      ),
    },
    {
      name: t('about.favorites.ramen', { default: 'Ramen spots' }),
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        </svg>
      ),
    },
    {
      name: t('about.favorites.fitness', { default: 'Fitness' }),
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
        </svg>
      ),
    },
    {
      name: t('about.favorites.taylorSwift', { default: 'Taylor Swift' }),
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10 8 16 12 10 16 10 8"></polygon>
        </svg>
      ),
    },
    {
      name: t('about.favorites.marketing', { default: 'Marketing strategy' }),
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      ),
    },
  ]

  return (
    <section id="about" className="relative py-24 bg-card scroll-mt-20 overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.006] md:opacity-[0.015] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <AnimatedSection>
          <div>
            <div className="font-accent text-xl md:text-2xl text-primary">
              {t('about.subtitle', { default: 'Get to Know Me' })}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              {t('about.title', { default: 'About' })}
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 lg:items-center">
          <AnimatedSection className="lg:col-span-2 space-y-6" direction="left">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('about.description1', {
                default: "I'm a Tech Lead and Full-Stack Developer from El Salvador, currently building resilient systems at Agora Partnerships. I believe in writing code that's both elegant and functional—the kind that makes the next developer's life easier, not harder."
              })}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('about.description2', {
                default: "My approach combines technical expertise with strategic thinking. Whether I'm architecting a new platform, leading a development team, or optimizing existing systems, I focus on sustainable solutions that scale."
              })}
            </p>

            <div className="pt-8">
              <motion.a
                href="https://calendar.app.google/Q65Hgz9cCqa2m1Ei9"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-base overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <Mail className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{t('about.cta', { default: "Let's Connect" })}</span>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ boxShadow: '0 0 0 0 rgba(var(--primary-rgb), 0)' }}
                  whileHover={{ boxShadow: '0 8px 24px -4px rgba(var(--primary-rgb), 0.4)' }}
                  style={{ '--primary-rgb': '212, 165, 196' } as React.CSSProperties}
                />
              </motion.a>
            </div>

            <div className="flex gap-4 pt-4">
              {[
                { href: t('about.social.github', { default: 'https://github.com/irenehl' }), icon: Github, label: 'GitHub' },
                { href: t('about.social.linkedin', { default: 'https://linkedin.com/in/danielahuezo' }), icon: Linkedin, label: 'LinkedIn' },
                { href: t('about.social.x', { default: 'https://x.com/irenehl26__' }), icon: XIcon, label: 'X' },
                { href: t('about.social.instagram', { default: 'https://instagram.com/irenehl__' }), icon: InstagramIcon, label: 'Instagram' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 border-2 border-border rounded-full hover:bg-pressed-brown hover:text-warm-cream hover:border-pressed-brown transition-all overflow-hidden"
                  aria-label={label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.4 }}
                  />
                  <Icon className="w-5 h-5 relative z-10" />
                </motion.a>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-background p-8 rounded-3xl border-2 border-border" direction="right" delay={0.2}>
            <h3 className="font-display text-2xl text-foreground mb-6 text-center">
              {t('about.favorites.title', { default: 'Currently Into' })}
            </h3>
            <div className="space-y-4">
              {favorites.map((favorite, index) => (
                <motion.div
                  key={index}
                  className="group/item flex items-center gap-4 p-3 rounded-2xl transition-all hover:bg-card cursor-pointer"
                  whileHover={{ x: 4, scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="text-primary flex-shrink-0"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {favorite.icon}
                  </motion.div>
                  <span className="text-foreground font-medium group-hover/item:text-primary transition-colors">
                    {favorite.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
