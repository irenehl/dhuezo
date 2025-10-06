import { createClient } from '@/lib/supabase/server'
import type { ColorPalette } from '@/types/color-palette'
import { cache } from 'react'

export const paletteServiceServer = {
  // Obtener todas las paletas (paginado) - Server Component
  async getAllPalettes(page = 1, limit = 20): Promise<{
    palettes: ColorPalette[]
    total: number
  }> {
    const start = (page - 1) * limit
    const end = start + limit - 1

    try {
      const supabase = await createClient()
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

  // Obtener paletas del usuario actual - Server Component
  async getUserPalettes(userId: string): Promise<ColorPalette[]> {
    try {
      const supabase = await createClient()
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

  // Obtener paletas de sesión anónima - Server Component
  async getAnonymousPalettes(sessionId: string): Promise<ColorPalette[]> {
    try {
      const supabase = await createClient()
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

  // Buscar paletas por prompt - Server Component
  async searchPalettes(query: string): Promise<ColorPalette[]> {
    try {
      const supabase = await createClient()
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

  // Obtener estadísticas - Server Component con cache
  getStatistics: cache(async (): Promise<{
    totalPalettes: number
    authenticatedUsers: number
    anonymousUsers: number
  }> => {
    try {
      const supabase = await createClient()
      
      const { count: totalPalettes } = await supabase
        .from('color_palettes')
        .select('*', { count: 'exact' })

      const { count: authenticatedUsers } = await supabase
        .from('color_palettes')
        .select('*', { count: 'exact' })
        .not('user_id', 'is', null)

      const { count: anonymousUsers } = await supabase
        .from('color_palettes')
        .select('*', { count: 'exact' })
        .eq('is_anonymous', true)

      return {
        totalPalettes: totalPalettes || 0,
        authenticatedUsers: authenticatedUsers || 0,
        anonymousUsers: anonymousUsers || 0,
      }
    } catch (error) {
      console.error('Error fetching statistics:', error)
      return {
        totalPalettes: 0,
        authenticatedUsers: 0,
        anonymousUsers: 0,
      }
    }
  }),
}
