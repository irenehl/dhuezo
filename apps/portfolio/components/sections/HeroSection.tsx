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
              aria-label={t('hero.openToWork')}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-pulse-glow absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600" />
              </span>
              <span>{t('hero.openToWork')}</span>
            </a>

            {/* Main Headline */}
            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Building things that{' '}
              <span className="font-accent text-6xl md:text-7xl lg:text-8xl text-primary">
                just work
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl font-medium text-deep-rose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Description with Easter Eggs */}
            <motion.p
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              I craft resilient systems and delightful interfaces. Currently leading teams at Agora Partnerships,{' '}
              <span
                className="relative group cursor-help border-b border-dotted border-primary"
                data-secret="powered by coffee & late-night coding sessions"
              >
                shipping platforms from scratch
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-accent whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  powered by coffee & late-night coding sessions ☕
                </span>
              </span>
              , and occasionally{' '}
              <span
                className="relative group cursor-help border-b border-dotted border-primary"
                data-secret="my island is called Serenity"
              >
                debugging in my cozy corner
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-accent whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  my island is called Serenity 🏝️
                </span>
              </span>
              .
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

          {/* Right Column - Coffee Mug Visual */}
          <motion.div
            className="relative h-[500px] md:h-[600px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Coffee Mug */}
            <div className="relative w-[280px] h-[320px] bg-gradient-to-br from-gentle-beige to-burlap rounded-b-[100px] border-8 border-pressed-brown shadow-2xl shadow-pressed-brown/20 animate-steam-rise">
              {/* Mug Handle */}
              <div className="absolute -right-[60px] top-1/2 -translate-y-1/2 w-[80px] h-[120px] border-8 border-pressed-brown border-l-0 rounded-r-[60px]" />

              {/* Coffee Surface */}
              <div className="absolute top-[40px] left-2 right-2 h-[60px] rounded-full overflow-hidden bg-gradient-to-br from-pressed-brown to-[#6b5845]">
                {/* Latte Art */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-gentle-beige rounded-full opacity-90"
                  style={{ borderRadius: '50% 50% 50% 0', transform: 'translate(-50%, -50%) rotate(-45deg)' }}
                />
              </div>

              {/* Steam */}
              <div className="absolute bottom-full left-[50%] w-1 h-[60px] bg-gradient-to-t from-warm-cream/60 to-transparent rounded-full animate-steam" />
              <div className="absolute bottom-full left-[40%] w-1 h-[60px] bg-gradient-to-t from-warm-cream/60 to-transparent rounded-full animate-steam [animation-delay:0.5s]" />
              <div className="absolute bottom-full left-[60%] w-1 h-[60px] bg-gradient-to-t from-warm-cream/60 to-transparent rounded-full animate-steam [animation-delay:1s]" />
            </div>

            {/* Floating Leaves */}
            <svg
              className="absolute top-[10%] right-[15%] w-10 h-10 opacity-30 animate-float"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 20 5 Q 10 15, 15 30 Q 18 25, 20 35 Q 22 25, 25 30 Q 30 15, 20 5 Z"
                fill="currentColor"
                className="text-pressed-brown"
              />
            </svg>
            <svg
              className="absolute bottom-[20%] left-[10%] w-9 h-9 opacity-25 animate-float [animation-delay:2s]"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 20 5 Q 10 15, 15 30 Q 18 25, 20 35 Q 22 25, 25 30 Q 30 15, 20 5 Z"
                fill="currentColor"
                className="text-pressed-brown"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
