import type { Metadata } from 'next'
import { Lora, DM_Sans, Caveat } from 'next/font/google'

import './globals.css'
import { routing } from '@/i18n/routing'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

// Display/Headers font
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

// Body font
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
})

// Accent/Cursive font
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '600'],
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
        className={`${lora.variable} ${dmSans.variable} ${caveat.variable} font-body min-h-screen antialiased overflow-x-hidden bg-[#F4EDE1] text-[#8B7355] dark:bg-[#2a2420] dark:text-[#F4EDE1] selection:bg-rose-200 selection:text-rose-900 dark:selection:bg-rose-900 dark:selection:text-rose-200`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
