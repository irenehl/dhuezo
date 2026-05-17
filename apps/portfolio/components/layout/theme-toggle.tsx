'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle(): JSX.Element {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark mode during SSR to match ThemeProvider defaultTheme
  const isDark = mounted ? theme === 'dark' : true

  const handleToggle = (): void => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-card/40 text-foreground hover:bg-card hover:border-border/80 transition-all shadow-sm backdrop-blur-sm"
      onClick={handleToggle}
    >
      {isDark ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  )
}
