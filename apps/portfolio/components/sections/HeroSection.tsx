'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function HeroSection() {
  const t = useTranslations()

  return (
    <header className="relative min-h-screen flex items-center px-6 lg:px-16 pt-32 pb-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Status Badge */}
            <a
              href="https://calendar.app.google/JzJiUGJo3TFqB3pX8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border-2 border-border rounded-full text-sm font-medium transition-all hover:border-primary cursor-pointer"
              aria-label={t('hero.ambassador')}
            >
              <img
                src="/cursor.svg"
                alt=""
                className="size-7 rounded-full"
              />
              <span>{t('hero.ambassador')}</span>
            </a>

            {/* Main Headline */}
            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero.title')} {' '}
              <span className="font-accent text-6xl md:text-7xl lg:text-8xl text-primary">
                {t('hero.subtitle')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl font-medium text-deep-rose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero.description')}
            </motion.p>

            {/* Description with Easter Eggs */}
            <motion.p
              className="relative text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero.bio.intro')}{' '}
              <span
                tabIndex={0}
                className="relative inline-block group cursor-help border-b border-dotted border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                data-secret={t('hero.bio.shippingTooltip')}
              >
                {t('hero.bio.shipping')}
                <span className="absolute bottom-full left-0 right-0 w-full -translate-y-2 bg-background/95 backdrop-blur-sm text-foreground px-4 py-2.5 rounded-lg text-sm font-body whitespace-normal shadow-lg border-2 border-border z-50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none">
                  {t('hero.bio.shippingTooltip')}
                </span>
              </span>
              {t('hero.bio.andOccasionally')}{' '}
              <span
                tabIndex={0}
                className="relative inline-block group cursor-help border-b border-dotted border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                data-secret={t('hero.bio.debuggingTooltip')}
              >
                {t('hero.bio.debugging')}
                <span className="absolute bottom-full left-0 right-0 w-full -translate-y-2 bg-background/95 backdrop-blur-sm text-foreground px-4 py-2.5 rounded-lg text-sm font-body whitespace-normal shadow-lg border-2 border-border z-50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none">
                  {t('hero.bio.debuggingTooltip')}
                </span>
              </span>
              {t('hero.bio.ending')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-base transition-all hover:bg-deep-rose hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
              >
                {t('hero.cta.viewProjects')}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-foreground border-2 border-border rounded-full font-semibold text-base transition-all hover:bg-card hover:border-secondary hover:-translate-y-0.5"
              >
                {t('hero.cta.contact', { default: "Let's Chat" })}
              </a>
            </motion.div>
          </div>

          {/* Right Column - Visual */}
          <motion.div
            className="relative h-[400px] md:h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main Visual */}
            <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center animate-float">
              {/* Outer soft glow layer */}
              <div className="absolute inset-[-20%] bg-gradient-to-br from-dusty-rose/20 via-gentle-beige/30 to-burlap/40 rounded-full blur-3xl -z-20" />
              
              {/* Inner brighter glow */}
              <div className="absolute inset-[-5%] bg-gradient-to-br from-gentle-beige/40 to-burlap/50 rounded-full blur-2xl -z-10" />
              
              {/* Solid background card with shadow */}
              <div className="absolute inset-0 bg-card dark:bg-card/40 rounded-[2rem] shadow-2xl z-0" />
              
              <img 
                src="/hero-desk.svg" 
                alt="Cozy workspace desk setup with coffee and laptop" 
                className="w-full h-full object-contain relative z-10"
              />
            </div>

          </motion.div>
        </div>
      </div>
    </header>
  )
}
