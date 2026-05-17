import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'

import { HomeMinimalExperience } from '@/components/sections/home-minimal-experience'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'

function SectionFallback(): JSX.Element {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-8 w-40 rounded-md bg-muted" />
      <div className="mt-8 h-20 w-full rounded-md bg-muted" />
      <div className="mt-4 h-20 w-full rounded-md bg-muted" />
    </div>
  )
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

  return generateSiteMetadata({
    locale,
    title: t('homeTitle'),
    description: t('homeDescription'),
    image: '/og-image.png',
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
  })
}

export default async function HubExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<JSX.Element> {
  const { locale } = await params

  return (
    <Suspense fallback={<SectionFallback />}>
      <HomeMinimalExperience locale={locale} />
    </Suspense>
  )
}
