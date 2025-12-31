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
      className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:border-zinc-600"
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


