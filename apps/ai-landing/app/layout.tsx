import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@dhuezo/ui'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Nameless - Find Your Calm',
    template: '%s | Nameless',
  },
  description: 'Interactive mindfulness activities designed to help you settle your mind. No pressure. No streaks. Just a quiet space to breathe.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'),
  keywords: [
    'mindfulness',
    'meditation',
    'anxiety relief',
    'grounding techniques',
    'calm',
    'wellness',
    'mental health',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
    siteName: 'Nameless',
    title: 'Nameless - Find Your Calm',
    description: 'Interactive mindfulness activities designed to help you settle your mind. No pressure. No streaks. Just a quiet space to breathe.',
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
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} font-sans min-h-screen antialiased bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
