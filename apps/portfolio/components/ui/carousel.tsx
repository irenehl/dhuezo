'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  showDots?: boolean
  slidesToShow?: number
}

export function Carousel({
  children,
  className,
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  slidesToShow = 3,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [responsiveSlidesToShow, setResponsiveSlidesToShow] = React.useState(slidesToShow)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  // Handle responsive slides
  React.useEffect(() => {
    const updateSlides = () => {
      if (typeof window === 'undefined') return
      const width = window.innerWidth
      if (width < 768) {
        setResponsiveSlidesToShow(1)
      } else if (width < 1024) {
        setResponsiveSlidesToShow(2)
      } else {
        setResponsiveSlidesToShow(slidesToShow)
      }
    }

    updateSlides()
    window.addEventListener('resize', updateSlides)
    return () => window.removeEventListener('resize', updateSlides)
  }, [slidesToShow])

  const totalSlides = children.length
  const maxIndex = Math.max(0, totalSlides - responsiveSlidesToShow)

  const goToSlide = React.useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }, [maxIndex])

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  React.useEffect(() => {
    if (autoPlay && !isPaused && totalSlides > responsiveSlidesToShow) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
      }, autoPlayInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoPlay, autoPlayInterval, isPaused, maxIndex, responsiveSlidesToShow, totalSlides])

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div
      className={cn('relative w-full', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: 'visible', paddingTop: '12px', paddingBottom: '12px', marginTop: '-12px', marginBottom: '-12px' }}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex will-change-transform"
          animate={{
            x: `-${currentIndex * (100 / responsiveSlidesToShow)}%`,
          }}
          transition={{
            type: 'tween',
            ease: [0.4, 0, 0.2, 1],
            duration: 0.7,
          }}
          style={{
            width: `${(totalSlides / responsiveSlidesToShow) * 100}%`,
            willChange: 'transform',
          }}
        >
          {children.map((child, index) => (
            <div
              key={`carousel-item-${index}`}
              className="flex-shrink-0"
              style={{
                width: `${100 / totalSlides}%`,
                overflow: 'visible',
              }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > responsiveSlidesToShow && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm border-2 border-border p-2 hover:bg-background hover:border-primary transition-all shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm border-2 border-border p-2 hover:bg-background hover:border-primary transition-all shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && totalSlides > responsiveSlidesToShow && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                currentIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-border hover:bg-primary/50'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
