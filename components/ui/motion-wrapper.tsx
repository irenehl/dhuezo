'use client'

import { motion, MotionProps } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  respectReducedMotion?: boolean
  className?: string
  onClick?: () => void
}

export function MotionWrapper({ 
  children, 
  fallback = null, 
  respectReducedMotion = true,
  className,
  onClick,
  ...motionProps 
}: MotionWrapperProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // If user prefers reduced motion, render children without motion
  if (respectReducedMotion && prefersReducedMotion) {
    return fallback || <div className={className} onClick={onClick}>{children}</div>
  }

  return (
    <motion.div {...motionProps} className={className} onClick={onClick}>
      {children}
    </motion.div>
  )
}

// Optimized motion variants for common animations
export const optimizedVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
}
