import OpenAI from 'openai'
import { getContrastColor, calculateContrastRatio, adjustTextColorForContrast, calculateLuminance } from '@/lib/utils/contrast'

// Server-side only - keep API key secret
const apiKey = process.env.OPENAI_API_KEY

const openai = apiKey ? new OpenAI({ apiKey }) : null

export interface ColorPaletteAI {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  muted: string
  border: string
  mood: string
  reasoning: string
}

/**
 * Apply contrast adjustments to ensure WCAG AA compliance
 */
function applyContrastAdjustments(palette: ColorPaletteAI): ColorPaletteAI {
  // Adjust text color based on background - this is the most critical
  const adjustedText = adjustTextColorForContrast(palette.background, palette.text, 4.5)
  
  // Ensure muted has good contrast with background (minimum 1.5:1 for subtle elements)
  const mutedContrast = calculateContrastRatio(palette.background, palette.muted)
  let adjustedMuted = palette.muted
  if (mutedContrast < 1.5) {
    // If muted is too similar to background, adjust it based on background lightness
    const bgLuminance = calculateLuminance(palette.background)
    adjustedMuted = bgLuminance > 0.5 ? '#374151' : '#4b5563' // Darker for light backgrounds, lighter for dark
  }
  
  // Ensure border is visible against background (minimum 1.5:1)
  const borderContrast = calculateContrastRatio(palette.background, palette.border)
  let adjustedBorder = palette.border
  if (borderContrast < 1.5) {
    const bgLuminance = calculateLuminance(palette.background)
    adjustedBorder = bgLuminance > 0.5 ? '#d1d5db' : '#6b7280' // Light for dark backgrounds, dark for light
  }
  
  console.log('Contrast adjustments applied:', {
    originalText: palette.text,
    adjustedText,
    originalMuted: palette.muted,
    adjustedMuted,
    originalBorder: palette.border,
    adjustedBorder,
    bgTextRatio: calculateContrastRatio(palette.background, adjustedText)
  })
  
  return {
    ...palette,
    text: adjustedText,
    muted: adjustedMuted,
    border: adjustedBorder,
  }
}

export async function generateColorPalette(prompt: string): Promise<ColorPaletteAI> {
  // Fallback if no API key: return a deterministic mock palette
  if (!openai) {
    return {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#0b1220',
      text: '#e5e7eb',
      muted: '#1f2937',
      border: '#334155',
      mood: `Mock para: ${prompt}`,
      reasoning: 'OpenAI API key no configurada. Usando paleta mock consistente.'
    }
  }

  const systemPrompt = `Eres un experto en diseño de UI/UX y teoría del color. 
Tu tarea es generar una paleta de colores basada en el prompt del usuario.

Debes responder ÚNICAMENTE con un JSON válido con esta estructura exacta:
{
  "primary": "#hexcolor",
  "secondary": "#hexcolor",
  "accent": "#hexcolor",
  "background": "#hexcolor",
  "text": "#hexcolor",
  "muted": "#hexcolor",
  "border": "#hexcolor",
  "mood": "descripción breve del mood",
  "reasoning": "breve explicación de por qué elegiste estos colores"
}

Reglas:
- Todos los colores deben ser códigos hexadecimales válidos
- El background debe contrastar bien con text
- Primary debe ser vibrante y llamativo
- Muted debe ser una versión suave del primary
- Border debe ser sutil
- Considera la psicología del color basada en el prompt`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-5-nano',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 1,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    // Try to extract JSON from the response (in case there's extra text)
    let jsonContent = content.trim()
    
    // Remove markdown code blocks if present
    if (jsonContent.startsWith('```')) {
      const jsonMatch = jsonContent.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/)
      if (jsonMatch) {
        jsonContent = jsonMatch[1]
      } else {
        // Try to find JSON object in the content
        const jsonObjectMatch = jsonContent.match(/\{[\s\S]*\}/)
        if (jsonObjectMatch) {
          jsonContent = jsonObjectMatch[0]
        }
      }
    }
    
    // Find the first complete JSON object
    const jsonStart = jsonContent.indexOf('{')
    const jsonEnd = jsonContent.lastIndexOf('}')
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      jsonContent = jsonContent.substring(jsonStart, jsonEnd + 1)
    }

    const palette = JSON.parse(jsonContent) as ColorPaletteAI
    
    // Apply contrast adjustments to ensure WCAG compliance
    const adjustedPalette = applyContrastAdjustments(palette)
    return adjustedPalette
  } catch (error) {
    console.error('Error generating palette:', error)
    // Graceful fallback on error
    return {
      primary: '#14b8a6',
      secondary: '#a78bfa',
      accent: '#f472b6',
      background: '#0b1220',
      text: '#e5e7eb',
      muted: '#1f2937',
      border: '#334155',
      mood: 'Fallback',
      reasoning: 'Se produjo un error generando la paleta. Usando fallback.'
    }
  }
}


