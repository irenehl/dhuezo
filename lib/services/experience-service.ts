import { createClient } from '@/lib/supabase/client'
import type { Experience } from '@/types/experience'

const supabase = createClient()

export const experienceService = {
  // Obtener todas las experiencias
  async getAllExperiences(): Promise<Experience[]> {
    // Return mock data if Supabase is not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      return [
        {
          id: '1',
          title: 'Senior Full Stack Developer',
          company: 'TechCorp Inc.',
          description: 'Lideré el desarrollo de aplicaciones web escalables usando tecnologías modernas.',
          long_description: 'En mi rol como Senior Full Stack Developer, lideré un equipo de 5 desarrolladores en la creación de una plataforma SaaS que alcanzó más de 10,000 usuarios activos. Implementé arquitecturas de microservicios, optimicé el rendimiento de la base de datos y establecí prácticas de CI/CD que redujeron el tiempo de despliegue en un 60%.',
          technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
          start_date: '2022-01-01',
          end_date: null,
          image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
          company_logo: null,
          location: 'San Francisco, CA',
          type: 'full-time',
          featured: true,
          order_index: 1,
          created_at: '2022-01-01T00:00:00Z',
          updated_at: '2022-01-01T00:00:00Z'
        },
        {
          id: '2',
          title: 'Frontend Developer',
          company: 'StartupXYZ',
          description: 'Desarrollé interfaces de usuario modernas y responsivas para aplicaciones web.',
          long_description: 'Como Frontend Developer, transformé diseños de Figma en componentes React reutilizables y optimizados. Implementé animaciones suaves con Framer Motion, mejoré la accesibilidad web siguiendo estándares WCAG 2.1, y reduje el tiempo de carga de la página en un 40% mediante técnicas de optimización.',
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          start_date: '2020-06-01',
          end_date: '2021-12-31',
          image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
          company_logo: null,
          location: 'Remote',
          type: 'full-time',
          featured: true,
          order_index: 2,
          created_at: '2020-06-01T00:00:00Z',
          updated_at: '2021-12-31T00:00:00Z'
        }
      ]
    }

    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching experiences:', error)
      return []
    }

    return data as Experience[]
  },

  // Obtener experiencias destacadas
  async getFeaturedExperiences(): Promise<Experience[]> {
    const allExperiences = await this.getAllExperiences()
    return allExperiences.filter(exp => exp.featured)
  },

  // Obtener una experiencia por ID
  async getExperienceById(id: string): Promise<Experience | null> {
    const allExperiences = await this.getAllExperiences()
    return allExperiences.find(exp => exp.id === id) || null
  },
}
