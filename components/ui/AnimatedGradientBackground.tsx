'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/lib/context/ThemeContext'

interface AnimatedGradientBackgroundProps {
  className?: string
  position?: 'bottom-right' | 'center' | 'full'
  intensity?: 'subtle' | 'medium' | 'vibrant'
  speed?: 'slow' | 'normal' | 'fast'
  complexity?: 'simple' | 'medium' | 'complex'
  blur?: number
}

export function AnimatedGradientBackground({
  className = '',
  position = 'bottom-right',
  intensity = 'medium',
  speed = 'normal',
  complexity = 'medium',
  blur = 60
}: AnimatedGradientBackgroundProps) {
  const { currentPalette, isCustomTheme } = useTheme()
  
  // Get colors from current palette or use defaults
  const getColors = () => {
    if (currentPalette && isCustomTheme) {
      return {
        primary: currentPalette.colors?.primary || currentPalette.primary_color || '#3b82f6',
        secondary: currentPalette.colors?.secondary || currentPalette.secondary_color || '#8b5cf6',
        accent: currentPalette.colors?.accent || currentPalette.accent_color || '#ec4899',
        background: currentPalette.colors?.background || currentPalette.background_color || '#0b1220',
      }
    }
    
    // Default colors
    return {
      primary: '#3b82f6',
      secondary: '#8b5cf6', 
      accent: '#ec4899',
      background: '#0b1220',
    }
  }
  
  const colors = getColors()
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Simple animated gradient blob */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 80% 70%, ${colors.secondary}60 0%, ${colors.primary}40 30%, transparent 60%)`,
          filter: 'blur(40px)',
          zIndex: 1,
        }}
        animate={{
          x: ['0%', '10%', '-5%', '0%'],
          y: ['0%', '-8%', '5%', '0%'],
          scale: [1, 1.2, 0.9, 1],
          rotate: [0, 30, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Second animated blob */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, ${colors.primary}50 0%, ${colors.secondary}30 35%, transparent 70%)`,
          filter: 'blur(30px)',
          zIndex: 2,
        }}
        animate={{
          x: ['-5%', '8%', '0%', '-5%'],
          y: ['5%', '0%', '-5%', '5%'],
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 45, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      
      {/* Third animated blob */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 60% 80%, ${colors.accent}40 0%, ${colors.secondary}20 40%, transparent 65%)`,
          filter: 'blur(50px)',
          zIndex: 3,
        }}
        animate={{
          x: ['0%', '-10%', '8%', '0%'],
          y: ['-3%', '8%', '2%', '-3%'],
          scale: [1, 0.8, 1.1, 1],
          rotate: [0, 60, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Fourth animated blob */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 40% 60%, ${colors.secondary}30 0%, ${colors.primary}20 45%, transparent 75%)`,
          filter: 'blur(40px)',
          zIndex: 4,
        }}
        animate={{
          x: ['0%', '-10%', '8%', '0%'],
          y: ['-3%', '8%', '2%', '-3%'],
          scale: [1, 0.8, 1.1, 1],
          rotate: [0, 60, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  )
}