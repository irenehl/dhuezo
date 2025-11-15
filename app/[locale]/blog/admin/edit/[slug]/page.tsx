import { PageWrapper } from '@/components/layout/PageWrapper'
import { BlogPostEditor } from '@/components/blog/admin/BlogPostEditor'
import { blogServiceServer } from '@/lib/services/blog-service-server'
import { requireBlogAdmin } from '@/lib/auth/blog-admin-auth'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  await requireBlogAdmin(locale)

  const categories = await blogServiceServer.getCategories()
  const allPosts = await blogServiceServer.getAllPosts(locale)
  const post = allPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const handleSave = async () => {
    'use server'
    redirect(`/${locale}/blog/admin`)
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Edit Post</h1>
            <p className="text-muted-foreground mt-1">
              Update your blog post
            </p>
          </div>
          <BlogPostEditor
            post={post}
            categories={categories}
            locale={locale as 'en' | 'es'}
            onSave={handleSave}
          />
        </div>
      </div>
    </PageWrapper>
  )
}

