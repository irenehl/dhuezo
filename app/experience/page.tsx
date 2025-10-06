import { PageWrapper } from '@/components/layout/PageWrapper'
import { ExperienceGrid } from '@/components/experience/ExperienceGrid'

export const metadata = {
  title: 'Experiencia',
  description: 'Mi experiencia profesional en desarrollo de software',
}

export default function ExperiencePage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Mi Experiencia
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un recorrido por los proyectos y roles que han dado forma a mi carrera en desarrollo de software
          </p>
        </div>

        {/* Experience Grid */}
        <ExperienceGrid />
      </div>
    </PageWrapper>
  )
}
