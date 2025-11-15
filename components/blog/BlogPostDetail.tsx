'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { MarkdownViewer } from './MarkdownViewer'
import { BlogImageCarousel } from './BlogImageCarousel'
import { blogService } from '@/lib/services/blog-service'
import type { BlogPost, BlogPostImage } from '@/types/blog'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

interface BlogPostDetailProps {
  post: BlogPost
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  const locale = useLocale()
  const date = post.published_at ? new Date(post.published_at) : new Date(post.created_at)
  const [images, setImages] = useState<BlogPostImage[]>([])
  const [loadingImages, setLoadingImages] = useState(true)

  useEffect(() => {
    const loadImages = async () => {
      if (post.id) {
        try {
          const postImages = await blogService.getPostImages(post.id)
          setImages(postImages)
        } catch (error) {
          console.error('Error loading images:', error)
        } finally {
          setLoadingImages(false)
        }
      } else {
        setLoadingImages(false)
      }
    }

    loadImages()
  }, [post.id])

  return (
    <article className="space-y-6">
      {/* Featured Image - First thing visitors see */}
      {post.featured_image_url && (
        <div className="relative w-full h-48 sm:h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{post.title}</h1>

      {/* Description */}
      <p className="text-lg sm:text-xl text-muted-foreground">{post.description}</p>

      {/* Categories and Date */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {post.categories && post.categories.map((category) => (
          <Badge key={category.id} variant="secondary">
            {locale === 'es' ? category.name_es : category.name_en}
          </Badge>
        ))}
        <span>•</span>
        <time dateTime={date.toISOString()}>
          {format(date, 'PP', { locale: locale === 'es' ? es : enUS })}
        </time>
      </div>

      {/* Image Carousel */}
      {loadingImages ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : images.length > 0 ? (
        <BlogImageCarousel images={images} />
      ) : null}

      {/* Content - Rich text with images integrated */}
      <div className="mt-8">
        <MarkdownViewer content={post.content} />
      </div>
    </article>
  )
}

