import type { ColorPalette } from '@/types/color-palette'

export const paletteService = {
  async getAllPalettes(page = 1, limit = 20): Promise<{ palettes: ColorPalette[]; total: number }> {
    return { palettes: [], total: 0 }
  },

  async getUserPalettes(userId: string): Promise<ColorPalette[]> {
    return []
  },

  async getAnonymousPalettes(sessionId: string): Promise<ColorPalette[]> {
    return []
  },

  async searchPalettes(query: string): Promise<ColorPalette[]> {
    return []
  },

  async getPopularPalettes(limit = 10): Promise<ColorPalette[]> {
    return []
  },

  async getStatistics(): Promise<{ totalPalettes: number; authenticatedUsers: number; anonymousUsers: number }> {
    return {
      totalPalettes: 0,
      authenticatedUsers: 0,
      anonymousUsers: 0,
    }
  },
}
