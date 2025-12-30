import { NextRequest, NextResponse } from 'next/server'
import { generateColorPalette } from '@/lib/ai/openai-service'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const { prompt, anonymousSessionId } = await request.json()

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Generar paleta con IA
    const aiPalette = await generateColorPalette(prompt)

    // Preparar datos para devolver (sin guardar en base de datos)
    const paletteData = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      user_id: null,
      prompt: prompt.trim(),
      colors: aiPalette,
      primary_color: aiPalette.primary,
      secondary_color: aiPalette.secondary,
      accent_color: aiPalette.accent,
      background_color: aiPalette.background,
      text_color: aiPalette.text,
      is_anonymous: true,
      anonymous_session_id: anonymousSessionId || null,
    }

    return NextResponse.json({
      success: true,
      palette: paletteData,
      aiInsights: {
        mood: aiPalette.mood,
        reasoning: aiPalette.reasoning,
      },
    })
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


