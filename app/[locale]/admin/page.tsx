import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient'
import { blogServiceServer } from '@/lib/services/blog-service-server'
import { projectServiceServer } from '@/lib/services/project-service-server'

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [posts, projects] = await Promise.all([
    blogServiceServer.getAllPosts(locale),
    projectServiceServer.getAllProjects(locale),
  ])

  return (
    <AdminDashboardClient
      locale={locale}
      initialPosts={posts}
      initialProjects={projects}
    />
  )
}

