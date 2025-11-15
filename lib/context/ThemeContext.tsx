'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { ColorPalette } from '@/types/color-palette'
import { getContrastColor, calculateContrastRatio, adjustTextColorForContrast } from '@/lib/utils/contrast'

interface ThemeContextType {
  currentPalette: ColorPalette | null
  applyPalette: (palette: ColorPalette) => void
  resetPalette: () => void
  isCustomTheme: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const defaultPalette: ColorPalette = {
  prompt: 'default',
  colors: {
    primary: '#9333EA',
    secondary: '#DC2626',
    accent: '#EC4899',
    background: '#0B1220',
    text: '#E5E7EB',
    muted: '#1f2937',
    border: '#334155',
  },
  primary_color: '#9333EA',
  secondary_color: '#DC2626',
  accent_color: '#EC4899',
  background_color: '#0B1220',
  text_color: '#E5E7EB',
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(null)
  const [isCustomTheme, setIsCustomTheme] = useState(false)

  // Helper function to convert hex to HSL
  const hexToHsl = (hex: string): string => {
    // Remove # if present
    hex = hex.replace('#', '')
    
    // Parse hex
    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2
    
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  }

  const applyPalette = (palette: ColorPalette) => {
    console.log('Applying palette:', palette) // Debug log
    
    if (!palette) {
      console.error('No palette provided')
      return
    }

    // Handle both palette.colors and individual color properties
    let colors
    if (palette.colors) {
      colors = palette.colors
    } else if (palette.primary_color) {
      // Fallback to individual color properties
      colors = {
        primary: palette.primary_color,
        secondary: palette.secondary_color,
        accent: palette.accent_color,
        background: palette.background_color,
        text: palette.text_color,
        muted: '#1f2937', // Default muted color
        border: '#334155', // Default border color
      }
    } else {
      console.error('Invalid palette structure:', palette)
      return
    }

    console.log('Applying colors:', colors) // Debug log
    
    // Apply client-side contrast adjustments for additional safety
    const adjustedText = adjustTextColorForContrast(colors.background, colors.text, 4.5)
    const primaryForeground = getContrastColor(colors.primary)
    const secondaryForeground = getContrastColor(colors.secondary)
    const accentForeground = getContrastColor(colors.accent)
    
    // Check and log contrast ratios for debugging
    const bgTextContrast = calculateContrastRatio(colors.background, adjustedText)
    console.log('Background-Text contrast ratio:', bgTextContrast.toFixed(2))
    
    setCurrentPalette(palette)
    setIsCustomTheme(true)

    const root = document.documentElement
    
    // Apply CSS custom properties in HSL format with adjusted foreground colors
    root.style.setProperty('--primary', hexToHsl(colors.primary))
    root.style.setProperty('--primary-foreground', hexToHsl(primaryForeground))
    root.style.setProperty('--secondary', hexToHsl(colors.secondary))
    root.style.setProperty('--secondary-foreground', hexToHsl(secondaryForeground))
    root.style.setProperty('--accent', hexToHsl(colors.accent))
    root.style.setProperty('--accent-foreground', hexToHsl(accentForeground))
    root.style.setProperty('--background', hexToHsl(colors.background))
    root.style.setProperty('--foreground', hexToHsl(adjustedText))
    root.style.setProperty('--muted', hexToHsl(colors.muted))
    root.style.setProperty('--muted-foreground', hexToHsl(getContrastColor(colors.muted)))
    root.style.setProperty('--border', hexToHsl(colors.border))

    // Also set card and popover colors to match background
    root.style.setProperty('--card', hexToHsl(colors.background))
    root.style.setProperty('--card-foreground', hexToHsl(adjustedText))
    root.style.setProperty('--popover', hexToHsl(colors.background))
    root.style.setProperty('--popover-foreground', hexToHsl(adjustedText))

    localStorage.setItem('customPalette', JSON.stringify(palette))
    
    console.log('Palette applied successfully with contrast adjustments') // Debug log
  }

  const resetPalette = () => {
    setCurrentPalette(null)
    setIsCustomTheme(false)

    const root = document.documentElement
    root.style.removeProperty('--primary')
    root.style.removeProperty('--primary-foreground')
    root.style.removeProperty('--secondary')
    root.style.removeProperty('--secondary-foreground')
    root.style.removeProperty('--accent')
    root.style.removeProperty('--accent-foreground')
    root.style.removeProperty('--background')
    root.style.removeProperty('--foreground')
    root.style.removeProperty('--muted')
    root.style.removeProperty('--muted-foreground')
    root.style.removeProperty('--border')
    root.style.removeProperty('--card')
    root.style.removeProperty('--card-foreground')
    root.style.removeProperty('--popover')
    root.style.removeProperty('--popover-foreground')

    localStorage.removeItem('customPalette')
    console.log('Palette reset successfully') // Debug log
  }

  useEffect(() => {
    const savedPalette = localStorage.getItem('customPalette')
    if (savedPalette) {
      try {
        const palette = JSON.parse(savedPalette)
        console.log('Loading saved palette:', palette) // Debug log
        applyPalette(palette)
      } catch (error) {
        console.error('Error loading saved palette:', error)
        localStorage.removeItem('customPalette')
      }
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        currentPalette,
        applyPalette,
        resetPalette,
        isCustomTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}


