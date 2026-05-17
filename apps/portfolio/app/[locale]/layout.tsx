import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { ClarityScript } from '@/components/analytics/clarity-script'
import { CommandPalette } from '@/components/layout/command-palette'
import { Toaster } from '@/components/ui/toaster'
import type { Locale } from '@/i18n/config'
import { routing } from '@/i18n/routing'
import { getCommandPaletteItems } from '@/lib/command-palette-items'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'
import { FloatingFlowers } from '@/components/layout/floating-flowers'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'site' })
  const rawKeywords = t.raw('keywords')
  const keywords = Array.isArray(rawKeywords)
    ? rawKeywords.filter((k): k is string => typeof k === 'string')
    : undefined
  return generateSiteMetadata({ locale, keywords })
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
  const commandPaletteItems = await getCommandPaletteItems(locale)

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <CommandPalette items={commandPaletteItems} />
      <FloatingFlowers />
      {children}
      <Toaster />
      <ClarityScript />
    </NextIntlClientProvider>
  )
}
