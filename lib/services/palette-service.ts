import { createClient } from '@/lib/supabase/client'
import type { ColorPalette } from '@/types/color-palette'

const supabase = createClient()

export const paletteService = {
  async getAllPalettes(page = 1, limit = 20): Promise<{ palettes: ColorPalette[]; total: number }> {
    const start = (page - 1) * limit
    const end = start + limit - 1

    try {
      const { data, error, count } = await supabase
        .from('color_palettes')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(start, end)

      if (error) throw error

      return { palettes: (data as ColorPalette[]) || [], total: count || 0 }
    } catch {
      return { palettes: [], total: 0 }
    }
  },

  async getUserPalettes(userId: string): Promise<ColorPalette[]> {
    try {
      const { data, error } = await supabase
        .from('color_palettes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data as ColorPalette[]) || []
    } catch {
      return []
    }
  },

  async getAnonymousPalettes(sessionId: string): Promise<ColorPalette[]> {
    try {
      const { data, error } = await supabase
        .from('color_palettes')
        .select('*')
        .eq('anonymous_session_id', sessionId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data as ColorPalette[]) || []
    } catch {
      return []
    }
  },

  async searchPalettes(query: string): Promise<ColorPalette[]> {
    try {
      const { data, error } = await supabase
        .from('color_palettes')
        .select('*')
        .ilike('prompt', `%${query}%`)
        .order('created_at', { ascending: false })
        .limit(50)
      if (error) throw error
      return (data as ColorPalette[]) || []
    } catch {
      return []
    }
  },

  async getPopularPalettes(limit = 10): Promise<ColorPalette[]> {
    try {
      const { data, error } = await supabase
        .from('color_palettes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return (data as ColorPalette[]) || []
    } catch {
      return []
    }
  },

  async getStatistics(): Promise<{ totalPalettes: number; authenticatedUsers: number; anonymousUsers: number }> {
    const { count: totalPalettes } = await supabase
      .from('color_palettes')
      .select('*', { count: 'exact', head: true })

    const { count: authenticatedUsers } = await supabase
      .from('color_palettes')
      .select('*', { count: 'exact', head: true })
      .not('user_id', 'is', null)

    const { count: anonymousUsers } = await supabase
      .from('color_palettes')
      .select('*', { count: 'exact', head: true })
      .eq('is_anonymous', true)

    return {
      totalPalettes: totalPalettes || 0,
      authenticatedUsers: authenticatedUsers || 0,
      anonymousUsers: anonymousUsers || 0,
    }
  },
}


