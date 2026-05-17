'use client'

import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/config'

export const Footer = (): JSX.Element => {
  const tFooter = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="bg-muted rounded-sm px-6 py-8 md:px-8 md:py-10">
      <div className="flex flex-col items-start justify-between gap-6 text-sm text-muted-foreground md:flex-row md:items-center">
        <p className="max-w-md leading-relaxed">
          {tFooter('tagline', {
            default:
              'Daniela Huezo — senior tech lead & software engineer, El Salvador · remote.',
          })}
        </p>
        <div className="flex flex-wrap items-center gap-3 tabular-nums">
          <a href="#intro" className="transition-colors hover:text-foreground">
            {tFooter('top', { default: 'Top' })}
          </a>
          <span aria-hidden>·</span>
          <span>
            © {year} {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  )
}
