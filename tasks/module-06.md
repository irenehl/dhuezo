# Módulo 06: Paleta de Colores con IA

## Objetivo
Crear una funcionalidad donde los usuarios puedan escribir un prompt (ej: "estoy feliz") y la IA generará una paleta de colores que se aplicará a todo el sitio web en tiempo real.

---

## Tarea 6.1: Configurar OpenAI API
**Objetivo**: Preparar integración con OpenAI

**Archivo**: `.env.local` (agregar)
```env
OPENAI_API_KEY=tu_openai_api_key
```

**Instalar dependencia**:
```bash
npm install openai
```

---

## Tarea 6.2: Crear tabla de paletas en Supabase
**Objetivo**: Guardar historial de paletas generadas

**Ejecutar en Supabase SQL Editor**:
```sql
-- Crear tabla de color_palettes
CREATE TABLE IF NOT EXISTS color_palettes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  prompt TEXT NOT NULL,
  colors JSONB NOT NULL,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  background_color TEXT NOT NULL,
  text_color TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  anonymous_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE color_palettes ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Anyone can create palettes"
  ON color_palettes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view palettes"
  ON color_palettes FOR SELECT
  USING (true);

-- Índices
CREATE INDEX color_palettes_user_id_idx ON color_palettes(user_id);
CREATE INDEX color_palettes_created_at_idx ON color_palettes(created_at DESC);
CREATE INDEX color_palettes_anonymous_session_idx ON color_palettes(anonymous_session_id);
```

---

## Tarea 6.3: Crear tipos para paletas de colores
**Objetivo**: Definir interfaces TypeScript

**Archivo**: `/types/color-palette.ts`
```typescript
export interface ColorPalette {
  id?: string
  user_id?: string
  prompt: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted: string
    border: string
  }
  primary_color: string
  secondary_color: string
  accent_color: string
  background_color: string
  text_color: string
  is_anonymous?: boolean
  anonymous_session_id?: string
  created_at?: string
}

export interface GeneratePaletteRequest {
  prompt: string
  userId?: string
  anonymousSessionId?: string
}

export interface GeneratePaletteResponse {
  palette: ColorPalette
  success: boolean
  error?: string
}
```

---

## Tarea 6.4: Crear servicio de OpenAI
**Objetivo**: Generar paletas con IA

**Archivo**: `/lib/ai/openai-service.ts`
```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

export async function generateColorPalette(prompt: string): Promise<ColorPaletteAI> {
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
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 1,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0].message.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const palette = JSON.parse(content) as ColorPaletteAI
    return palette
  } catch (error) {
    console.error('Error generating palette:', error)
    throw error
  }
}
```

---

## Tarea 6.5: Crear API endpoint para generar paletas
**Objetivo**: Endpoint que recibe prompt y devuelve paleta

**Archivo**: `/app/api/color-palette/generate/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateColorPalette } from '@/lib/ai/openai-service'

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

    // Obtener usuario si está autenticado
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

    // Guardar en base de datos
    const { data: savedPalette, error } = await supabase
      .from('color_palettes')
      .insert(paletteData)
      .select()
      .single()

    if (error) {
      console.error('Error saving palette:', error)
      return NextResponse.json(
        { error: 'Failed to save palette' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      palette: savedPalette,
      aiInsights: {
        mood: aiPalette.mood,
        reasoning: aiPalette.reasoning,
      },
    })
  } catch (error) {
    console.error('Error in generate palette:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## Tarea 6.6: Crear contexto de tema dinámico
**Objetivo**: Contexto para manejar cambios de paleta globalmente

**Archivo**: `/lib/context/ThemeContext.tsx`
```typescript
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { ColorPalette } from '@/types/color-palette'

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
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#ec4899',
    background: '#ffffff',
    text: '#0f172a',
    muted: '#f1f5f9',
    border: '#e2e8f0',
  },
  primary_color: '#3b82f6',
  secondary_color: '#8b5cf6',
  accent_color: '#ec4899',
  background_color: '#ffffff',
  text_color: '#0f172a',
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(null)
  const [isCustomTheme, setIsCustomTheme] = useState(false)

  const applyPalette = (palette: ColorPalette) => {
    setCurrentPalette(palette)
    setIsCustomTheme(true)

    // Aplicar variables CSS
    const root = document.documentElement
    const colors = palette.colors

    root.style.setProperty('--primary', colors.primary)
    root.style.setProperty('--secondary', colors.secondary)
    root.style.setProperty('--accent', colors.accent)
    root.style.setProperty('--background', colors.background)
    root.style.setProperty('--foreground', colors.text)
    root.style.setProperty('--muted', colors.muted)
    root.style.setProperty('--border', colors.border)

    // Guardar en localStorage
    localStorage.setItem('customPalette', JSON.stringify(palette))
  }

  const resetPalette = () => {
    setCurrentPalette(defaultPalette)
    setIsCustomTheme(false)

    // Resetear variables CSS
    const root = document.documentElement
    root.style.removeProperty('--primary')
    root.style.removeProperty('--secondary')
    root.style.removeProperty('--accent')
    root.style.removeProperty('--background')
    root.style.removeProperty('--foreground')
    root.style.removeProperty('--muted')
    root.style.removeProperty('--border')

    // Limpiar localStorage
    localStorage.removeItem('customPalette')
  }

  // Cargar paleta guardada al montar
  useEffect(() => {
    const savedPalette = localStorage.getItem('customPalette')
    if (savedPalette) {
      try {
        const palette = JSON.parse(savedPalette)
        applyPalette(palette)
      } catch (error) {
        console.error('Error loading saved palette:', error)
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
```

---

## Tarea 6.7: Actualizar layout con ThemeProvider
**Objetivo**: Envolver app con el provider

**Archivo**: `/app/layout.tsx` (actualización)
```typescript
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/lib/context/ThemeContext"
import { siteConfig } from "@/lib/config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## Tarea 6.8: Crear componente de input de paleta
**Objetivo**: Input con IA para generar paletas

**Archivo**: `/components/color-palette/ColorPaletteInput.tsx`
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from '@/lib/context/ThemeContext'
import { useToast } from '@/components/ui/use-toast'
import { Sparkles, Loader2, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'

export function ColorPaletteInput() {
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
        title: 'Error',
        description: 'Por favor escribe algo para generar la paleta',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    setAiInsights(null)

    try {
      // Obtener o crear session ID para usuarios anónimos
      let sessionId = localStorage.getItem('anonymousSessionId')
      if (!sessionId) {
        sessionId = uuidv4()
        localStorage.setItem('anonymousSessionId', sessionId)
      }

      const response = await fetch('/api/color-palette/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          anonymousSessionId: sessionId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate palette')
      }

      // Aplicar paleta
      applyPalette(data.palette)
      setAiInsights(data.aiInsights)

      toast({
        title: '¡Paleta generada!',
        description: data.aiInsights.mood,
      })

      setPrompt('')
    } catch (error) {
      console.error('Error generating palette:', error)
      toast({
        title: 'Error',
        description: 'No se pudo generar la paleta. Intenta de nuevo.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    resetPalette()
    setAiInsights(null)
    toast({
      title: 'Paleta restaurada',
      description: 'Se ha restaurado la paleta por defecto',
    })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleGenerate} className="flex gap-2">
        <Input
          type="text"
          placeholder="Ej: Estoy feliz, energético, nostálgico..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generar
            </>
          )}
        </Button>
        {isCustomTheme && (
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
          >
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
            <p className="text-sm text-muted-foreground">
              {aiInsights.reasoning}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

---

## Tarea 6.9: Crear visualizador de paleta
**Objetivo**: Mostrar colores de la paleta actual

**Archivo**: `/components/color-palette/PalettePreview.tsx`
```typescript
'use client'

import { useTheme } from '@/lib/context/ThemeContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paleta Actual</CardTitle>
        <CardDescription>
          Prompt: <em>&quot;{currentPalette.prompt}&quot;</em>
        </CardDescription>
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
      </CardContent>
    </Card>
  )
}
```

---

## Tarea 6.10: Crear página de Color Palette
**Objetivo**: Página principal de la funcionalidad

**Archivo**: `/app/color-palette/page.tsx`
```typescript
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ColorPaletteInput } from '@/components/color-palette/ColorPaletteInput'
import { PalettePreview } from '@/components/color-palette/PalettePreview'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Palette, Wand2 } from 'lucide-react'

export const metadata = {
  title: 'Paleta de Colores IA | Portfolio',
  description: 'Genera paletas de colores personalizadas con inteligencia artificial',
}

export default function ColorPalettePage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <Palette className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Paleta de Colores con IA
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expresa cómo te sientes y deja que la IA genere una paleta de colores única que transformará todo el sitio
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* How it works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                ¿Cómo funciona?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold">Escribe un prompt</h3>
                  <p className="text-sm text-muted-foreground">
                    Describe tu estado de ánimo, emoción o cualquier concepto
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold">La IA genera la paleta</h3>
                  <p className="text-sm text-muted-foreground">
                    Nuestra IA analiza tu input y crea una paleta armoniosa
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold">Colores aplicados</h3>
                  <p className="text-sm text-muted-foreground">
                    Los colores se aplican instantáneamente a todo el sitio
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Generar Paleta</CardTitle>
              <CardDescription>
                Escribe cualquier palabra o frase que represente un sentimiento, emoción o concepto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ColorPaletteInput />
            </CardContent>
          </Card>

          {/* Preview Section */}
          <PalettePreview />

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Ejemplos de prompts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  'Estoy feliz',
                  'Nostálgico',
                  'Energético',
                  'Relajado',
                  'Profesional',
                  'Creativo',
                  'Minimalista',
                  'Vintage',
                ].map((example) => (
                  <button
                    key={example}
                    className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
                    onClick={() => {
                      const input = document.querySelector('input[type="text"]') as HTMLInputElement
                      if (input) {
                        input.value = example
                        input.dispatchEvent(new Event('input', { bubbles: true }))
                      }
                    }}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  )
}
```

---

## Verificación Final del Módulo 06
- [ ] OpenAI API está configurada
- [ ] La tabla de paletas está creada en Supabase
- [ ] El endpoint de generación funciona
- [ ] El ThemeProvider está implementado
- [ ] Los colores se aplican correctamente a todo el sitio
- [ ] El input de prompt funciona
- [ ] La paleta se guarda en la base de datos
- [ ] Los usuarios anónimos pueden generar paletas
- [ ] La paleta se guarda en localStorage
- [ ] El preview muestra todos los colores correctamente

**Siguiente módulo**: `module-07-color-history.md`