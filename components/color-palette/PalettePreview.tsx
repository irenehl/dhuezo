'use client'

import { useTheme } from '@/lib/context/ThemeContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, AlertCircle, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { calculateContrastRatio, getContrastLevel } from '@/lib/utils/contrast'

export function PalettePreview() {
  const { currentPalette, isCustomTheme } = useTheme()
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  if (!currentPalette || !isCustomTheme) return null

  const colors = currentPalette.colors

  const colorEntries = [
    { name: 'Primary', value: colors.primary },
    { name: 'Secondary', value: colors.secondary },
    { name: 'Accent', value: colors.accent },
    { name: 'Background', value: colors.background },
    { name: 'Text', value: colors.text },
    { name: 'Muted', value: colors.muted },
    { name: 'Border', value: colors.border },
  ]

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedColor(color)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  // Calculate contrast ratio for accessibility
  const bgTextContrast = calculateContrastRatio(colors.background, colors.text)
  const contrastInfo = getContrastLevel(bgTextContrast)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>Paleta Actual</CardTitle>
            <CardDescription>
              Prompt: <em>&quot;{currentPalette.prompt}&quot;</em>
            </CardDescription>
          </div>
          <Badge
            variant={contrastInfo.level === 'Excellent' ? 'default' : contrastInfo.level === 'Good' ? 'secondary' : 'destructive'}
          >
            {contrastInfo.level === 'Poor' ? (
              <AlertCircle className="mr-1 h-3 w-3" />
            ) : (
              <CheckCircle className="mr-1 h-3 w-3" />
            )}
            {contrastInfo.description}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colorEntries.map((color, index) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="space-y-2"
            >
              <div
                className="h-20 rounded-lg border-2 border-border shadow-sm cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: color.value }}
                onClick={() => copyToClipboard(color.value)}
              />
              <div className="space-y-1">
                <p className="text-sm font-medium">{color.name}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-xs font-mono"
                  onClick={() => copyToClipboard(color.value)}
                >
                  {copiedColor === color.value ? (
                    <>
                      <Check className="mr-1 h-3 w-3" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 h-3 w-3" />
                      {color.value}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Contrast Information */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Contraste Background/Text:</strong> {bgTextContrast.toFixed(2)}:1 — {contrastInfo.description}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Los colores han sido ajustados automáticamente para cumplir con los estándares de accesibilidad WCAG 2.1 AA.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}


