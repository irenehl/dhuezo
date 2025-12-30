'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:border-zinc-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:hover:border-zinc-600"
        aria-label="Toggle theme"
      >
        <Sun className="w-4 h-4" />
      </button>
    )
  }

  return (
    <button
      className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:border-zinc-500 transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:hover:border-zinc-600"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </button>
  )
}

