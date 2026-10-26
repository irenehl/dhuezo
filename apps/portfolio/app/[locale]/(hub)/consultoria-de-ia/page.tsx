import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { ConsultingSection } from '@/components/sections/consulting-section'
import { siteConfig } from '@/lib/config'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'consulting' })

  return generateSiteMetadata({
    locale,
    title: t('title'),
    description: t('answer'),
    image: '/og-image.png',
    url: `${siteConfig.url}/${locale}/consultoria-de-ia`,
    keywords: [t('keyword'), 'Daniela Huezo'],
  })
}

export default async function ConsultingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<JSX.Element> {
  const { locale } = await params

  return <ConsultingSection locale={locale} />
}
