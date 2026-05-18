import { Footer } from '@/components/layout/footer'
import { MinimalHeroSection } from '@/components/sections/minimal-hero-section'
import { SiteJsonLd } from '@/components/seo/site-json-ld'
import { PageTransition } from '@/components/layout/page-transition'

export default async function HubLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}): Promise<JSX.Element> {
  const { locale } = await params

  return (
    <>
      <SiteJsonLd locale={locale} />
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20 md:px-8">
        <MinimalHeroSection locale={locale} />
        <main id="main-content" className="mt-12 md:mt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <div className="mt-16">
          <Footer locale={locale} />
        </div>
      </div>
    </>
  )
}
