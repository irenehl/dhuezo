import { PageWrapper } from '@/components/layout/PageWrapper'
import { BlogPostDetail } from '@/components/blog/BlogPostDetail'
import { blogServiceServer } from '@/lib/services/blog-service-server'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await blogServiceServer.getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = await blogServiceServer.getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <BlogPostDetail post={post} />
        </div>
      </div>
    </PageWrapper>
  )
}

