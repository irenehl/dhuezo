'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface Stat {
  value: number
  label: string
  suffix?: string
}

interface StatsCounterProps {
  stats: Stat[]
  animate?: boolean
  className?: string
}

export function StatsCounter({ stats, animate = true, className = '' }: StatsCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (!isInView || !animate) return

    const duration = 2000 // 2 seconds
    const steps = 60 // 60 steps for smooth animation
    const stepDuration = duration / steps

    const timers = stats.map((stat, index) => {
      const increment = stat.value / steps
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        const newValue = Math.min(Math.floor(increment * currentStep), stat.value)
        
        setCounts(prev => {
          const newCounts = [...prev]
          newCounts[index] = newValue
          return newCounts
        })

        if (currentStep >= steps) {
          clearInterval(timer)
        }
      }, stepDuration)

      return timer
    })

    return () => {
      timers.forEach(timer => clearInterval(timer))
    }
  }, [isInView, animate, stats])

  return (
    <div ref={ref} className={`grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
        >
          <motion.div
            className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))',
            }}
            key={counts[index]} // Re-render when count changes
          >
            {counts[index]}{stat.suffix}
          </motion.div>
          <motion.div
            className="text-xs sm:text-sm text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
          >
            {stat.label}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
