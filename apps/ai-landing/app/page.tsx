import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { AmbientBackground } from '@/components/sections/AmbientBackground'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { PhilosophySection } from '@/components/sections/PhilosophySection'
import { TechStackSection } from '@/components/sections/TechStackSection'
import { SupportSection } from '@/components/sections/SupportSection'
import { CTASection } from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 selection:bg-purple-100 dark:selection:bg-purple-900 selection:text-purple-900 dark:selection:text-purple-100 overflow-x-hidden">
      <AmbientBackground />
      <Navigation />
      
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <PhilosophySection />
      <TechStackSection />
      <SupportSection />
      <CTASection />
      
      <Footer />
    </main>
  )
}
