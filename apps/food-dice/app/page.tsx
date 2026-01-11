import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { SupportSection } from '@/components/sections/SupportSection'
import { CTASection } from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <main className="bg-slate-950 text-slate-50 selection:bg-emerald-400 selection:text-slate-950 overflow-x-hidden">
      <Navigation />

      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <SupportSection />
      <CTASection />

      <Footer />
    </main>
  )
}
