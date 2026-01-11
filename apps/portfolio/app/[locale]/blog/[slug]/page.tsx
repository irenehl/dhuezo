import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'

import { PostBody } from '@/components/blog/PostBody'
import { PostToc } from '@/components/blog/PostToc'
import { Footer } from '@/components/layout/Footer'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { formatDate, getAllPosts, getPostBySlug } from '@/lib/blog'
import { siteConfig } from '@/lib/config'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'
import { getPublishedPostsWithMeta } from '@/lib/services/blog-helpers'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const postsEn = await getAllPosts('en')
  const postsEs = await getAllPosts('es')
  
  return [
    ...postsEn.map((post) => ({
      slug: post.slug,
      locale: 'en',
    })),
    ...postsEs.map((post) => ({
      slug: post.slug,
      locale: 'es',
    })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await getPostBySlug(slug, locale as 'en' | 'es')

  if (!post) {
    return generateSiteMetadata({
      locale,
      title: `Post Not Found | ${siteConfig.name}`,
    })
  }

  const postUrl = `${siteConfig.url}/${locale}/blog/${slug}`
  const description = post.description || `Read ${post.title}`
  
  // Use featured image if available, otherwise let the helper generate dynamic OG image
  const image = post.featured_image_url || undefined

  return generateSiteMetadata({
    locale,
    title: post.title,
    description,
    url: postUrl,
    type: 'article',
    publishedTime: post.created_at,
    modifiedTime: post.updated_at,
    image, // Will use dynamic OG if undefined
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params
  const localeValue = locale as 'en' | 'es'
  const t = await getTranslations('blog.post')
  const post = await getPostBySlug(slug, localeValue)

  if (!post) {
    notFound()
  }

  // Get enriched post with tags and reading time
  const allPosts = await getPublishedPostsWithMeta(localeValue, 100)
  const enrichedPost = allPosts.find((p) => p.slug === slug)

  const postUrl = `${siteConfig.url}/${locale}/blog/${slug}`

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-12 w-full">
        <article className="space-y-10 animate-in fade-in-50 duration-500" id="blog-post">
          <header className="space-y-4">
            <div className="flex items-center justify-between">
              <Link
                className="inline-block font-mono text-accent text-xs transition-colors hover:text-accent/80"
                href={`/${locale}/blog`}
              >
                {t('backToBlog')}
              </Link>
            </div>
            <h1 className="font-display font-semibold text-3xl text-foreground tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <time className="font-mono text-muted-foreground text-xs">
                {formatDate(post.created_at, locale)}
              </time>
              {enrichedPost?.readingTimeText && (
                <>
                  <span className="h-3 w-px bg-border" />
                  <span className="font-mono text-muted-foreground text-xs">
                    {enrichedPost.readingTimeText}
                  </span>
                </>
              )}
              {enrichedPost?.tags && enrichedPost.tags.length > 0 && (
                <>
                  <span className="h-3 w-px bg-border" />
                  <div className="flex gap-2">
                    {enrichedPost.tags.map((tag) => (
                      <span
                        className="font-mono text-accent/70 text-xs"
                        key={tag}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          {post.featured_image_url && (
            <div className="group relative aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          <PostBody
            contentHtml={post.content}
            className="animate-in fade-in-50 duration-500"
          />

          <footer className="border-border/60 border-t pt-8">
            <Link
              className="inline-block font-mono text-accent text-xs transition-colors hover:text-accent/80"
              href={`/${locale}/blog`}
            >
              {t('backToBlogFooter')}
            </Link>
          </footer>
        </article>
      </main>
      <PostToc contentHtml={post.content} />
      <Footer />

      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description || `Read ${post.title}`,
            ...(post.featured_image_url && { image: post.featured_image_url }),
            datePublished: post.created_at,
            dateModified: post.updated_at,
            author: {
              '@type': 'Person',
              name: siteConfig.name,
              url: siteConfig.url,
            },
            publisher: {
              '@type': 'Organization',
              name: siteConfig.name,
              url: siteConfig.url,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': postUrl,
            },
          }),
        }}
        type="application/ld+json"
      />
    </div>
  )
}

