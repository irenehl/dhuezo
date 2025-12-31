 'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/config'

export const Footer = (): JSX.Element => {
  const tCommon = useTranslations('common')
  const tFooter = useTranslations('footer')

  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card dark:border-zinc-800 dark:bg-zinc-950">
      {/* subtle animated line at the top edge */}
      <div className="h-px w-full bg-gradient-to-r from-border via-muted-foreground/30 to-border animate-pulse dark:from-zinc-900 dark:via-zinc-600 dark:to-zinc-900" />

      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-foreground dark:text-zinc-100">
            {tCommon('copyright', {
              year,
              name: siteConfig.name,
            })}
          </p>
          <p className="font-mono text-[0.7rem] text-muted-foreground dark:text-zinc-500">
            {tFooter('designed')}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            className="font-mono text-[0.7rem] text-muted-foreground transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-100"
            href={siteConfig.links.github}
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            className="font-mono text-[0.7rem] text-muted-foreground transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-100"
            href={siteConfig.links.linkedin}
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </Link>
          <Link
            className="font-mono text-[0.7rem] text-muted-foreground transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-100"
            href={`mailto:${siteConfig.links.email}`}
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  )
}


