import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { PostBody } from '@/components/blog/post-body'
import { PostToc } from '@/components/blog/post-toc'
import { Link } from '@/i18n/routing'
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
  const image = post.featured_image_url || undefined

  return generateSiteMetadata({
    locale,
    title: post.title,
    description,
    url: postUrl,
    type: 'article',
    publishedTime: post.created_at,
    modifiedTime: post.updated_at,
    image,
  })
}

export default async function HubBlogPostPage({ params }: Props) {
  const { slug, locale } = await params
  const localeValue = locale as 'en' | 'es'
  const t = await getTranslations({ locale: localeValue, namespace: 'blog' })
  const post = await getPostBySlug(slug, localeValue)

  if (!post) {
    notFound()
  }

  const allPosts = await getPublishedPostsWithMeta(localeValue, 100)
  const enrichedPost = allPosts.find((p) => p.slug === slug)

  const postUrl = `${siteConfig.url}/${locale}/blog/${slug}`

  return (
    <>
      <div className="w-full animate-in fade-in-50 duration-500 xl:grid xl:grid-cols-[minmax(0,1fr)_11.5rem] xl:gap-12 xl:items-start">
        <article className="min-w-0 space-y-10" id="blog-post">
          <header className="space-y-5">
            <div>
              <Link
                href="/blog"
                className="inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
              >
                {t('post.backToBlog')}
              </Link>
            </div>
            <h1 className="font-header text-[2rem] font-normal leading-tight tracking-tight text-foreground text-balance sm:text-4xl lg:text-[2.55rem]">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-muted-foreground text-xs">
              <time dateTime={post.created_at}>
                {formatDate(post.created_at, locale)}
              </time>
              {enrichedPost?.readingTimeText && (
                <>
                  <span aria-hidden className="text-muted-foreground/35">
                    |
                  </span>
                  <span>{enrichedPost.readingTimeText}</span>
                </>
              )}
              {enrichedPost?.tags && enrichedPost.tags.length > 0 && (
                <>
                  <span aria-hidden className="text-muted-foreground/35">
                    |
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {enrichedPost.tags.map((tag) => (
                      <span className="text-muted-foreground/90" key={tag}>
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
              <Image
                src={post.featured_image_url}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          )}

          <PostBody contentHtml={post.content} />

          <footer className="border-border/30 border-t pt-8">
            <Link
              href="/blog"
              className="inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
            >
              {t('post.backToBlogFooter')}
            </Link>
          </footer>
        </article>

        <PostToc contentHtml={post.content} />
      </div>

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
              '@type': 'Person',
              name: siteConfig.name,
              url: siteConfig.url,
              sameAs: [
                siteConfig.links.github,
                siteConfig.links.linkedin,
                siteConfig.links.luma,
                siteConfig.links.x,
              ],
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': postUrl,
            },
          }),
        }}
        type="application/ld+json"
      />
    </>
  )
}
