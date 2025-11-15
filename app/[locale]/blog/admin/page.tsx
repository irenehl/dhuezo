import { PageWrapper } from '@/components/layout/PageWrapper'
import { BlogAdminDashboard } from '@/components/blog/admin/BlogAdminDashboard'
import { requireBlogAdmin } from '@/lib/auth/blog-admin-auth'

export default async function BlogAdminPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  await requireBlogAdmin(locale)

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        <BlogAdminDashboard />
      </div>
    </PageWrapper>
  )
}

