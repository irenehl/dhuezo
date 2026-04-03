import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import {
  ProjectsSectionSkeleton,
  StageSectionSkeleton,
  TimelineSectionSkeleton,
} from '@/components/sections/HomePageSkeletons'
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
    title: 'Daniela Huezo - Software Engineer | Cursor Ambassador',
    description:
      'Software Engineer and Cursor Ambassador. Crafting resilient systems and delightful interfaces for products that scale. Explore my projects, talks, and experience.',
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
      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSectionServer locale={locale} />
      </Suspense>
      <SkillsSection />
      <Suspense fallback={<TimelineSectionSkeleton />}>
        <TimelineSectionServer locale={locale} />
      </Suspense>
      <Suspense fallback={<StageSectionSkeleton />}>
        <StageSection locale={locale} />
      </Suspense>
      <AboutSection />
      <Footer />
    </>
  )
}


