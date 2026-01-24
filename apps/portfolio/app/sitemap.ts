import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { getAllPosts } from '@/lib/blog'
import { locales } from '@/i18n/config'
import { projectContentService } from '@/lib/services/project-content-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url
  const entries: MetadataRoute.Sitemap = []

  // Add home pages for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    })

    // Add blog index page for each locale
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    // Add all blog posts for each locale
    try {
      const posts = await getAllPosts(locale)
      for (const post of posts) {
        entries.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    } catch {
      // If blog posts can't be loaded, continue without them
    }

    // Add all projects for each locale
    try {
      const projects = await projectContentService.getAllProjects(locale)
      for (const project of projects) {
        entries.push({
          url: `${baseUrl}/${locale}/projects/${project.project_id}`,
          lastModified: new Date(project.updated_at || project.created_at),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    } catch {
      // If projects can't be loaded, continue without them
    }
  }

  return entries
}
