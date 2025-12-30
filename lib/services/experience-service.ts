import type { Experience } from '@/types/experience'

export const experienceService = {
  // Obtener todas las experiencias
  async getAllExperiences(): Promise<Experience[]> {
    return []
  },

  // Obtener experiencias destacadas
  async getFeaturedExperiences(): Promise<Experience[]> {
    return []
  },

  // Obtener una experiencia por ID
  async getExperienceById(id: string): Promise<Experience | null> {
    return null
  },
}
