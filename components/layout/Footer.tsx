 'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { siteConfig } from '@/lib/config'

export const Footer = (): JSX.Element => {
  const tCommon = useTranslations('common')
  const tFooter = useTranslations('footer')
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? theme === 'dark' : true
  const designedText = isDark ? tFooter('designedDark') : tFooter('designedLight')

  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xs text-zinc-400 font-mono font-medium dark:text-zinc-500">
          {tCommon('copyright', {
            year,
            name: siteConfig.name,
          })}
        </div>
        <div className="flex items-center gap-1 text-zinc-500 text-xs uppercase tracking-widest font-semibold dark:text-zinc-400">
          <span>{designedText}</span>
          {isDark ? (
            <Moon className="w-3 h-3 text-zinc-400" />
          ) : (
            <Sun className="w-3 h-3 text-amber-500" />
          )}
        </div>
      </div>
    </footer>
  )
}


