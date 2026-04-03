/**
 * Projects Configuration
 *
 * Used only when markdown under `content/projects/` is unavailable (build/dev without content).
 * Keep empty in production so the home page does not show placeholder titles or fake URLs.
 *
 * Add entries here if you need offline fallback; each entry still expects keys in messages under `projects.project{id}`.
 */

export interface ProjectConfig {
  id: string
  number: string
  previewImage: string
  deployedUrl?: string
  repoUrl?: string
  featured?: boolean
}

export const projectsConfig: ProjectConfig[] = []

export function getFeaturedProjects(): ProjectConfig[] {
  return projectsConfig.filter((project) => project.featured !== false)
}
