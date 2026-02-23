import { siteConfig } from '@/lib/config'

interface SiteJsonLdProps {
  locale?: string
}

export function SiteJsonLd({ locale = 'en' }: SiteJsonLdProps) {
  const siteUrl = `${siteConfig.url}/${locale}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteUrl,
    description:
      'Software Engineer and Cursor Ambassador. Crafting resilient systems and delightful interfaces for products that scale.',
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.x,
      ],
    },
  }

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  )
}
