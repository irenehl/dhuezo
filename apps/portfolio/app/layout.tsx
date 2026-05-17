import type { Metadata, Viewport } from 'next'
import { Lora, DM_Sans, Caveat } from 'next/font/google'
import { headers } from 'next/headers'

import './globals.css'
import { routing } from '@/i18n/routing'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'

// Display/Headers font
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// Body font (300 unused in UI; dropping it saves one font file on first load)
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// Accent/Cursive font
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400'],
  display: 'swap',
})

// Root layout metadata - fallback defaults
// Actual page metadata is generated in [locale]/layout.tsx
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

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
  authors: [{ name: 'Daniela Huezo' }],
  creator: 'Daniela Huezo',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const locale = headersList.get('x-site-locale') ?? routing.defaultLocale

  return (
    <html
      lang={locale}
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
