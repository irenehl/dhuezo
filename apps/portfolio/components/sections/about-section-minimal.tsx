import { getTranslations } from 'next-intl/server'
import { Github, Linkedin, Mail } from 'lucide-react'

import { siteConfig } from '@/lib/config'
import { XIcon } from '@/components/icons/x-icon'
import { InstagramIcon } from '@/components/icons/instagram-icon'

export async function AboutSectionMinimal({
  locale,
}: {
  locale: string
}): Promise<JSX.Element> {
  const t = await getTranslations({ locale, namespace: 'about' })

  const socialLinks = [
    {
      href: t('social.github', { default: 'https://github.com/irenehl' }),
      Icon: Github,
      label: 'GitHub',
    },
    {
      href: t('social.linkedin', {
        default: 'https://linkedin.com/in/danielahuezo',
      }),
      Icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: t('social.x', { default: 'https://x.com/irenehl26__' }),
      Icon: XIcon,
      label: 'X',
    },
    {
      href: t('social.instagram', {
        default: 'https://instagram.com/irenehl__',
      }),
      Icon: InstagramIcon,
      label: 'Instagram',
    },
  ]

  return (
    <section id="about">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {t('title', { default: 'About' })}
        </h2>
        <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>

        <blockquote className="mt-8 border-l-2 border-primary pl-6 text-lg italic leading-relaxed text-foreground">
          {t('pullQuote')}
        </blockquote>

        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          {t('description1')}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {t('description2')}
        </p>

        <div className="mt-8">
          <p className="text-sm font-medium text-foreground">
            {t('connectLabel', { default: 'Say hello' })}
          </p>
          <a
            href={`mailto:${t('email', { default: siteConfig.links.email })}`}
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Mail className="size-4" aria-hidden />
            {t('email')}
          </a>
        </div>

        <a
          href={siteConfig.calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t('cta', { default: "Let's Connect" })}
        </a>

        <div className="mt-8">
          <p className="text-sm font-medium text-foreground">
            {t('socialLabel', { default: 'Elsewhere' })}
          </p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {socialLinks.map(({ href, Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex rounded-full border border-border bg-card p-2.5 text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
