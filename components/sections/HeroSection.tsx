'use client'

import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { LocaleToggle } from '@/components/layout/LocaleToggle'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

export function HeroSection() {
  const t = useTranslations()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollProgress = useMotionValue(0)
  
  // Update scroll progress on scroll
  useEffect(() => {
    const updateScrollProgress = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height
      
      // Progress from 0 to 1 as element scrolls from top to out of view
      const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))
      scrollProgress.set(progress)
    }
    
    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [scrollProgress])

  // More dramatic scroll-based transforms
  const headlineY = useTransform(scrollProgress, [0, 1], [0, -150])
  const headlineOpacity = useTransform(scrollProgress, [0, 0.4], [1, 0])
  const headlineScale = useTransform(scrollProgress, [0, 1], [1, 0.85])
  
  const subheadlineX = useTransform(scrollProgress, [0, 1], [0, -200])
  const subheadlineOpacity = useTransform(scrollProgress, [0, 0.4], [1, 0])
  const subheadlineScale = useTransform(scrollProgress, [0, 1], [1, 0.85])

  return (
    <header className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20">
      {/* Navbar integrated into header */}
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-background/80 backdrop-blur-md border-b border-border/50 dark:bg-black/40 dark:border-black/20">
        <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-3">
          <div className="flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>
      {/* Background Layers */}
      <div className="fixed inset-0 bg-noise opacity-20 pointer-events-none z-40 mix-blend-multiply dark:opacity-40 dark:mix-blend-overlay" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-background dark:from-zinc-900 dark:via-black dark:to-black -z-10" />

      <div ref={containerRef} className="max-w-4xl text-center space-y-8 relative z-10">
        {/* Open to Work Badge - now a clickable button to schedule a meeting */}
        <a
          href="https://calendar.app.google/JzJiUGJo3TFqB3pX8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded-full bg-card/50 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:border-accent hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400 dark:hover:border-rose-500 dark:hover:text-rose-400"
          aria-label={t('hero.openToWork')}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600" />
          </span>
          <span>{t('hero.openToWork')}</span>
        </a>

        {/* Main Headline */}
        <h1 className="font-header text-5xl md:text-8xl lg:text-9xl text-foreground tracking-tighter uppercase leading-[0.9] dark:text-zinc-100 dark:mix-blend-exclusion">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              y: headlineY, 
              opacity: headlineOpacity,
              scale: headlineScale,
            }}
            className="inline-block"
          >
            {t('hero.headline')}
          </motion.span>
          <br />
          <motion.span
            className="text-muted-foreground stroke-text dark:text-zinc-800 inline-block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              x: subheadlineX, 
              opacity: subheadlineOpacity,
              scale: subheadlineScale,
            }}
          >
            {t('hero.subheadline')}
          </motion.span>
        </h1>

        {/* Description */}
        <p className="max-w-lg mx-auto text-sm md:text-base text-muted-foreground font-light leading-relaxed tracking-wide dark:text-zinc-400">
          {t('hero.description')}
        </p>

        {/* CTAs */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative px-8 py-3 bg-muted text-foreground text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all duration-300 overflow-hidden dark:bg-zinc-100 dark:text-black dark:hover:bg-rose-600 dark:hover:text-white"
          >
            <span className="relative z-10">{t('hero.cta.viewProjects')}</span>
            <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out dark:bg-rose-600" />
          </a>
          <a
            href="#about"
            className="px-8 py-3 border border-border text-foreground text-xs font-bold uppercase tracking-widest hover:border-foreground hover:text-foreground transition-colors dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-100 dark:hover:text-white"
          >
            {t('hero.cta.readStory')}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500">
          {t('hero.scroll')}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground dark:text-zinc-500" />
      </div>
    </header>
  )
}
