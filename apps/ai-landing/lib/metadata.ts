import type { Metadata } from 'next'
import { siteConfig } from './site-config'

interface GenerateMetadataOptions {
  title?: string
  description?: string
  image?: string
  url?: string
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
  type = 'website',
  publishedTime,
  modifiedTime,
}: GenerateMetadataOptions = {}): Metadata {
  const siteTitle = title || siteConfig.defaultTitle
  const siteDescription = description || siteConfig.defaultDescription
  const siteUrl = url || siteConfig.url
  const siteImage = image
    ? image.startsWith('http')
      ? image
      : image.startsWith('/')
      ? image
      : `/${image}`
    : siteConfig.defaultOgImage

  const isProd = isProduction()

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteDescription,
    keywords: siteConfig.keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type,
      url: siteUrl,
      title: siteTitle,
      description: siteDescription,
      siteName: siteConfig.name,
      locale: 'en_US',
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [siteImage],
      ...(siteConfig.twitterHandle && { creator: siteConfig.twitterHandle }),
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
}
