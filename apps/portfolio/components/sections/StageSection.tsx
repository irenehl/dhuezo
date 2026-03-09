import { StageSectionClient } from './StageSectionClient'
import { getPublishedPostsWithMeta } from '@/lib/services/blog-helpers'
import { formatDate } from '@/lib/blog'

interface StageEntry {
  id: string
  date: string
  type: 'talk' | 'article' | 'slide'
  eventLocation?: string
  title: string
  description: string
  ctaLabel: string
  ctaUrl?: string
}

export async function StageSection({ locale }: { locale: string }) {
  const allPublishedPosts = await getPublishedPostsWithMeta(locale, 100)

  // Filter stage entries in a single pass to avoid repeated markdown parsing
  const allStagePosts = allPublishedPosts
    .filter(
      (post) =>
        post.stage_type === 'talk' ||
        post.stage_type === 'article' ||
        post.stage_type === 'slide',
    )
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  // Map to StageEntry format
  const stageEntries: StageEntry[] = allStagePosts.map((post) => ({
    id: post.id,
    date: formatDate(post.created_at, locale),
    type: (post.stage_type || 'article') as 'talk' | 'article' | 'slide',
    eventLocation: post.event_location || undefined,
    title: post.title,
    description: post.description,
    ctaLabel: post.cta_label || 'Read more',
    ctaUrl: post.cta_url || `/${locale}/blog/${post.slug}`,
  }))

  return <StageSectionClient entries={stageEntries} />
}

