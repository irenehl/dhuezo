import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { getAllPosts } from '@/lib/blog'
import { locales } from '@/i18n/config'
import { projectContentService } from '@/lib/services/project-content-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const contentDates: Date[] = []

    let posts: Awaited<ReturnType<typeof getAllPosts>> = []
    try {
      posts = await getAllPosts(locale)
      posts.forEach((post) => {
        contentDates.push(new Date(post.updated_at || post.created_at))
      })
    } catch {
      // Continue if blog posts can't be loaded
    }

    let projects: Awaited<ReturnType<typeof projectContentService.getAllProjects>> = []
    try {
      projects = await projectContentService.getAllProjects(locale)
      projects.forEach((project) => {
        contentDates.push(new Date(project.updated_at || project.created_at))
      })
    } catch {
      // Continue if projects can't be loaded
    }

    const latestContentDate =
      contentDates.length > 0
        ? new Date(Math.max(...contentDates.map((d) => d.getTime())))
        : undefined

    entries.push({
      url: `${baseUrl}/${locale}`,
      ...(latestContentDate && { lastModified: latestContentDate }),
      changeFrequency: 'monthly',
      priority: 1,
    })

    const latestPostDate =
      posts.length > 0
        ? new Date(
            Math.max(
              ...posts.map((p) => new Date(p.updated_at || p.created_at).getTime())
            )
          )
        : undefined
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      ...(latestPostDate && { lastModified: latestPostDate }),
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }

    for (const project of projects) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.project_id}`,
        lastModified: new Date(project.updated_at || project.created_at),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
