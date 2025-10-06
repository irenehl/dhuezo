'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Palette, User, Calendar, Check } from 'lucide-react'
import type { ColorPalette } from '@/types/color-palette'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useTheme } from '@/lib/context/ThemeContext'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { trackPaletteApply } from '@/lib/analytics/clarity'

interface PaletteCardProps {
  palette: ColorPalette
  index: number
}

export function PaletteCard({ palette, index }: PaletteCardProps) {
  const { applyPalette, currentPalette } = useTheme()
  const { toast } = useToast()
  const [isApplied, setIsApplied] = useState(false)

  const handleApply = () => {
    applyPalette(palette)
    
    // Track palette application from dropdown
    trackPaletteApply(palette.id || 'unknown', 'dropdown')
    
    setIsApplied(true)
    toast({ title: '¡Paleta aplicada!', description: `"${palette.prompt}" ahora es tu tema activo` })
    setTimeout(() => setIsApplied(false), 2000)
  }

  const isCurrentPalette = currentPalette?.id === palette.id

  const colors = [
    palette.primary_color,
    palette.secondary_color,
    palette.accent_color,
    palette.background_color,
    palette.text_color,
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} whileHover={{ scale: 1.02 }}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        {/* Color Preview */}
        <div className="h-24 flex">
          {colors.map((color, i) => (
            <div key={i} className="flex-1 transition-all hover:flex-[1.5]" style={{ backgroundColor: color }} />
          ))}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Prompt */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <p className="font-semibold text-lg">&quot;{palette.prompt}&quot;</p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {palette.is_anonymous ? 'Anónimo' : 'Usuario'}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(palette.created_at || '')}
            </div>
          </div>

          {/* Actions */}
          <Button onClick={handleApply} className="w-full" variant={isCurrentPalette ? 'secondary' : 'default'} disabled={isCurrentPalette}>
            {isCurrentPalette ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Paleta Activa
              </>
            ) : isApplied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Aplicada!
              </>
            ) : (
              <>
                <Palette className="mr-2 h-4 w-4" />
                Aplicar Paleta
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}


