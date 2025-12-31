import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSectionServer } from '@/components/sections/ProjectsSectionServer'
import { StageSection } from '@/components/sections/StageSection'
import { TimelineSectionServer } from '@/components/sections/TimelineSectionServer'
import { AboutSection } from '@/components/sections/AboutSection'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'

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
      <SiteHeader />
      <HeroSection />
      <main className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
        <ProjectsSectionServer locale={locale} />
        <StageSection locale={locale} />
        <TimelineSectionServer locale={locale} />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}


