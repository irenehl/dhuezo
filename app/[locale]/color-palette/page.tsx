import { PageWrapper } from '@/components/layout/PageWrapper'
import { ColorPaletteInput } from '@/components/color-palette/ColorPaletteInput'
import { PalettePreview } from '@/components/color-palette/PalettePreview'
import { PaletteCarousel } from '@/components/color-palette/PaletteCarousel'
import { PaletteHistoryDropdown } from '@/components/color-palette/PaletteHistoryDropdown'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PromptExamples } from '@/components/color-palette/PromptExamples'
import { Sparkles, Palette, Wand2, Clock } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()
  return {
    title: t('colorPalette.pageTitle'),
    description: t('colorPalette.pageDescription'),
  }
}

export default async function ColorPalettePage() {
  const t = await getTranslations()
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <Palette className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {t('colorPalette.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('colorPalette.subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* How it works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                {t('colorPalette.howItWorks')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold">{t('colorPalette.step1.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('colorPalette.step1.description')}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold">{t('colorPalette.step2.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('colorPalette.step2.description')}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold">{t('colorPalette.step3.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('colorPalette.step3.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input and Examples Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t('colorPalette.generateTitle')}</CardTitle>
              <CardDescription>
                {t('colorPalette.generateDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ColorPaletteInput />
              
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Sparkles className="h-5 w-5" />
                  {t('colorPalette.promptExamples')}
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
              <h2 className="text-2xl font-bold">{t('colorPalette.recentPalettes')}</h2>
            </div>
            <p className="text-muted-foreground">
              {t('colorPalette.recentPalettesDescription')}
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

