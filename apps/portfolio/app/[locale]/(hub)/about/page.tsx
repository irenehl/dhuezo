import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { AboutSectionMinimal } from '@/components/sections/about-section-minimal'
import { siteConfig } from '@/lib/config'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'

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

  return generateSiteMetadata({
    locale,
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    image: '/og-image.png',
    url: `${siteConfig.url}/${locale}/about`,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
  })
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<JSX.Element> {
  const { locale } = await params

  return <AboutSectionMinimal locale={locale} />
}
