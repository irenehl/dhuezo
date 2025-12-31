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
  title: 'Daniela Huezo',
  description: 'Full Stack Developer',
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
