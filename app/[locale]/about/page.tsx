import { PageWrapper } from '@/components/layout/PageWrapper'
import { getTranslations } from 'next-intl/server'

export default async function About() {
  const t = await getTranslations()
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <h1 className="text-4xl font-bold">{t('about.title')}</h1>
        <p className="mt-4 text-muted-foreground">
          {t('about.description')}
        </p>
      </div>
    </PageWrapper>
  )
}

