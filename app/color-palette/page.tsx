import { PageWrapper } from '@/components/layout/PageWrapper'
import { ColorPaletteInput } from '@/components/color-palette/ColorPaletteInput'
import { PalettePreview } from '@/components/color-palette/PalettePreview'
import { PaletteCarousel } from '@/components/color-palette/PaletteCarousel'
import { PaletteHistoryDropdown } from '@/components/color-palette/PaletteHistoryDropdown'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PromptExamples } from '@/components/color-palette/PromptExamples'
import { Sparkles, Palette, Wand2, Clock } from 'lucide-react'

export const metadata = {
  title: 'Paleta de colores IA',
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
            Paleta de colores con IA
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

          {/* Input and Examples Section */}
          <Card>
            <CardHeader>
              <CardTitle>Generar Paleta</CardTitle>
              <CardDescription>
                Escribe cualquier palabra o frase que represente un sentimiento, emoción o concepto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ColorPaletteInput />
              
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Sparkles className="h-5 w-5" />
                  Ejemplos de prompts
                </h3>
                <PromptExamples />
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <PalettePreview />

          {/* History Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Tus paletas recientes</h2>
            </div>
            <p className="text-muted-foreground">
              Accede rápidamente a tus últimas 5 paletas generadas. Haz clic en cualquiera para aplicarla.
            </p>
            
            {/* Carousel */}
            <PaletteCarousel />
            
            {/* Full History Dropdown */}
            <PaletteHistoryDropdown />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}


