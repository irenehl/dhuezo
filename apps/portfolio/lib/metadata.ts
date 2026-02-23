import type { Metadata } from 'next'
import { siteConfig } from './config'
import { locales } from '@/i18n/config'

interface GenerateMetadataOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  locale?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

function isProduction(): boolean {
  return (
    process.env.VERCEL_ENV === 'production' ||
    (process.env.VERCEL_ENV === undefined && process.env.NODE_ENV === 'production')
  )
}

/**
 * Get the static OG image path for a project based on projectId
 * Returns the default OG image if no project-specific image exists
 */
function getProjectOgImage(projectId?: string): string {
  if (!projectId) {
    return '/og-image.png'
  }

  const projectOgImages: Record<string, string> = {
    cerebryx: '/og-image-cerebryx.webp',
    'food-dice': '/og-image-food-dice.webp',
    'nameless-mindfulness-app': '/og-image-nameless.webp',
    // Add more project-specific OG images here as needed
  }

  return projectOgImages[projectId] || '/og-image.png'
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  locale = 'en',
  type = 'website',
  publishedTime,
  modifiedTime,
  projectId,
}: GenerateMetadataOptions & { projectId?: string } = {}): Metadata {
  const siteTitle = title || siteConfig.name
  const siteDescription =
    description ||
    'Full Stack Developer building resilient systems and dramatic interfaces.'
  const siteUrl = url || `${siteConfig.url}/${locale}`

  // Use static OG images from /public directory
  // If image is explicitly provided, use it; otherwise use project-specific or default OG image
  const siteImage = image
    ? image.startsWith('http')
      ? image // External absolute URL
      : image.startsWith('/')
      ? image // Relative path - will be resolved by metadataBase
      : `/${image}` // Make it relative if it's not already
    : getProjectOgImage(projectId) // Use static OG image based on projectId or default

  const isProd = isProduction()

  // Map locale codes to Open Graph locale formats
  const ogLocaleMap: Record<string, string> = {
    en: 'en_US',
    es: 'es_ES',
  }
  const ogLocale = ogLocaleMap[locale] || 'en_US'

  // Generate language alternates for all supported locales (including self)
  const languageAlternates: Record<string, string> = {}
  locales.forEach((loc) => {
    // Replace locale in URL if it exists, otherwise append
    const alternateUrl = siteUrl.includes(`/${locale}`)
      ? siteUrl.replace(`/${locale}`, `/${loc}`)
      : `${siteConfig.url}/${loc}`
    languageAlternates[loc] = alternateUrl
  })
  // Add x-default pointing to default locale (English)
  languageAlternates['x-default'] = `${siteConfig.url}/en`

  const metadata: Metadata = {
    title: siteTitle,
    description: siteDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: siteUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: type,
      url: siteUrl,
      title: siteTitle,
      description: siteDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: siteTitle,
          type: siteImage.endsWith('.webp') ? 'image/webp' : 'image/png', // Set image type based on file extension
        },
      ],
      locale: ogLocale,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [siteImage],
      creator: '@irenehl26__',
    },
    robots: {
      index: isProd,
      follow: isProd,
      googleBot: {
        index: isProd,
        follow: isProd,
        ...(isProd && {
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        }),
      },
    },
  }

  return metadata
}

