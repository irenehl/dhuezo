'use client'

import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

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
      {/* Background Layers */}
      <div className="fixed inset-0 bg-noise opacity-40 pointer-events-none z-50 mix-blend-overlay" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-100 via-white to-white dark:from-zinc-900 dark:via-black dark:to-black -z-10" />

      <div ref={containerRef} className="max-w-4xl text-center space-y-8 relative z-10">
        {/* Open to Work Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-zinc-300 rounded-full bg-zinc-50/50 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600" />
          </span>
          <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold dark:text-zinc-400">
            {t('hero.openToWork')}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-header text-5xl md:text-8xl lg:text-9xl text-zinc-900 tracking-tighter uppercase leading-[0.9] mix-blend-exclusion dark:text-zinc-100">
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
            className="text-zinc-300 stroke-text dark:text-zinc-800 inline-block"
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
        <p className="max-w-lg mx-auto text-sm md:text-base text-zinc-600 font-light leading-relaxed tracking-wide dark:text-zinc-400">
          {t('hero.description')}
        </p>

        {/* CTAs */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative px-8 py-3 bg-zinc-100 text-black text-xs font-bold uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all duration-300 overflow-hidden dark:bg-zinc-100 dark:text-black dark:hover:bg-rose-600 dark:hover:text-white"
          >
            <span className="relative z-10">{t('hero.cta.viewProjects')}</span>
            <div className="absolute inset-0 bg-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </a>
          <a
            href="#about"
            className="px-8 py-3 border border-zinc-400 text-zinc-700 text-xs font-bold uppercase tracking-widest hover:border-zinc-900 hover:text-zinc-900 transition-colors dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-100 dark:hover:text-white"
          >
            {t('hero.cta.readStory')}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500">
          {t('hero.scroll')}
        </span>
        <ChevronDown className="w-4 h-4 text-zinc-600 dark:text-zinc-500" />
      </div>
    </header>
  )
}
