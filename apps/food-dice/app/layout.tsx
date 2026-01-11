import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@dhuezo/ui'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Food Dice - Stop Debating. Start Dining.',
    template: '%s | Food Dice',
  },
  description:
    'Food Dice eliminates the endless "where should we eat?" conversation. Discover your next favorite restaurant with a random roll based on your cravings.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'
  ),
  keywords: [
    'food',
    'restaurant finder',
    'dining',
    'random restaurant',
    'food discovery',
    'where to eat',
    'restaurant picker',
    'food dice',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002',
    siteName: 'Food Dice',
    title: 'Food Dice - Stop Debating. Start Dining.',
    description:
      'Food Dice eliminates the endless "where should we eat?" conversation. Discover your next favorite restaurant with a random roll based on your cravings.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans min-h-screen antialiased bg-slate-950 text-slate-50 selection:bg-emerald-400 selection:text-slate-950 overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
