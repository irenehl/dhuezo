'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { BlogPost } from '@/types/blog'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BlogPostCardProps {
  post: BlogPost
}

const categoryColorMap: Record<string, string> = {
  orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const locale = useLocale()
  const date = post.published_at ? new Date(post.published_at) : new Date(post.created_at)

  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer overflow-hidden flex flex-col">
        {post.featured_image_url && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardHeader className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>{format(date, 'dd MMM', { locale: locale === 'es' ? es : enUS })}</span>
          </div>
          <CardTitle className="text-xl font-bold line-clamp-2 mb-2">{post.title}</CardTitle>
          <CardDescription className="line-clamp-3 mb-4">{post.description}</CardDescription>
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => {
                const categoryName = locale === 'es' ? category.name_es : category.name_en
                const color = category.color || 'orange'
                return (
                  <Badge
                    key={category.id}
                    variant="outline"
                    className={cn(
                      'text-xs',
                      categoryColorMap[color] || categoryColorMap.orange
                    )}
                  >
                    {categoryName}
                  </Badge>
                )
              })}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {format(date, 'PP', { locale: locale === 'es' ? es : enUS })}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

