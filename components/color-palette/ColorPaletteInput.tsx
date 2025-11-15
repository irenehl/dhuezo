'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from '@/lib/context/ThemeContext'
import { useToast } from '@/components/ui/use-toast'
import { Sparkles, Loader2, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import { localPaletteService } from '@/lib/services/local-palette-service'
import { trackPaletteGeneration, trackPaletteReset } from '@/lib/analytics/clarity'

export function ColorPaletteInput() {
  const t = useTranslations()
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiInsights, setAiInsights] = useState<{
    mood: string
    reasoning: string
  } | null>(null)
  const { applyPalette, resetPalette, isCustomTheme } = useTheme()
  const { toast } = useToast()

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) {
      toast({
        title: t('common.error'),
        description: t('colorPalette.promptRequired'),
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    setAiInsights(null)

    try {
      let sessionId = localStorage.getItem('anonymousSessionId')
      if (!sessionId) {
        sessionId = uuidv4()
        localStorage.setItem('anonymousSessionId', sessionId)
      }

      const response = await fetch('/api/color-palette/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim(), anonymousSessionId: sessionId }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to generate palette')

      console.log('Received palette data:', data) // Debug log
      
      // Save to local storage
      localPaletteService.savePaletteToHistory(data.palette)
      
      // Apply palette
      applyPalette(data.palette)
      setAiInsights(data.aiInsights)
      toast({ title: t('colorPalette.paletteGenerated'), description: data.aiInsights.mood })
      
      // Track successful palette generation
      trackPaletteGeneration(prompt, true)
      
      setPrompt('')
      
      // Dispatch event to update carousel
      window.dispatchEvent(new Event('paletteGenerated'))
    } catch (error) {
      console.error('Error generating palette:', error)
      
      // Track failed palette generation
      trackPaletteGeneration(prompt, false)
      
      toast({
        title: t('common.error'),
        description: t('colorPalette.paletteError'),
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    // Track palette reset
    trackPaletteReset()
    
    resetPalette()
    setAiInsights(null)
    toast({ title: t('colorPalette.paletteRestored'), description: t('colorPalette.paletteRestoredDescription') })
  }

  // Listen to prompt example selections
  useEffect(() => {
    const handler = (e: Event) => {
      const example = (e as CustomEvent<string>).detail
      setPrompt(example)
    }
    window.addEventListener('prompt-example' as any, handler)
    return () => window.removeEventListener('prompt-example' as any, handler)
  }, [])

  return (
    <div className="space-y-4">
      <form onSubmit={handleGenerate} className="flex gap-2">
        <Input
          type="text"
          placeholder={t('colorPalette.promptPlaceholder')}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('common.generating')}
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              {t('common.generate')}
            </>
          )}
        </Button>
        {isCustomTheme && (
          <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </form>

      <AnimatePresence>
        {aiInsights && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-muted rounded-lg space-y-2"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-semibold">{aiInsights.mood}</span>
            </div>
            <p className="text-sm text-muted-foreground">{aiInsights.reasoning}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


