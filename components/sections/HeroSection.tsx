'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Calendar } from 'lucide-react'
import { StatsCounter } from './StatsCounter'
import { AnimatedGradientBackground } from '@/components/ui/AnimatedGradientBackground'
import { getHeroConfig } from '@/lib/config'

export function HeroSection() {
  const t = useTranslations()
  const heroConfig = getHeroConfig(t)
  const heroRef = useRef<HTMLElement>(null)
  const handleChatClick = () => {
    window.open(heroConfig.cta.primary.action, '_blank')
  }

  const handleMeetingClick = () => {
    if (heroConfig.cta.secondary.link) {
      window.open(heroConfig.cta.secondary.link, '_blank')
    }
  }

  return (
    <>
      <section 
        ref={heroRef}
        className="flex-grow w-full flex items-center relative overflow-hidden"
        style={{
          background: 'hsl(var(--background))',
        }}
      >
        {/* Full Screen Animated Gradient Background */}
        <AnimatedGradientBackground 
          className="absolute inset-0 w-full h-full z-99"
          position="full"
          intensity="medium"
          speed="normal"
          complexity="medium"
          blur={60}
        />
        
        <div className="container mx-auto px-6 md:px-8 lg:px-16 xl:px-24 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column: Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium"
                style={{
                  backgroundColor: 'hsl(var(--primary) / 0.2)',
                  color: 'hsl(var(--primary))',
                  borderColor: 'hsl(var(--primary) / 0.3)',
                }}
              >
                {heroConfig.greeting}
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl lg:text-6xl font-bold leading-tight"
                style={{ color: 'hsl(var(--foreground))' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {t('hero.headline')}
              </motion.h1>

              {/* <motion.div
                className="flex flex-col sm:flex-row sm:items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h2 
                  className="text-3xl lg:text-3xl font-bold"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  {heroConfig.name}
                </h2>
                <Badge 
                  variant="outline" 
                  className="px-3 py-1 text-sm"
                  style={{
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    color: 'hsl(var(--primary))',
                    borderColor: 'hsl(var(--primary) / 0.3)',
                  }}
                >
                  {heroConfig.role}
                </Badge>
              </motion.div> */}

              {/* <motion.p
                className="text-lg lg:text-xl leading-relaxed max-w-2xl"
                style={{ color: 'hsl(var(--muted-foreground))' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {heroConfig.tagline}
              </motion.p> */}

              <motion.p
                className="text-base leading-relaxed max-w-xl"
                style={{ color: 'hsl(var(--muted-foreground) / 0.8)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                {heroConfig.description}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Button
                onClick={handleChatClick}
                size="lg"
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))',
                  color: 'hsl(var(--primary-foreground))',
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {heroConfig.cta.primary.text}
              </Button>
              
              <Button
                onClick={handleMeetingClick}
                variant="outline"
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: 'hsl(var(--background) / 0.1)',
                  color: 'hsl(var(--foreground))',
                  borderColor: 'hsl(var(--border))',
                }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                {heroConfig.cta.secondary.text}
              </Button>
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span 
                  className="text-sm"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  {t('hero.workedWith')}
                </span>
                <motion.div
                  className="w-8 h-px"
                  style={{
                    background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                />
              </div>
              <StatsCounter stats={heroConfig.stats} />
            </motion.div>
          </motion.div>

          {/* Right Column: Empty space for content balance */}
          <div className="hidden lg:block">
            {/* This space is now filled by the full-screen gradient background */}
          </div>
        </div>
      </div>

    </section>
    </>
  )
}
