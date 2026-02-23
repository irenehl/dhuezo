import { experienceService } from '@/lib/services/experience-service'
import { TimelineSection } from './TimelineSection'

export async function TimelineSectionServer({ locale }: { locale: string }) {
  try {
    const experiences = await experienceService.getAllExperiences(locale)
    if (experiences.length > 0) {
      return <TimelineSection experiences={experiences} />
    }
  } catch (error) {
    // Fallback to translation-based experiences
  }
  
  return <TimelineSection />
}

