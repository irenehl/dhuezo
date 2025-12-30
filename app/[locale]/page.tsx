import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { StageSection } from '@/components/sections/StageSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { AboutSection } from '@/components/sections/AboutSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <main className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
        <ProjectsSection />
        <StageSection />
        <TimelineSection />
        <AboutSection />
      </main>
    </>
  )
}


