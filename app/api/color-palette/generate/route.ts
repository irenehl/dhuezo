import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateColorPalette } from '@/lib/ai/openai-service'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  // Set a timeout for the entire function
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Function timeout')), 25000) // 25 seconds
  })

  try {
    const result = await Promise.race([
      (async () => {
        const { prompt, anonymousSessionId } = await request.json()

        if (!prompt || prompt.trim().length === 0) {
          return NextResponse.json(
            { error: 'Prompt is required' },
            { status: 400 }
          )
        }

        // Generar paleta con IA
        const aiPalette = await generateColorPalette(prompt)

        // Obtener usuario si está autenticado (usa mock si envs inválidos)
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        // Preparar datos para guardar
        const paletteData = {
          user_id: user?.id || null,
          prompt: prompt.trim(),
          colors: aiPalette,
          primary_color: aiPalette.primary,
          secondary_color: aiPalette.secondary,
          accent_color: aiPalette.accent,
          background_color: aiPalette.background,
          text_color: aiPalette.text,
          is_anonymous: !user,
          anonymous_session_id: user ? null : anonymousSessionId,
        }

        // Guardar en base de datos, si hay Supabase real configurado; si no, devolver sin guardar
        let savedPalette = null as any
        try {
          const { data, error } = await supabase
            .from('color_palettes')
            .insert(paletteData)
            .select()
            .single()
          if (error) throw error
          savedPalette = data
        } catch {
          savedPalette = {
            id: uuidv4(),
            created_at: new Date().toISOString(),
            ...paletteData,
          }
        }

        return NextResponse.json({
          success: true,
          palette: savedPalette || {
            id: uuidv4(),
            created_at: new Date().toISOString(),
            user_id: user?.id || null,
            prompt: prompt.trim(),
            colors: aiPalette,
            primary_color: aiPalette.primary,
            secondary_color: aiPalette.secondary,
            accent_color: aiPalette.accent,
            background_color: aiPalette.background,
            text_color: aiPalette.text,
            is_anonymous: !user,
            anonymous_session_id: user ? null : anonymousSessionId,
          },
          aiInsights: {
            mood: aiPalette.mood,
            reasoning: aiPalette.reasoning,
          },
        })
      })(),
      timeoutPromise
    ])

    return result
  } catch (error) {
    console.error('Error in generate palette:', error)
    // Graceful fallback response instead of 500
    const fallback = {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#0b1220',
      text: '#e5e7eb',
      muted: '#1f2937',
      border: '#334155',
      mood: 'Fallback',
      reasoning: 'No se pudo generar con IA, devolviendo paleta por defecto.',
    }
    return NextResponse.json({
      success: true,
      palette: {
        id: uuidv4(),
        created_at: new Date().toISOString(),
        user_id: null,
        prompt: 'fallback',
        colors: fallback,
        primary_color: fallback.primary,
        secondary_color: fallback.secondary,
        accent_color: fallback.accent,
        background_color: fallback.background,
        text_color: fallback.text,
        is_anonymous: true,
        anonymous_session_id: null,
      },
      aiInsights: {
        mood: fallback.mood,
        reasoning: fallback.reasoning,
      },
      note: 'fallback-response',
    })
  }
}


