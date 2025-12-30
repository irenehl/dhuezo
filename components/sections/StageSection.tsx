import { getLocale } from 'next-intl/server'
import { StageSectionClient } from './StageSectionClient'
import { blogServiceServer } from '@/lib/services/blog-service-server'
import type { BlogPost } from '@/types/blog'

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

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }).toUpperCase()
  } catch {
    return dateString
  }
}

export async function StageSection() {
  const locale = await getLocale()
  const posts = await blogServiceServer.getStageEntries(locale, 10)

  const stageEntries: StageEntry[] = posts
    .filter((post) => post.stage_type)
    .map((post: BlogPost) => ({
      id: post.id,
      date: formatDate(post.event_date || post.published_at),
      type: (post.stage_type as 'talk' | 'article' | 'slide') || 'article',
      eventLocation: post.event_location || undefined,
      title: post.title,
      description: post.description,
      ctaLabel: post.cta_label || 'Read',
      ctaUrl: post.cta_url || `/${locale}/blog/${post.slug}`,
    }))

  return <StageSectionClient entries={stageEntries} />
}

