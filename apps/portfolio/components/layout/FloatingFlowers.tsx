'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface FlowerToss {
  id: string
  x: number
  y: number
  flowerIndex: number
}

const FLOWERS = ['flower-1', 'flower-2', 'flower-3', 'flower-4'] as const
const AMBIENT_COUNT = 12
const TOSS_COUNT = 5
const TOSS_COOLDOWN = 300 // ms

export function FloatingFlowers() {
  const [tossFlowers, setTossFlowers] = useState<FlowerToss[]>([])
  const [lastTossTime, setLastTossTime] = useState(0)
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

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion) return

      const now = Date.now()
      if (now - lastTossTime < TOSS_COOLDOWN) return

      setLastTossTime(now)

      const newTosses: FlowerToss[] = Array.from({ length: TOSS_COUNT }, (_, i) => ({
        id: `toss-${now}-${i}`,
        x: e.clientX,
        y: e.clientY,
        flowerIndex: Math.floor(Math.random() * FLOWERS.length),
      }))

      setTossFlowers((prev) => [...prev, ...newTosses])

      // Clean up after animation completes
      setTimeout(() => {
        setTossFlowers((prev) => prev.filter((f) => !newTosses.some((t) => t.id === f.id)))
      }, 1200)
    },
    [lastTossTime, prefersReducedMotion]
  )

  useEffect(() => {
    if (prefersReducedMotion) return

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [handleClick, prefersReducedMotion])

  // Generate ambient flower positions
  const ambientFlowers = Array.from({ length: AMBIENT_COUNT }, (_, i) => ({
    id: `ambient-${i}`,
    flowerIndex: i % FLOWERS.length,
    // Position flowers near edges with some randomness
    x: i % 4 < 2 ? (i % 2 === 0 ? '5%' : '95%') : `${15 + (i * 7) % 70}%`,
    y: i % 4 < 2 ? `${10 + (i * 12) % 80}%` : i % 2 === 0 ? '8%' : '92%',
    size: 24 + (i % 3) * 8, // 24, 32, or 40px
    delay: i * 0.3,
    duration: 6 + (i % 3) * 2, // 6, 8, or 10s
    opacity: 0.15 + (i % 3) * 0.1, // 0.15, 0.25, or 0.35
  }))

  if (prefersReducedMotion) {
    return null
  }

  return (
    <>
      {/* Ambient floating flowers */}
      <div
        className="fixed inset-0 pointer-events-none z-0 hidden lg:block"
        aria-hidden="true"
      >
        {ambientFlowers.map((flower) => (
          <motion.div
            key={flower.id}
            className="absolute"
            style={{
              left: flower.x,
              top: flower.y,
              width: flower.size,
              height: flower.size,
              opacity: flower.opacity,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: flower.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: flower.delay,
            }}
          >
            <Image
              src={`/${FLOWERS[flower.flowerIndex]}.svg`}
              alt=""
              width={flower.size}
              height={flower.size}
              className="w-full h-full"
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>

      {/* Click-toss flowers */}
      <AnimatePresence>
        {tossFlowers.map((toss) => {
          const angle = (Math.random() - 0.5) * Math.PI * 1.5 // -135° to +135°
          const distance = 80 + Math.random() * 60 // 80-140px
          const size = 20 + Math.random() * 16 // 20-36px

          return (
            <motion.div
              key={toss.id}
              className="fixed pointer-events-none z-10"
              style={{
                left: toss.x,
                top: toss.y,
                width: size,
                height: size,
              }}
              initial={{
                opacity: 0.8,
                scale: 0.5,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [0.8, 0.6, 0],
                scale: [0.5, 1, 0.8],
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance - 30, // Slight upward bias
                rotate: (Math.random() - 0.5) * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.9 + Math.random() * 0.3,
                ease: 'easeOut',
              }}
            >
              <Image
                src={`/${FLOWERS[toss.flowerIndex]}.svg`}
                alt=""
                width={size}
                height={size}
                className="w-full h-full"
                aria-hidden="true"
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </>
  )
}
