'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CarouselLayout = 'page' | 'strip'

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  /** When true, autoplay pauses while the pointer is over the carousel. Disable for full-bleed strips where the cursor is usually inside the viewport. @default true */
  pauseOnHover?: boolean
  showArrows?: boolean
  showDots?: boolean
  slidesToShow?: number
  layout?: CarouselLayout
  stripSlideClassName?: string
  stripGapClassName?: string
}

export function Carousel({
  children,
  className,
  autoPlay = true,
  autoPlayInterval = 5000,
  pauseOnHover = true,
  showArrows = true,
  showDots = true,
  slidesToShow = 3,
  layout = 'page',
  stripSlideClassName = 'w-[min(420px,85vw)] md:w-[min(400px,40vw)] lg:w-[min(420px,32vw)]',
  stripGapClassName = 'gap-4 md:gap-6',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [responsiveSlidesToShow, setResponsiveSlidesToShow] = React.useState(slidesToShow)
  const [stripMetrics, setStripMetrics] = React.useState({ step: 0, maxIndex: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  const viewportRef = React.useRef<HTMLDivElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const slideRefs = React.useRef<(HTMLDivElement | null)[]>([])

  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const totalSlides = children.length

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = (): void => {
      setPrefersReducedMotion(mq.matches)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  React.useEffect(() => {
    const updateSlides = (): void => {
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

    if (layout === 'page') {
      updateSlides()
      window.addEventListener('resize', updateSlides)
      return () => window.removeEventListener('resize', updateSlides)
    }
    return undefined
  }, [slidesToShow, layout])

  const measureStrip = React.useCallback((): void => {
    if (layout !== 'strip') return
    const vp = viewportRef.current
    const tr = trackRef.current
    if (!vp || !tr || totalSlides === 0) {
      setStripMetrics({ step: 0, maxIndex: 0 })
      return
    }
    const slides = slideRefs.current.filter((n): n is HTMLDivElement => Boolean(n))
    if (slides.length === 0) {
      setStripMetrics({ step: 0, maxIndex: 0 })
      return
    }
    const slideW = slides[0].offsetWidth
    let gap = 0
    if (slides.length > 1) {
      gap = slides[1].offsetLeft - slides[0].offsetLeft - slideW
    } else {
      const g = getComputedStyle(tr).columnGap || getComputedStyle(tr).gap
      const parsed = parseFloat(g)
      gap = Number.isFinite(parsed) ? parsed : 0
    }
    const step = slideW + gap
    const trackW = tr.scrollWidth
    const maxOff = Math.max(0, trackW - vp.clientWidth)
    const maxIdx = step > 0 ? Math.floor(maxOff / step + 1e-6) : 0
    setStripMetrics({ step, maxIndex: maxIdx })
  }, [layout, totalSlides])

  React.useLayoutEffect(() => {
    if (layout !== 'strip') return
    slideRefs.current.length = totalSlides
    measureStrip()
  }, [layout, measureStrip, totalSlides])

  React.useEffect(() => {
    if (layout !== 'strip') return
    const id = window.setTimeout(() => {
      measureStrip()
    }, 150)
    return () => window.clearTimeout(id)
  }, [layout, measureStrip, totalSlides])

  React.useLayoutEffect(() => {
    if (layout !== 'strip') return
    const vp = viewportRef.current
    const tr = trackRef.current
    if (!vp) return
    const ro = new ResizeObserver(() => {
      measureStrip()
    })
    ro.observe(vp)
    if (tr) {
      ro.observe(tr)
    }
    return () => {
      ro.disconnect()
    }
  }, [layout, measureStrip, totalSlides])

  React.useEffect(() => {
    if (layout !== 'strip') return
    setCurrentIndex((i) => Math.min(i, stripMetrics.maxIndex))
  }, [layout, stripMetrics.maxIndex])

  const maxIndex =
    layout === 'strip'
      ? stripMetrics.maxIndex
      : Math.max(0, totalSlides - responsiveSlidesToShow)

  const goToSlide = React.useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
    },
    [maxIndex],
  )

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  const effectiveAutoPlay = autoPlay && !prefersReducedMotion

  React.useEffect(() => {
    if (!effectiveAutoPlay || isPaused || maxIndex <= 0) {
      return undefined
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, autoPlayInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [effectiveAutoPlay, autoPlayInterval, isPaused, maxIndex])

  const handleMouseEnter = (): void => {
    if (pauseOnHover) setIsPaused(true)
  }
  const handleMouseLeave = (): void => {
    if (pauseOnHover) setIsPaused(false)
  }

  const showNav = maxIndex > 0

  return (
    <div
      className={cn('relative w-full', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        overflow: 'visible',
        paddingTop: '12px',
        paddingBottom: '12px',
        marginTop: '-12px',
        marginBottom: '-12px',
      }}
    >
      <div ref={viewportRef} className="relative overflow-hidden">
        {layout === 'strip' ? (
          <motion.div
            ref={trackRef}
            className={cn('flex flex-nowrap will-change-transform', stripGapClassName)}
            animate={{
              x: stripMetrics.step > 0 ? -currentIndex * stripMetrics.step : 0,
            }}
            transition={{
              type: 'tween',
              ease: [0.4, 0, 0.2, 1],
              duration: 0.7,
            }}
            style={{ willChange: 'transform' }}
          >
            {children.map((child, index) => (
              <div
                key={`carousel-item-${index}`}
                ref={(el) => {
                  slideRefs.current[index] = el
                }}
                className={cn('shrink-0 overflow-visible', stripSlideClassName)}
              >
                {child}
              </div>
            ))}
          </motion.div>
        ) : (
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
        )}
      </div>

      {showArrows && showNav && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 border-border bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 border-border bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:border-primary hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        </>
      )}

      {showDots && showNav && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                currentIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-border hover:bg-primary/50',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
