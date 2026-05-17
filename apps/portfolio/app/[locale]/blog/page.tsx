import Link from 'next/link'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import { Footer } from '@/components/layout/footer'
import { SiteHeader } from '@/components/layout/site-header'
import { formatDate } from '@/lib/blog'
import { siteConfig } from '@/lib/config'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'
import { getPublishedPostsWithMeta } from '@/lib/services/blog-helpers'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'site' })
  const rawKeywords = t.raw('keywords')
  const keywords = Array.isArray(rawKeywords)
    ? rawKeywords.filter((k): k is string => typeof k === 'string')
    : undefined
  const blogUrl = `${siteConfig.url}/${locale}/blog`

  return generateSiteMetadata({
    locale,
    title: t('blogIndexTitle'),
    description: t('blogIndexDescription'),
    url: blogUrl,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
  })
}

export default async function BlogPage(): Promise<JSX.Element> {
  const locale = await getLocale()
  const [tList, tHeader] = await Promise.all([
    getTranslations('blog.list'),
    getTranslations('blog.header'),
  ])
  const posts = await getPublishedPostsWithMeta(locale, 100)

  const latestPost = posts[0]
  const hasPosts = posts.length > 0

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-12 w-full">
        <section className="mb-8 space-y-6 animate-in fade-in-50 duration-500">
          <header className="space-y-3">
            <h1 className="font-header text-4xl md:text-5xl tracking-tight text-foreground">
              <span className="text-foreground">Reputation</span>{' '}
              <span className="text-accent">{tHeader('titleSuffix')}</span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {tHeader('description')}
            </p>
          </header>

          <nav className="flex items-center gap-6 text-sm">
            <Link
              href={`/${locale}`}
              className="border-b border-transparent pb-1 text-muted-foreground transition-colors hover:text-foreground hover:border-border"
            >
              {tHeader('nav.home')}
            </Link>
            <Link
              href={`/${locale}/blog`}
              aria-current="page"
              className="border-b border-accent pb-1 text-foreground"
            >
              {tHeader('nav.blog')}
            </Link>
          </nav>

          {hasPosts && (
            <div className="flex flex-wrap gap-4 text-[0.7rem] font-mono text-muted-foreground/80">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{tHeader('meta.posts', { count: posts.length })}</span>
              </span>
              {latestPost && (
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-border" />
                  <span>
                    {tHeader('meta.updated', {
                      date: formatDate(latestPost.created_at, locale),
                    })}
                  </span>
                </span>
              )}
            </div>
          )}
        </section>

        <div className="mb-6 h-px w-full bg-border/60" />

        <div className="space-y-0">
          {!hasPosts ? (
            <p className="text-muted-foreground">{tList('noPosts')}</p>
          ) : (
            posts.map((post) => (
              <article
                className="group relative border-border/60 border-t py-5 first:border-t-0 first:pt-0 transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/40 animate-in fade-in-50"
                key={post.id}
              >
                <Link
                  className="block space-y-1.5"
                  href={`/${locale}/blog/${post.slug}`}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h2 className="font-display font-medium text-base text-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <time className="font-mono text-xs text-muted-foreground/60">
                        {formatDate(post.created_at, locale)}
                      </time>
                      {post.readingTimeText && (
                        <>
                          <span className="h-2.5 w-px bg-border/60" />
                          <span className="font-mono text-xs text-muted-foreground/60">
                            {post.readingTimeText}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {post.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.description}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <span
                          className="font-mono text-xs text-accent/70"
                          key={tag}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))
          )}
        </div>
      </main>
      <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
        <div className="border-t border-border/40 pt-8">
          <Footer />
        </div>
      </div>
    </div>
  )
}

