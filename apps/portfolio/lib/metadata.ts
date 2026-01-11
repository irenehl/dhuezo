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

export function generateMetadata({
  title,
  description,
  image,
  url,
  locale = 'en',
  type = 'website',
  publishedTime,
  modifiedTime,
}: GenerateMetadataOptions = {}): Metadata {
  const siteTitle = title || siteConfig.name
  const siteDescription =
    description ||
    'Full Stack Developer building resilient systems and dramatic interfaces.'
  const siteUrl = url || `${siteConfig.url}/${locale}`
  
  // Generate dynamic OG image URL with query params
  const generateOgImageUrl = (ogTitle: string, ogDescription: string, ogLocale: string) => {
    const params = new URLSearchParams({
      title: ogTitle,
      description: ogDescription,
      locale: ogLocale,
    })
    return `/api/og?${params.toString()}`
  }

  // Use relative path when metadataBase is set, or absolute URL for external images
  const siteImage = image
    ? image.startsWith('http')
      ? image // External absolute URL
      : image.startsWith('/')
      ? image // Relative path - will be resolved by metadataBase
      : `/${image}` // Make it relative if it's not already
    : generateOgImageUrl(siteTitle, siteDescription, locale) // Dynamic OG image - relative path resolved by metadataBase

  const isProd = isProduction()

  // Generate language alternates for all supported locales
  const languageAlternates: Record<string, string> = {}
  locales.forEach((loc) => {
    if (loc !== locale) {
      // Replace locale in URL if it exists, otherwise append
      const alternateUrl = siteUrl.includes(`/${locale}`)
        ? siteUrl.replace(`/${locale}`, `/${loc}`)
        : `${siteConfig.url}/${loc}`
      languageAlternates[loc] = alternateUrl
    }
  })

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
        },
      ],
      locale: locale,
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

