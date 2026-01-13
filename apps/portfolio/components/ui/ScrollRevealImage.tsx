'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface ScrollRevealImageProps extends Omit<ImageProps, 'className'> {
  className?: string
  alt: string
}

export function ScrollRevealImage({ className, alt, ...props }: ScrollRevealImageProps) {
  const [revealProgress, setRevealProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Image position relative to viewport
      const imageTop = rect.top
      const imageHeight = rect.height
      const imageCenter = imageTop + imageHeight / 2
      const windowCenter = windowHeight / 2
      
      // Start revealing when image center enters the bottom 20% of viewport
      // This means when imageCenter reaches windowHeight * 0.8
      const revealStart = windowHeight * 0.8
      // Complete reveal when image center reaches viewport center
      const revealEnd = windowCenter
      
      // Calculate progress based on image center position
      if (imageCenter >= revealStart) {
        // Image center hasn't reached reveal start - fully grayscale
        setRevealProgress(0)
      } else if (imageCenter <= revealEnd) {
        // Image center has passed reveal end - fully colored
        setRevealProgress(1)
      } else {
        // Image center is between revealStart and revealEnd - calculate progress
        const totalRange = revealStart - revealEnd
        const distanceFromStart = revealStart - imageCenter
        const progress = Math.max(0, Math.min(1, distanceFromStart / totalRange))
        setRevealProgress(progress)
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Extract className from props if it exists
  const { className: imageClassName, ...imageProps } = props as ImageProps & { className?: string }

  const grayscaleValue = 100 - revealProgress * 100

  return (
    <div ref={containerRef} className={cn('relative w-full h-full overflow-hidden', className)}>
      <Image
        {...imageProps}
        alt={alt}
        className={cn(
          'transition-[filter] duration-700 ease-out',
          imageClassName
        )}
        style={{
          filter: `grayscale(${grayscaleValue}%)`,
          transition: 'filter 700ms ease-out',
          ...imageProps.style,
        }}
      />
    </div>
  )
}
