import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@dhuezo/ui'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'
import { SiteJsonLd } from '@/components/seo/SiteJsonLd'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = generateSiteMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} font-sans min-h-screen antialiased bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400`}
        suppressHydrationWarning={true}
      >
        <SiteJsonLd />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
