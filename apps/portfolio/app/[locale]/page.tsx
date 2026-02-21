import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSectionServer } from '@/components/sections/ProjectsSectionServer'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { StageSection } from '@/components/sections/StageSection'
import { TimelineSectionServer } from '@/components/sections/TimelineSectionServer'
import { AboutSection } from '@/components/sections/AboutSection'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'
import { SiteJsonLd } from '@/components/seo/SiteJsonLd'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return generateSiteMetadata({
    locale,
    title: 'Daniela Huezo - Full Stack Developer',
    description:
      'Full-stack engineer building resilient systems and dramatic interfaces. Explore my projects, talks, and experience.',
    image: '/og-image.png', // Use static OG image for home page
  })
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <SiteJsonLd locale={locale} />
      <SiteHeader />
      <HeroSection />
      <ProjectsSectionServer locale={locale} />
      <SkillsSection />
      <main className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
        <TimelineSectionServer locale={locale} />
        <StageSection locale={locale} />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}


