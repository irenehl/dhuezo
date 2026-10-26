import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/routing'

export async function ConsultingSection({
  locale,
}: {
  locale: string
}): Promise<JSX.Element> {
  const t = await getTranslations({ locale, namespace: 'consulting' })

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t('question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('answer'),
        },
      },
    ],
  }

  return (
    <article id="consultoria-de-ia" className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {t('heading')}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {t('answer')}
        </p>
        <h3 className="mt-8 text-base font-medium text-foreground">{t('question')}</h3>
      </div>
      <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
        <li>
          <Link
            href="/blog/seo-analytics-ai-masterclass"
            className="text-foreground underline-offset-4 hover:underline"
          >
            {t('masterclassLink')}
          </Link>
        </li>
        <li>
          <Link
            href="/projects/smart-resume"
            className="text-foreground underline-offset-4 hover:underline"
          >
            {t('smartResumeLink')}
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className="text-foreground underline-offset-4 hover:underline"
          >
            {t('cerebryxLink')}
          </Link>
        </li>
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </article>
  )
}
