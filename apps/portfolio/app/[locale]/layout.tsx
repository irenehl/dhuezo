import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Toaster } from '@/components/ui/toaster'
import { ClarityScript } from '@/components/analytics/ClarityScript'
import { BackgroundLayers } from '@/components/layout/BackgroundLayers'
import { DecorativeElements } from '@/components/layout/DecorativeElements'
import { AnimatedBackground } from '@/components/layout/AnimatedBackground'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { FloatingFlowers } from '@/components/layout/FloatingFlowers'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'
import type { Locale } from '@/i18n/config'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateSiteMetadata({ locale })
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <AnimatedBackground />
      <BackgroundLayers />
      <FloatingFlowers />
      <DecorativeElements />
      <CustomCursor />
      {children}
      <Toaster />
      <ClarityScript />
    </NextIntlClientProvider>
  )
}

