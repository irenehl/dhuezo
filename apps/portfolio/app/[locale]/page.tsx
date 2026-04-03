import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
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
import { SpecTeaserSection } from '@/components/sections/SpecTeaserSection'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'
import { SiteJsonLd } from '@/components/seo/SiteJsonLd'
import { HomeScrollRail } from '@/components/layout/HomeScrollRail'
import {
  HOME_SCROLL_SECTION_IDS,
  type HomeScrollSectionId,
} from '@/lib/home-scroll-sections'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'site' })
  return generateSiteMetadata({
    locale,
    title: t('homeTitle'),
    description: t('homeDescription'),
    image: '/og-image.png', // Use static OG image for home page
  })
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const tRail = await getTranslations({ locale, namespace: 'scrollRail' })
  const sectionLabels = HOME_SCROLL_SECTION_IDS.reduce(
    (acc, id) => {
      acc[id] = tRail(`sections.${id}`)
      return acc
    },
    {} as Record<HomeScrollSectionId, string>,
  )

  return (
    <>
      <SiteJsonLd locale={locale} />
      <SiteHeader variant="minimal" />
      <HomeScrollRail
        ariaLabel={tRail('ariaLabel')}
        sectionLabels={sectionLabels}
      />
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
      <SpecTeaserSection />
      <AboutSection />
      <Footer />
    </>
  )
}


