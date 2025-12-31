import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSectionServer } from '@/components/sections/ProjectsSectionServer'
import { StageSection } from '@/components/sections/StageSection'
import { TimelineSectionServer } from '@/components/sections/TimelineSectionServer'
import { AboutSection } from '@/components/sections/AboutSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <main className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
        <ProjectsSectionServer />
        <StageSection />
        <TimelineSectionServer />
        <AboutSection />
      </main>
    </>
  )
}


