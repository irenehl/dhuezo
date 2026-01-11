import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

function isProduction(): boolean {
  return (
    process.env.VERCEL_ENV === 'production' ||
    (process.env.VERCEL_ENV === undefined && process.env.NODE_ENV === 'production')
  )
}

export default function robots(): MetadataRoute.Robots {
  const isProd = isProduction()

  if (isProd) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${siteConfig.url}/sitemap.xml`,
    }
  }

  // Non-production: disallow all crawling
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
