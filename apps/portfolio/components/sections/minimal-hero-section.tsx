import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Github, Linkedin, Mail } from 'lucide-react'

import { siteConfig } from '@/lib/config'
import { XIcon } from '@/components/icons/x-icon'
import { InstagramIcon } from '@/components/icons/instagram-icon'
import { SiteHeader } from '@/components/layout/site-header'
import { FadeUp, FadeUpStagger, FadeUpItem } from '@/components/ui/fade-up'

export async function MinimalHeroSection({
  locale,
}: {
  locale: string
}): Promise<JSX.Element> {
  const t = await getTranslations({ locale, namespace: 'hero' })
  const tAbout = await getTranslations({ locale, namespace: 'about' })

  const socialLinks = [
    {
      href: tAbout('social.github', { default: 'https://github.com/irenehl' }),
      Icon: Github,
      label: 'GitHub',
    },
    {
      href: tAbout('social.linkedin', {
        default: 'https://linkedin.com/in/danielahuezo',
      }),
      Icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: tAbout('social.x', { default: 'https://x.com/irenehl26__' }),
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
    <header id="intro" className="space-y-8">
      <div className="flex flex-col-reverse gap-6 md:flex-row md:items-start md:justify-between">
        <FadeUpStagger className="space-y-5 md:max-w-[70%]">
          <FadeUpItem>
            <h1 className="font-display font-semibold text-4xl text-foreground tracking-tighter text-balance sm:text-5xl">
              Daniela{' '}
              <span className="text-primary">Huezo</span>
            </h1>
          </FadeUpItem>

          <FadeUpItem>
            <div className="space-y-3">
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {t('description')}
              </p>
              <div className="flex items-center gap-2 font-mono text-muted-foreground/80 text-sm">
                <span>{t('meta', { default: 'Based in LatAm' })}</span>
                <span className="text-muted-foreground/40" aria-hidden="true">•</span>
                <div className="flex shrink-0 items-center gap-3 ml-1">
                  {socialLinks.map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                  <a
                    href={`mailto:${tAbout('email', { default: siteConfig.links.email })}`}
                    aria-label="Email"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </FadeUpItem>

        </FadeUpStagger>

        <FadeUp delay={0.1} className="shrink-0">
          <Image
            src="/logo-with-bg.svg"
            alt="Daniela Huezo"
            width={80}
            height={80}
            className="size-16 sm:size-20 rounded-full object-cover shadow-sm ring-1 ring-border/50"
          />
        </FadeUp>
      </div>

      <FadeUp delay={0.2}>
        <SiteHeader />
      </FadeUp>

      <FadeUp delay={0.3} className="pt-6">
        <div className="relative flex overflow-hidden border-y border-border/40 bg-muted/20 py-3">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-4 text-[11px] font-mono tracking-[0.2em] uppercase text-muted-foreground/80">
                <span>Cursor Ambassador</span>
                <span className="text-accent/50">✦</span>
                <span>Co-founder Ai/abs</span>
                <span className="text-accent/50">✦</span>
                <span>Notion Builders Program</span>
                <span className="text-accent/50">✦</span>
                <span>Software Engineer</span>
                <span className="text-accent/50">✦</span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </header>
  )
}
