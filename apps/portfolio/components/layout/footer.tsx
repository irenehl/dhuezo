import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { ArrowUp, CalendarDays, Github, Linkedin, Mail } from 'lucide-react'

import { siteConfig } from '@/lib/config'
import { XIcon } from '@/components/icons/x-icon'
import { InstagramIcon } from '@/components/icons/instagram-icon'

export async function Footer({
  locale = 'en',
}: {
  locale?: string
} = {}): Promise<JSX.Element> {
  const tFooter = await getTranslations({ locale, namespace: 'footer' })
  const tAbout = await getTranslations({ locale, namespace: 'about' })
  const tHero = await getTranslations({ locale, namespace: 'hero' })
  const year = new Date().getFullYear()

  const socialLinks = [
    {
      href: tAbout('social.github', { default: siteConfig.links.github }),
      Icon: Github,
      label: 'GitHub',
    },
    {
      href: tAbout('social.linkedin', { default: siteConfig.links.linkedin }),
      Icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: tAbout('social.luma', { default: siteConfig.links.luma }),
      Icon: CalendarDays,
      label: 'Luma',
    },
    {
      href: tAbout('social.x', { default: siteConfig.links.x }),
      Icon: XIcon,
      label: 'X',
    },
    {
      href: tAbout('social.instagram', {
        default: 'https://instagram.com/irenehl__',
      }),
      Icon: InstagramIcon,
      label: 'Instagram',
    },
  ]

  return (
    <footer className="space-y-8">
      {/* Top row: identity + socials */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/me.jpeg"
            alt={siteConfig.name}
            width={320}
            height={400}
            className="size-9 rounded-full object-cover ring-1 ring-border/28"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-semibold text-foreground">
              {siteConfig.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {tFooter('tagline')}
            </span>
          </div>
        </div>

        <ul
          className="flex items-center gap-1 rounded-full border border-border/22 bg-card/40 p-1.5 backdrop-blur-sm shadow-sm"
          aria-label={tFooter('socialsAria', { default: 'Social profiles' })}
        >
          {socialLinks.map(({ href, Icon, label }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${tAbout('email', { default: siteConfig.links.email })}`}
              aria-label="Email"
              className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground"
            >
              <Mail className="size-4" />
            </a>
          </li>
        </ul>
      </div>

      {/* Cozy line */}
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
        <span className="mr-2 text-accent/60" aria-hidden>
          ✦
        </span>
        {tFooter('cozyMessage')}
      </p>

      {/* Meta row: copyright · location · back to top */}
      <div className="flex flex-col-reverse items-start gap-4 border-t border-border/26 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs tabular-nums text-muted-foreground/80">
          <span>© {year}</span>
          <span className="text-muted-foreground/40" aria-hidden>
            ·
          </span>
          <span>{siteConfig.name}</span>
          <span className="text-muted-foreground/40" aria-hidden>
            ·
          </span>
          <span>{tHero('meta', { default: 'El Salvador · UTC−6' })}</span>
        </div>

        <a
          href="#intro"
          className="group inline-flex items-center gap-2 rounded-full border border-border/22 bg-card/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border/32 hover:bg-card hover:text-foreground"
        >
          <span>{tFooter('top')}</span>
          <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}
