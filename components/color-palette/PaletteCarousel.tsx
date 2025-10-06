'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react'
import type { ColorPalette } from '@/types/color-palette'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/lib/context/ThemeContext'
import { useToast } from '@/components/ui/use-toast'
import { localPaletteService } from '@/lib/services/local-palette-service'
import { paletteService } from '@/lib/services/palette-service'
import { useAuth } from '@/lib/auth/use-auth'
import { trackPaletteApply, trackCarouselNavigation } from '@/lib/analytics/clarity'

export function PaletteCarousel() {
  const [palettes, setPalettes] = useState<ColorPalette[]>([])
  const [totalPalettes, setTotalPalettes] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const { applyPalette, currentPalette } = useTheme()
  const { toast } = useToast()
  const { user } = useAuth()

  const cardsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  }

  // Detect screen size for responsive cards
  const [cardsToShow, setCardsToShow] = useState(cardsPerView.desktop)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(cardsPerView.mobile)
      } else if (window.innerWidth < 1024) {
        setCardsToShow(cardsPerView.tablet)
      } else {
        setCardsToShow(cardsPerView.desktop)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fetch palettes
  useEffect(() => {
    const fetchPalettes = async () => {
      setLoading(true)
      try {
        let serverPalettes: ColorPalette[] = []
        
        if (user) {
          serverPalettes = await paletteService.getUserPalettes(user.id)
        } else {
          const sessionId = localStorage.getItem('anonymousSessionId')
          if (sessionId) {
            serverPalettes = await paletteService.getAnonymousPalettes(sessionId)
          }
        }

        const localPalettes = localPaletteService.getAllLocalPalettes()
        const merged = localPaletteService.mergePalettes(localPalettes, serverPalettes)
        
        // Track total count and show only the first 5 for carousel
        setTotalPalettes(merged.length)
        setPalettes(merged.slice(0, 5))
      } catch (error) {
        console.error('Error fetching palettes:', error)
        // Fallback to local storage only
        const localPalettes = localPaletteService.getRecentPalettes(5)
        setPalettes(localPalettes)
      } finally {
        setLoading(false)
      }
    }

    fetchPalettes()

    // Listen for new palette events
    const handlePaletteGenerated = () => {
      console.log('Palette generated event received, refreshing carousel...')
      fetchPalettes()
    }

    window.addEventListener('paletteGenerated', handlePaletteGenerated)
    return () => window.removeEventListener('paletteGenerated', handlePaletteGenerated)
  }, [user])

  const handleApply = (palette: ColorPalette) => {
    applyPalette(palette)
    
    // Track palette application from carousel
    trackPaletteApply(palette.id || 'unknown', 'carousel')
    
    toast({
      title: '¡Paleta aplicada!',
      description: `"${palette.prompt}" ahora es tu tema activo`,
    })
  }

  const handlePrev = () => {
    // Track carousel navigation
    trackCarouselNavigation('prev')
    
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    // Track carousel navigation
    trackCarouselNavigation('next')
    
    setCurrentIndex((prev) => Math.min(palettes.length - cardsToShow, prev + 1))
  }

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < palettes.length - cardsToShow

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <Sparkles className="h-8 w-8 animate-pulse text-primary" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (palettes.length === 0) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-2">
            <Sparkles className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">
              Aún no has generado ninguna paleta. ¡Crea tu primera paleta arriba!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="hidden md:flex shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Carousel Container */}
        <div className="flex-1 overflow-hidden">
          <div className="relative">
            <motion.div
              className="flex gap-4"
              animate={{
                x: `-${currentIndex * (100 / cardsToShow)}%`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {palettes.map((palette, index) => {
                const isActive = currentPalette?.id === palette.id
                const colors = [
                  palette.primary_color,
                  palette.secondary_color,
                  palette.accent_color,
                  palette.background_color,
                  palette.text_color,
                ]

                return (
                  <motion.div
                    key={palette.id || `palette-${index}`}
                    className="shrink-0"
                    style={{ width: `calc(${100 / cardsToShow}% - ${(cardsToShow - 1) * 16 / cardsToShow}px)` }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden cursor-pointer h-full" onClick={() => handleApply(palette)}>
                      {/* Color Preview Strip */}
                      <div className="h-16 flex">
                        {colors.map((color, i) => (
                          <div
                            key={i}
                            className="flex-1 transition-all hover:flex-[1.2]"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <CardContent className="p-3 space-y-2">
                        <p className="text-sm font-medium line-clamp-2" title={palette.prompt}>
                          &quot;{palette.prompt}&quot;
                        </p>
                        
                        <Button
                          size="sm"
                          variant={isActive ? 'secondary' : 'default'}
                          className="w-full"
                          disabled={isActive}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleApply(palette)
                          }}
                        >
                          {isActive ? (
                            <>
                              <Check className="mr-1 h-3 w-3" />
                              Activa
                            </>
                          ) : (
                            'Aplicar'
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={!canGoNext}
          className="hidden md:flex shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center gap-2 mt-4">
        <Button variant="outline" size="sm" onClick={handlePrev} disabled={!canGoPrev}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>
        <Button variant="outline" size="sm" onClick={handleNext} disabled={!canGoNext}>
          Siguiente
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

