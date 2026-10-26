import { getTranslations } from 'next-intl/server'

interface RoleAnswer {
  heading: string
  sentence: string
}

interface FaqItem {
  question: string
  answer: string
}

function isRoleAnswer(value: unknown): value is RoleAnswer {
  if (!value || typeof value !== 'object') {
    return false
  }
  const record = value as Record<string, unknown>
  return typeof record.heading === 'string' && typeof record.sentence === 'string'
}

function isFaqItem(value: unknown): value is FaqItem {
  if (!value || typeof value !== 'object') {
    return false
  }
  const record = value as Record<string, unknown>
  return typeof record.question === 'string' && typeof record.answer === 'string'
}

export async function RolePositioning({
  locale,
}: {
  locale: string
}): Promise<JSX.Element> {
  const t = await getTranslations({ locale, namespace: 'positioning' })
  const rawAnswers = t.raw('answers')
  const rawFaq = t.raw('faq')
  const answers = Array.isArray(rawAnswers) ? rawAnswers.filter(isRoleAnswer) : []
  const faq = Array.isArray(rawFaq) ? rawFaq.filter(isFaqItem) : []

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section id="roles" className="space-y-12">
      <div>
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {t('answersHeading')}
        </h2>
        <ul className="space-y-5">
          {answers.map((item) => (
            <li key={item.heading}>
              <h3 className="text-base font-medium text-foreground">{item.heading}</h3>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                {item.sentence}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div id="faq">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {t('faqHeading')}
        </h2>
        <dl className="space-y-6">
          {faq.map((item) => (
            <div key={item.question}>
              <dt>
                <h3 className="text-base font-medium text-foreground">{item.question}</h3>
              </dt>
              <dd className="mt-1 text-base leading-relaxed text-muted-foreground">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </section>
  )
}
