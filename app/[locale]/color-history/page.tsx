import { PageWrapper } from '@/components/layout/PageWrapper'
import { PaletteHistoryGrid } from '@/components/color-history/PaletteHistoryGrid'
import { HistoryStatisticsServer } from '@/components/color-history/HistoryStatisticsServer'
import { MyPalettes } from '@/components/color-history/MyPalettes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { History, Sparkles, User } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()
  return {
    title: t('colorHistory.pageTitle'),
    description: t('colorHistory.pageDescription'),
  }
}

export default async function ColorHistoryPage() {
  const t = await getTranslations()
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <History className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {t('colorHistory.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('colorHistory.subtitle')}
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-12">
          <HistoryStatisticsServer />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="all">
              <History className="mr-2 h-4 w-4" />
              {t('colorHistory.allPalettes')}
            </TabsTrigger>
            <TabsTrigger value="mine">
              <User className="mr-2 h-4 w-4" />
              {t('colorHistory.myPalettes')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Info Card */}
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start gap-4">
                <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{t('colorHistory.howItWorks')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('colorHistory.howItWorksDescription')}
                  </p>
                </div>
              </div>
            </div>

            {/* History Grid */}
            <PaletteHistoryGrid />
          </TabsContent>

          <TabsContent value="mine">
            <MyPalettes />
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  )
}

