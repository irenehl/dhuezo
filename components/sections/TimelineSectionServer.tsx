import { getLocale } from 'next-intl/server'
import { experienceService } from '@/lib/services/experience-service'
import { TimelineSection } from './TimelineSection'

export async function TimelineSectionServer() {
  const locale = await getLocale()
  try {
    const experiences = await experienceService.getAllExperiences(locale)
    // Only use Markdown experiences if we have any
    if (experiences.length > 0) {
      return <TimelineSection experiences={experiences} />
    }
  } catch (error) {
    // If Markdown service fails, fall back to translation-based
    console.error('Failed to load Markdown experiences:', error)
  }
  
  // Fallback to translation-based experiences
  return <TimelineSection />
}

