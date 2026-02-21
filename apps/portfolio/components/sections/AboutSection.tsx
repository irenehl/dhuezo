'use client'

import { useTranslations } from 'next-intl'
import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { XIcon } from '@/components/icons/XIcon'
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
    <section id="about" className="py-24 bg-card scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <AnimatedSection>
          <div className="mb-12">
            <div className="font-accent text-xl md:text-2xl text-primary mb-2">
              {t('about.subtitle', { default: 'Get to Know Me' })}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              {t('about.title', { default: 'About' })}
            </h2>
          </div>
        </AnimatedSection>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - About Text */}
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
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('about.description3', {
                default: "Beyond code, I've built technical communities and helped women across Central America navigate tech through Academia Colmena. When I'm not at the keyboard, you'll find me exploring new restaurants, staying active, or unwinding with my favorite games."
              })}
            </p>

            {/* Contact CTA */}
            <div className="pt-8">
              <a
                href={`mailto:${t('about.email', { default: 'hello@dhuezo.dev' })}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-base transition-all hover:bg-deep-rose hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
              >
                <Mail className="w-5 h-5" />
                {t('about.cta', { default: "Let's Connect" })}
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href={t('about.social.github', { default: 'https://github.com/irenehl' })}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-border rounded-full hover:bg-pressed-brown hover:text-warm-cream hover:border-pressed-brown transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={t('about.social.linkedin', { default: 'https://linkedin.com/in/danielahuezo' })}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-border rounded-full hover:bg-pressed-brown hover:text-warm-cream hover:border-pressed-brown transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={t('about.social.x', { default: 'https://x.com/irenehl26__' })}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-border rounded-full hover:bg-pressed-brown hover:text-warm-cream hover:border-pressed-brown transition-all"
                aria-label="X"
              >
                <XIcon className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>

          {/* Right Column - Currently Into */}
          <AnimatedSection className="bg-background p-8 rounded-3xl border-2 border-border h-fit" direction="right" delay={0.2}>
            <h3 className="font-display text-2xl text-foreground mb-6">
              {t('about.favorites.title', { default: 'Currently Into' })}
            </h3>
            <div className="space-y-4">
              {favorites.map((favorite, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-2xl transition-all hover:bg-card hover:translate-x-1"
                >
                  <div className="text-primary flex-shrink-0">
                    {favorite.icon}
                  </div>
                  <span className="text-foreground font-medium">
                    {favorite.name}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
