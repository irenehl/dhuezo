'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ImageUploader } from './ImageUploader'
import { BlogImageCarouselUploader } from './BlogImageCarouselUploader'
import { RichTextEditor } from './RichTextEditor'
import type { BlogPost, BlogCategory } from '@/types/blog'
import { blogService } from '@/lib/services/blog-service'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

interface BlogPostEditorProps {
  post?: BlogPost
  categories: BlogCategory[]
  locale: 'en' | 'es'
  onSave?: (post: BlogPost) => void
}

export function BlogPostEditor({
  post,
  categories,
  locale,
  onSave,
}: BlogPostEditorProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [description, setDescription] = useState(post?.description || '')
  const [content, setContent] = useState(post?.content || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    post?.categories?.map((c) => c.id) || []
  )
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(
    post?.featured_image_url || null
  )
  const [published, setPublished] = useState(post?.published || false)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { theme } = useTheme()

  // Generate slug from title
  useEffect(() => {
    if (!post && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setSlug(generatedSlug)
    }
  }, [title, post])

  const handleImageUploaded = (url: string) => {
    setFeaturedImageUrl(url)
    // Insert image markdown into content at cursor position
    const imageMarkdown = `![Image](${url})\n\n`
    setContent((prev) => prev + imageMarkdown)
  }

  const handleSave = async () => {
    if (!title || !description || !content || !slug) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setSaving(true)
    try {
      let savedPost: BlogPost | null = null

      if (post) {
        // Update existing post
        savedPost = await blogService.updatePost(post.id, {
          title,
          description,
          content,
          slug,
          featured_image_url: featuredImageUrl,
          category_ids: selectedCategories,
          published,
        })
      } else {
        // Create new post
        savedPost = await blogService.createPost({
          title,
          description,
          content,
          slug,
          locale,
          featured_image_url: featuredImageUrl,
          category_ids: selectedCategories,
          published,
        })
      }

      if (savedPost) {
        toast({
          title: 'Success',
          description: post ? 'Post updated successfully' : 'Post created successfully',
        })
        onSave?.(savedPost)
        // Redirect after a short delay
        setTimeout(() => {
          router.push(`/${locale}/blog/admin`)
        }, 1000)
      } else {
        throw new Error('Save failed - no post returned')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to save post'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-url-slug"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Brief description of the post (supports markdown)"
            />
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategories.includes(category.id)
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(category.id)
                        ? prev.filter((id) => id !== category.id)
                        : [...prev, category.id]
                    )
                  }}
                >
                  {locale === 'es' ? category.name_es : category.name_en}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="published">Publish post</Label>
          </div>
        </CardContent>
      </Card>

      {/* Media */}
      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Featured Image</Label>
            <ImageUploader
              postId={post?.id}
              onImageUploaded={handleImageUploaded}
            />
            {featuredImageUrl && (
              <div className="mt-2 text-sm text-muted-foreground">
                Current: {featuredImageUrl}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Blog Image Carousel</Label>
            <BlogImageCarouselUploader postId={post?.id} />
          </div>
        </CardContent>
      </Card>

      {/* Content Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your markdown content here..."
            minHeight="400px"
          />
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </div>
  )
}

