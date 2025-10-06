import type { ColorPalette } from '@/types/color-palette'

const STORAGE_KEY = 'palette_history'
const MAX_PALETTES = 50

/**
 * Local Palette Storage Service
 * Manages color palette history in localStorage
 */
export const localPaletteService = {
  /**
   * Save a palette to local history
   */
  savePaletteToHistory(palette: ColorPalette): void {
    if (typeof window === 'undefined') return

    try {
      const history = this.getAllLocalPalettes()
      
      // Check if palette already exists (by id only, not by colors)
      const exists = history.some(
        (p) => p.id === palette.id
      )

      if (!exists) {
        // Add to beginning of array
        history.unshift(palette)
        
        // Keep only last MAX_PALETTES
        const trimmed = history.slice(0, MAX_PALETTES)
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
        console.log('Palette saved to local storage:', palette.prompt, 'Total palettes:', trimmed.length)
      } else {
        console.log('Palette already exists, skipping save:', palette.prompt)
      }
    } catch (error) {
      console.error('Error saving palette to local storage:', error)
    }
  },

  /**
   * Get recent palettes (limited)
   */
  getRecentPalettes(limit: number = 8): ColorPalette[] {
    if (typeof window === 'undefined') return []

    try {
      const history = this.getAllLocalPalettes()
      return history.slice(0, limit)
    } catch (error) {
      console.error('Error getting recent palettes:', error)
      return []
    }
  },

  /**
   * Get all local palettes
   */
  getAllLocalPalettes(): ColorPalette[] {
    if (typeof window === 'undefined') return []

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return []
      
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      console.error('Error getting all local palettes:', error)
      return []
    }
  },

  /**
   * Clear local history
   */
  clearLocalHistory(): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing local history:', error)
    }
  },

  /**
   * Get palettes by anonymous session ID
   */
  getPalettesBySessionId(sessionId: string): ColorPalette[] {
    if (typeof window === 'undefined') return []

    try {
      const history = this.getAllLocalPalettes()
      return history.filter((p) => p.anonymous_session_id === sessionId)
    } catch (error) {
      console.error('Error getting palettes by session:', error)
      return []
    }
  },

  /**
   * Merge local palettes with server palettes (deduplicate)
   */
  mergePalettes(localPalettes: ColorPalette[], serverPalettes: ColorPalette[]): ColorPalette[] {
    const merged = [...serverPalettes]
    
    for (const local of localPalettes) {
      const exists = merged.some(
        (p) => p.id === local.id || 
        (p.prompt === local.prompt && 
         p.primary_color === local.primary_color &&
         p.created_at === local.created_at)
      )
      
      if (!exists) {
        merged.push(local)
      }
    }
    
    // Sort by created_at descending
    return merged.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime()
      const dateB = new Date(b.created_at || 0).getTime()
      return dateB - dateA
    })
  },
}

