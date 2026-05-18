import { getTranslations } from 'next-intl/server'

import { siteConfig } from '@/lib/config'

interface SiteJsonLdProps {
  locale?: string
}

export async function SiteJsonLd({ locale = 'en' }: SiteJsonLdProps) {
  const siteUrl = `${siteConfig.url}/${locale}`
  const t = await getTranslations({ locale, namespace: 'site' })
  const jobTitle = t('jsonLdJobTitle')
  const rawKnows = t.raw('jsonLdKnowsAbout')
  const knowsAbout = Array.isArray(rawKnows)
    ? rawKnows.filter((k): k is string => typeof k === 'string')
    : []

  const personId = `${siteConfig.url}/#person`
  const websiteId = `${siteUrl}/#website`
  const photoUrl = new URL('/me.jpeg', `${siteConfig.url}/`).href

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: siteConfig.name,
        url: siteConfig.url,
        image: photoUrl,
        jobTitle,
        description: t('homeDescription'),
        ...(knowsAbout.length > 0 ? { knowsAbout } : {}),
        sameAs: [
          siteConfig.links.github,
          siteConfig.links.linkedin,
          siteConfig.links.luma,
          siteConfig.links.x,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteConfig.name,
        url: siteUrl,
        description: t('homeDescription'),
        inLanguage: locale,
        publisher: { '@id': personId },
      },
    ],
  }

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  )
}
