import type { Metadata } from 'next'
import { Inter, Cinzel, Playfair_Display_SC } from 'next/font/google'

import './globals.css'
import { routing } from '@/i18n/routing'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '800'],
})

const playfairDisplaySC = Playfair_Display_SC({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Daniela Huezo',
    template: '%s | Daniela Huezo',
  },
  description: 'Full Stack Developer building resilient systems and dramatic interfaces.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  keywords: [
    'Full Stack Developer',
    'Web Developer',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Daniela Huezo',
  ],
  authors: [{ name: 'Daniela Huezo' }],
  creator: 'Daniela Huezo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Daniela Huezo',
    title: 'Daniela Huezo - Full Stack Developer',
    description: 'Full Stack Developer building resilient systems and dramatic interfaces.',
    images: [
      {
        url: '/og-image.png', // Static OG image - relative path resolved by metadataBase
        width: 1200,
        height: 630,
        alt: 'Daniela Huezo - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniela Huezo - Full Stack Developer',
    description: 'Full Stack Developer building resilient systems and dramatic interfaces.',
    creator: '@irenehl26__',
    images: ['/og-image.png'], // Static OG image - relative path resolved by metadataBase
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang={routing.defaultLocale}
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${cinzel.variable} ${playfairDisplaySC.variable} font-body min-h-screen antialiased overflow-x-hidden bg-zinc-50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 selection:bg-rose-200 selection:text-rose-900 dark:selection:bg-rose-900 dark:selection:text-rose-200`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
