'use client'

import { useEffect, useState } from 'react'
import { paletteService } from '@/lib/services/palette-service'
import type { ColorPalette } from '@/types/color-palette'
import { PaletteCard } from './PaletteCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Palette } from 'lucide-react'

export function MyPalettes() {
  const [palettes, setPalettes] = useState<ColorPalette[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserPalettes = async () => {
      // Only use anonymous session - Supabase removed
      const sessionId = localStorage.getItem('anonymousSessionId')
      if (sessionId) {
        const data = await paletteService.getAnonymousPalettes(sessionId)
        setPalettes(data)
      }
      setLoading(false)
    }

    fetchUserPalettes()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Mis Paletas
        </CardTitle>
        <CardDescription>
          Paletas que has creado en esta sesión
        </CardDescription>
      </CardHeader>
      <CardContent>
        {palettes.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Aún no has creado ninguna paleta</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {palettes.map((palette, index) => (
              <PaletteCard key={palette.id || index} palette={palette} index={index} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


