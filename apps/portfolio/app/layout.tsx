import type { Metadata } from 'next'
import { Lora, DM_Sans, Caveat } from 'next/font/google'

import './globals.css'
import { routing } from '@/i18n/routing'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'

function isProduction(): boolean {
  return (
    process.env.VERCEL_ENV === 'production' ||
    (process.env.VERCEL_ENV === undefined && process.env.NODE_ENV === 'production')
  )
}

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

// Root layout metadata - fallback defaults
// Actual page metadata is generated in [locale]/layout.tsx
const isProd = isProduction()
export const metadata: Metadata = {
  ...generateSiteMetadata({
    locale: routing.defaultLocale,
    title: 'Daniela Huezo',
    description: 'Software Engineer and Cursor Ambassador. Crafting resilient systems and delightful interfaces for products that scale.',
    image: '/og-image.png',
  }),
  icons: {
    icon: '/logo.svg',
  },
  keywords: [
    'Software Engineer',
    'Cursor Ambassador',
    'Web Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Daniela Huezo',
  ],
  authors: [{ name: 'Daniela Huezo' }],
  creator: 'Daniela Huezo',
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
