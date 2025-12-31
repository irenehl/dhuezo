'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

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
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full border-border/50 bg-background/80 backdrop-blur-sm text-foreground hover:bg-muted hover:border-border transition-colors dark:border-white/20 dark:bg-black/20 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/40"
      onClick={handleToggle}
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}


