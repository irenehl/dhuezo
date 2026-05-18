import { getTranslations } from 'next-intl/server'
import { Mail } from 'lucide-react'

import { siteConfig } from '@/lib/config'

export async function AboutSectionMinimal({
  locale,
}: {
  locale: string
}): Promise<JSX.Element> {
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <section id="about">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {t('title', { default: 'About' })}
        </h2>
        <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>

        <blockquote className="mt-8 border-l-2 border-primary/45 pl-6 text-lg italic leading-relaxed text-foreground">
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
      </div>
    </section>
  )
}
