import { getLocale } from 'next-intl/server'
import { StageSectionClient } from './StageSectionClient'
import { getPostsByStageType } from '@/lib/services/blog-helpers'
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

export async function StageSection() {
  const locale = await getLocale()
  
  // Get all stage types of posts
  const talks = await getPostsByStageType(locale, 'talk')
  const articles = await getPostsByStageType(locale, 'article')
  const slides = await getPostsByStageType(locale, 'slide')
  
  // Combine and sort by date
  const allStagePosts = [...talks, ...articles, ...slides].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

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

