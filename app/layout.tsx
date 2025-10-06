import type { Metadata } from "next"
import { Inter, Caveat } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/lib/context/ThemeContext"
import { siteConfig } from "@/lib/config"
import { ClarityScript } from "@/components/analytics/ClarityScript"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const caveat = Caveat({ 
  subsets: ["latin"],
  variable: '--font-handwriting',
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body 
        className={`${inter.variable} ${caveat.variable} font-sans`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          {children}
          <Toaster />
          <ClarityScript />
        </ThemeProvider>
      </body>
    </html>
  )
}
