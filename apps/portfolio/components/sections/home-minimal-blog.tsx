import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/routing'
import { formatDate } from '@/lib/blog'
import { getPublishedPostsWithMeta } from '@/lib/services/blog-helpers'

export async function HomeMinimalBlog({
  locale,
}: {
  locale: string
}): Promise<JSX.Element> {
  const localeValue = locale as 'en' | 'es'
  const t = await getTranslations({ locale, namespace: 'blog' })
  const posts = await getPublishedPostsWithMeta(localeValue, 100)
  const latestPost = posts[0]
  const hasPosts = posts.length > 0

  return (
    <section id="blog" className="scroll-mt-header">
      <div className="w-full animate-in fade-in-50 duration-500">
        <div className="mb-8 space-y-6">
          <header className="space-y-3">
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              {t('header.description')}
            </p>
          </header>

          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
          >
            <Link
              href="/"
              className="border-b border-transparent pb-0.5 transition-colors hover:border-border/30 hover:text-foreground"
            >
              {t('header.nav.home')}
            </Link>
            <span className="text-muted-foreground/45" aria-hidden>
              /
            </span>
            <span
              aria-current="page"
              className="border-b border-accent/50 pb-0.5 text-foreground"
            >
              {t('header.nav.blog')}
            </span>
          </nav>

          {hasPosts && (
            <p className="text-[0.7rem] font-mono text-muted-foreground/80">
              <span className="text-muted-foreground/50" aria-hidden>
                •{' '}
              </span>
              {t('header.meta.posts', { count: posts.length })}
              {latestPost && (
                <>
                  <span className="mx-2 text-muted-foreground/40" aria-hidden>
                    •
                  </span>
                  {t('header.meta.updated', {
                    date: formatDate(latestPost.created_at, locale),
                  })}
                </>
              )}
            </p>
          )}
        </div>

        <div className="mb-6 h-px w-full bg-border/28" />

        <div className="space-y-0">
          {!hasPosts ? (
            <p className="text-muted-foreground">{t('list.noPosts')}</p>
          ) : (
            posts.map((post) => (
              <article
                className="group relative border-border/26 border-t py-5 first:border-t-0 first:pt-0 transition-colors duration-300 hover:bg-muted/30"
                key={post.id}
              >
                <Link
                  className="block space-y-1.5"
                  href={`/blog/${post.slug}`}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-body text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                      <time
                        dateTime={post.created_at}
                        className="font-mono text-xs text-muted-foreground/70 tabular-nums"
                      >
                        {formatDate(post.created_at, locale)}
                      </time>
                      {post.readingTimeText && (
                        <>
                          <span
                            className="h-2.5 w-px bg-border/28"
                            aria-hidden
                          />
                          <span className="font-mono text-xs text-muted-foreground/70">
                            {post.readingTimeText}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {post.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                      {post.tags.map((tag) => (
                        <span
                          className="font-mono text-xs text-muted-foreground/70"
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
      </div>
    </section>
  )
}
