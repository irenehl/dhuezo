'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HeroSection() {
  const t = useTranslations()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <header ref={ref} className="relative min-h-screen flex items-center px-6 lg:px-16 pt-32 pb-16 overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-6">
            <motion.a
              href="https://calendar.app.google/Q65Hgz9cCqa2m1Ei9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border-2 border-border rounded-full text-sm font-medium transition-all hover:border-primary cursor-pointer group"
              aria-label={t('hero.ambassador')}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <motion.img
                src="/cursor.svg"
                alt=""
                className="size-7 rounded-full"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              />
              <span className="group-hover:text-primary transition-colors">{t('hero.ambassador')}</span>
            </motion.a>

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

            <motion.p
              className="text-xl md:text-2xl font-medium text-deep-rose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero.description')}
            </motion.p>

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
                <span className="absolute bottom-full left-0 w-[32rem] max-w-[calc(100vw-3rem)] -translate-y-2 bg-background/95 backdrop-blur-sm text-foreground px-4 py-2.5 rounded-lg text-sm font-body whitespace-normal shadow-lg border-2 border-border z-50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none">
                  {t('hero.bio.debuggingTooltip')}
                </span>
              </span>
              {t('hero.bio.ending')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-base overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">{t('hero.cta.viewProjects')}</span>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ boxShadow: '0 0 0 0 rgba(var(--primary-rgb), 0)' }}
                  whileHover={{ boxShadow: '0 8px 24px -4px rgba(var(--primary-rgb), 0.4)' }}
                  style={{ '--primary-rgb': '212, 165, 196' } as React.CSSProperties}
                />
              </motion.a>
              <motion.a
                href="https://calendar.app.google/Q65Hgz9cCqa2m1Ei9"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent text-foreground border-2 border-border rounded-full font-semibold text-base overflow-hidden"
                whileHover={{ scale: 1.05, y: -2, borderColor: 'hsl(var(--secondary))' }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-card rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{t('hero.cta.contact', { default: "Let's Chat" })}</span>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="relative h-[400px] md:h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ y, opacity }}
          >
            <div className="relative w-full min-w-[700px] aspect-square flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: 'radial-gradient(circle, hsl(var(--dusty-rose)) 0%, transparent 70%)',
                }}
              />
              
              <motion.img 
                src="/hero-desk.svg" 
                alt="Cozy workspace desk setup with coffee and laptop" 
                className="w-full h-full object-contain relative z-10"
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none z-20" />
            </div>

          </motion.div>
        </div>
      </div>
    </header>
  )
}
