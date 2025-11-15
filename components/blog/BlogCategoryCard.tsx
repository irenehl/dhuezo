'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { BlogCategory } from '@/types/blog'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

interface BlogCategoryCardProps {
  category: BlogCategory
  postCount?: number
}

const colorMap: Record<string, string> = {
  orange: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900',
  blue: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900',
  purple: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900',
}

export function BlogCategoryCard({ category, postCount }: BlogCategoryCardProps) {
  const locale = useLocale()
  const name = locale === 'es' ? category.name_es : category.name_en
  const description = locale === 'es' ? category.description_es : category.description_en
  const color = category.color || 'orange'

  return (
    <Link href={`/${locale}/blog?category=${category.slug}`}>
      <Card
        className={cn(
          'h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer',
          colorMap[color] || colorMap.orange
        )}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold uppercase">{name}</CardTitle>
          {description && (
            <CardDescription className="text-base text-foreground/80">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {postCount !== undefined && (
              <span className="text-sm text-muted-foreground">
                {postCount} {postCount === 1 ? 'post' : 'posts'}
              </span>
            )}
            <Button variant="ghost" size="sm" className="gap-2">
              Ver más
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

