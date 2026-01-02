/**
 * Projects Configuration
 * 
 * Add your projects here. Each project should have:
 * - id: Unique identifier
 * - number: Display number (e.g., "01", "02")
 * - previewImage: URL to preview image (can be local path in /public or external URL)
 * - deployedUrl: URL to deployed project (optional)
 * - repoUrl: URL to repository (optional)
 * - featured: Whether to show in projects section (default: true)
 * 
 * Translation keys are expected in messages/{locale}.json under projects.project{id}
 */

export interface ProjectConfig {
  id: string
  number: string
  previewImage: string
  deployedUrl?: string
  repoUrl?: string
  featured?: boolean
}

export const projectsConfig: ProjectConfig[] = [
  {
    id: '1',
    number: '01',
    previewImage: '/projects/project-1-preview.jpg', // Add your preview image to /public/projects/
    deployedUrl: 'https://your-deployed-project.com', // Replace with your actual deployed URL
    repoUrl: 'https://github.com/yourusername/project-1', // Replace with your actual repo URL
    featured: true,
  },
  {
    id: '2',
    number: '02',
    previewImage: '/projects/project-2-preview.jpg', // Add your preview image to /public/projects/
    deployedUrl: undefined, // Not deployed yet
    repoUrl: 'https://github.com/yourusername/project-2', // Replace with your actual repo URL
    featured: true,
  },
  {
    id: '3',
    number: '03',
    previewImage: '/projects/project-3-preview.jpg', // Add your preview image to /public/projects/
    deployedUrl: undefined, // Not deployed yet
    repoUrl: 'https://github.com/yourusername/project-3', // Replace with your actual repo URL
    featured: true,
  },
]

// Helper function to get featured projects
export function getFeaturedProjects(): ProjectConfig[] {
  return projectsConfig.filter((project) => project.featured !== false)
}




