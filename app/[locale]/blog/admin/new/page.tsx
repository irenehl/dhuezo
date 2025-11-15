import { PageWrapper } from '@/components/layout/PageWrapper'
import { BlogPostEditor } from '@/components/blog/admin/BlogPostEditor'
import { blogServiceServer } from '@/lib/services/blog-service-server'
import { requireBlogAdmin } from '@/lib/auth/blog-admin-auth'
import { redirect } from 'next/navigation'

export default async function NewBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  await requireBlogAdmin(locale)
  const categories = await blogServiceServer.getCategories()

  const handleSave = async () => {
    'use server'
    redirect(`/${locale}/blog/admin`)
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <p className="text-muted-foreground mt-1">
              Write and publish a new blog post
            </p>
          </div>
          <BlogPostEditor
            categories={categories}
            locale={locale as 'en' | 'es'}
            onSave={handleSave}
          />
        </div>
      </div>
    </PageWrapper>
  )
}

