'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronUp, Search, Loader2, History, Trash2 } from 'lucide-react'
import type { ColorPalette } from '@/types/color-palette'
import { motion, AnimatePresence } from 'framer-motion'
import { PaletteCard } from '@/components/color-history/PaletteCard'
import { localPaletteService } from '@/lib/services/local-palette-service'
import { paletteService } from '@/lib/services/palette-service'
import { useAuth } from '@/lib/auth/use-auth'
import { useToast } from '@/components/ui/use-toast'
import { trackHistoryDropdownToggle, trackPaletteApply } from '@/lib/analytics/clarity'

interface PaletteHistoryDropdownProps {
  showOnlyWhenMoreThan?: number
}

export function PaletteHistoryDropdown({ showOnlyWhenMoreThan = 8 }: PaletteHistoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [palettes, setPalettes] = useState<ColorPalette[]>([])
  const [filteredPalettes, setFilteredPalettes] = useState<ColorPalette[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchAllPalettes = async () => {
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

      setPalettes(merged)
      setFilteredPalettes(merged)
    } catch (error) {
      console.error('Error fetching all palettes:', error)
      const localPalettes = localPaletteService.getAllLocalPalettes()
      setPalettes(localPalettes)
      setFilteredPalettes(localPalettes)
    } finally {
      setLoading(false)
    }
  }

  // Fetch all palettes on mount to check if we should show the dropdown
  useEffect(() => {
    fetchAllPalettes()
  }, [])

  // Filter palettes based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = palettes.filter((p) =>
        p.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredPalettes(filtered)
    } else {
      setFilteredPalettes(palettes)
    }
  }, [searchQuery, palettes])

  // Listen for new palette events
  useEffect(() => {
    const handlePaletteGenerated = () => {
      if (isOpen) {
        fetchAllPalettes()
      }
    }

    window.addEventListener('paletteGenerated', handlePaletteGenerated)
    return () => window.removeEventListener('paletteGenerated', handlePaletteGenerated)
  }, [isOpen])

  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    
    // Track dropdown toggle
    trackHistoryDropdownToggle(newState)
    
    if (newState && palettes.length === 0) {
      fetchAllPalettes()
    }
  }

  const handleClearHistory = () => {
    if (confirm('¿Estás seguro de que quieres limpiar todo el historial local?')) {
      localPaletteService.clearLocalHistory()
      setPalettes([])
      setFilteredPalettes([])
      toast({
        title: 'Historial limpiado',
        description: 'Se ha eliminado el historial local de paletas',
      })
    }
  }

  // Don't render if we don't have enough palettes
  if (palettes.length <= showOnlyWhenMoreThan) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Tu Historial Completo
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleToggle}>
            {isOpen ? (
              <>
                Ocultar
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Ver Todo
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por prompt..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {!user && (
                  <Button variant="outline" size="icon" onClick={handleClearHistory} title="Limpiar historial local">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {/* Palettes Grid */}
              {!loading && filteredPalettes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
                  {filteredPalettes.map((palette, index) => (
                    <PaletteCard key={palette.id || `palette-${index}`} palette={palette} index={index} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredPalettes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? 'No se encontraron paletas con ese criterio'
                      : user
                      ? 'Aún no has creado ninguna paleta'
                      : 'No hay paletas en tu historial local'}
                  </p>
                </div>
              )}

              {/* Info Text */}
              {!user && palettes.length > 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  💡 Inicia sesión para guardar tu historial de forma permanente
                </p>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

