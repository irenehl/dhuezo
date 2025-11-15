import { PageWrapper } from '@/components/layout/PageWrapper'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { blogServiceServer } from '@/lib/services/blog-service-server'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()
  return {
    title: t('blog.pageTitle'),
    description: t('blog.pageDescription'),
  }
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { locale } = await params
  const { category: categorySlug } = await searchParams
  const t = await getTranslations()

  const categories = await blogServiceServer.getCategories()
  const posts = await blogServiceServer.getPublishedPosts(
    locale,
    50,
    categorySlug
      ? categories.find((c) => c.slug === categorySlug)?.id
      : undefined
  )

  // Get post counts per category
  const categoryPosts = await Promise.all(
    categories.map(async (category) => {
      const categoryPosts = await blogServiceServer.getPublishedPosts(
        locale,
        100,
        category.id
      )
      return { category, count: categoryPosts.length }
    })
  )

  const categoryColorMap: Record<string, string> = {
    orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 hover:bg-orange-500/20',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <Link
              href={`/${locale}/blog`}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                !categorySlug
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {locale === 'es' ? 'Todos' : 'All'}
            </Link>
            {categories.map((category) => {
              const categoryData = categoryPosts.find(
                (cp) => cp.category.id === category.id
              )
              const count = categoryData?.count || 0
              const isActive = categorySlug === category.slug
              const color = category.color || 'orange'
              const categoryName = locale === 'es' ? category.name_es : category.name_en

              return (
                <Link
                  key={category.id}
                  href={`/${locale}/blog${isActive ? '' : `?category=${category.slug}`}`}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors border',
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : cn(
                          categoryColorMap[color] || categoryColorMap.orange,
                          'cursor-pointer'
                        )
                  )}
                >
                  {categoryName}
                  {count > 0 && (
                    <span className="ml-2 opacity-70">({count})</span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {t('blog.noPosts')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

