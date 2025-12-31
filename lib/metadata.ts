import type { Metadata } from 'next'
import { siteConfig } from './config'

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
  // Use relative path when metadataBase is set, or absolute URL for external images
  const siteImage = image
    ? image.startsWith('http')
      ? image // External absolute URL
      : image.startsWith('/')
      ? image // Relative path - will be resolved by metadataBase
      : `/${image}` // Make it relative if it's not already
    : '/og-image.png' // Default OG image - relative path resolved by metadataBase

  const metadata: Metadata = {
    title: siteTitle,
    description: siteDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: siteUrl,
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
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  return metadata
}

