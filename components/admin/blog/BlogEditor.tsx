'use client'

import React, { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { MarkdownViewer } from '@/components/blog/MarkdownViewer'
import {
  createBlogPostAction,
  updateBlogPostAction,
} from '@/app/[locale]/admin/_actions/blog'
import { translateBlogContentAction } from '@/app/[locale]/admin/_actions/translation'
import type { BlogPost } from '@/types/blog'
import { X, Languages } from 'lucide-react'

interface BlogEditorProps {
  post?: BlogPost
  locale: string
  onClose: () => void
  onSuccess: (post: BlogPost) => void
}

export function BlogEditor({
  post,
  locale,
  onClose,
  onSuccess,
}: BlogEditorProps) {
  const [isPending, startTransition] = useTransition()
  const [isTranslating, setIsTranslating] = useState(false)
  const { toast } = useToast()
  const [activeLocale, setActiveLocale] = useState<'en' | 'es'>(locale as 'en' | 'es')
  const [previewMode, setPreviewMode] = useState(false)

  // Common fields
  const [slug, setSlug] = useState(post?.slug || '')
  const [featuredImageUrl, setFeaturedImageUrl] = useState(post?.featured_image_url || '')
  const [pdfUrl, setPdfUrl] = useState(post?.pdf_url || '')
  const [published, setPublished] = useState(post?.published ?? false)
  const [stageType, setStageType] = useState<'talk' | 'article' | 'slide' | null>(
    post?.stage_type || null
  )
  const [eventLocation, setEventLocation] = useState(post?.event_location || '')
  const [eventDate, setEventDate] = useState(post?.event_date || '')
  const [ctaLabel, setCtaLabel] = useState(post?.cta_label || '')
  const [ctaUrl, setCtaUrl] = useState(post?.cta_url || '')

  // Localized fields
  const [enTitle, setEnTitle] = useState('')
  const [enDescription, setEnDescription] = useState('')
  const [enContent, setEnContent] = useState('')

  const [esTitle, setEsTitle] = useState('')
  const [esDescription, setEsDescription] = useState('')
  const [esContent, setEsContent] = useState('')

  // Initialize from post if editing
  React.useEffect(() => {
    if (post) {
      if (post.locale === 'en') {
        setEnTitle(post.title)
        setEnDescription(post.description)
        setEnContent(post.content)
      } else {
        setEsTitle(post.title)
        setEsDescription(post.description)
        setEsContent(post.content)
      }
    }
  }, [post])

  const handleSubmit = (targetLocale: 'en' | 'es') => {
    if (!slug.trim()) {
      toast({
        title: 'Error',
        description: 'Slug is required',
        variant: 'destructive',
      })
      return
    }

    const title = targetLocale === 'en' ? enTitle : esTitle
    const description = targetLocale === 'en' ? enDescription : esDescription
    const content = targetLocale === 'en' ? enContent : esContent

    if (!title.trim() || !description.trim() || !content.trim()) {
      toast({
        title: 'Error',
        description: 'Title, description, and content are required',
        variant: 'destructive',
      })
      return
    }

    startTransition(async () => {
      try {
        if (post && post.locale === targetLocale) {
          // Update existing
          const updated = await updateBlogPostAction(post.id, {
            slug,
            title,
            description,
            content,
            featured_image_url: featuredImageUrl || null,
            pdf_url: pdfUrl || null,
            published,
            stage_type: stageType,
            event_location: eventLocation || null,
            event_date: eventDate || null,
            cta_label: ctaLabel || null,
            cta_url: ctaUrl || null,
          })

          if (updated) {
            toast({
              title: 'Post updated',
              description: 'The blog post has been updated successfully.',
            })
            onSuccess(updated)
          }
        } else {
          // Create new
          const created = await createBlogPostAction({
            slug,
            locale: targetLocale,
            title,
            description,
            content,
            featured_image_url: featuredImageUrl || null,
            pdf_url: pdfUrl || null,
            published,
            stage_type: stageType,
            event_location: eventLocation || null,
            event_date: eventDate || null,
            cta_label: ctaLabel || null,
            cta_url: ctaUrl || null,
          })

          if (created) {
            toast({
              title: 'Post created',
              description: 'The blog post has been created successfully.',
            })
            onSuccess(created)
          }
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to save post',
          variant: 'destructive',
        })
      }
    })
  }

  const currentTitle = activeLocale === 'en' ? enTitle : esTitle
  const currentDescription = activeLocale === 'en' ? enDescription : esDescription
  const currentContent = activeLocale === 'en' ? enContent : esContent

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-zinc-100">
              {post ? 'Edit Blog Post' : 'New Blog Post'}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6">
          {/* Common fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                disabled={!!post}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImageUrl">Featured Image URL</Label>
              <Input
                id="featuredImageUrl"
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pdfUrl">PDF URL</Label>
            <Input
              id="pdfUrl"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="bg-zinc-900 border-zinc-800 text-zinc-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stageType">Stage Type</Label>
              <select
                id="stageType"
                value={stageType || ''}
                onChange={(e) =>
                  setStageType(
                    (e.target.value as 'talk' | 'article' | 'slide') || null
                  )
                }
                className="flex h-10 w-full rounded-md border border-input bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
              >
                <option value="">None</option>
                <option value="talk">Talk</option>
                <option value="article">Article</option>
                <option value="slide">Slide</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventLocation">Event Location</Label>
              <Input
                id="eventLocation"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Event Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaLabel">CTA Label</Label>
              <Input
                id="ctaLabel"
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaUrl">CTA URL</Label>
            <Input
              id="ctaUrl"
              value={ctaUrl}
              onChange={(e) => setCtaUrl(e.target.value)}
              className="bg-zinc-900 border-zinc-800 text-zinc-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published">Published</Label>
          </div>

          {/* Localized fields */}
          <Tabs value={activeLocale} onValueChange={(v) => setActiveLocale(v as 'en' | 'es')}>
            <TabsList>
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="es">Español</TabsTrigger>
            </TabsList>

            <TabsContent value="en" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="enTitle">Title</Label>
                <Input
                  id="enTitle"
                  value={enTitle}
                  onChange={(e) => setEnTitle(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enDescription">Description</Label>
                <Textarea
                  id="enDescription"
                  value={enDescription}
                  onChange={(e) => setEnDescription(e.target.value)}
                  rows={2}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enContent">Content (Markdown)</Label>
                  <div className="flex gap-2">
                    {enTitle && enDescription && enContent && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          setIsTranslating(true)
                          try {
                            const translated = await translateBlogContentAction({
                              from: 'en',
                              to: 'es',
                              title: enTitle,
                              description: enDescription,
                              content: enContent,
                            })
                            setEsTitle(translated.title)
                            setEsDescription(translated.description)
                            setEsContent(translated.content)
                            toast({
                              title: 'Translation complete',
                              description: 'Spanish content has been generated from English',
                            })
                          } catch (error: any) {
                            toast({
                              title: 'Translation failed',
                              description: error.message || 'Failed to translate content',
                              variant: 'destructive',
                            })
                          } finally {
                            setIsTranslating(false)
                          }
                        }}
                        disabled={isTranslating}
                        className="gap-2"
                      >
                        <Languages className="h-4 w-4" />
                        {isTranslating ? 'Translating...' : 'Generate ES from EN'}
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      {previewMode ? 'Edit' : 'Preview'}
                    </Button>
                  </div>
                </div>
                {previewMode ? (
                  <div className="border border-zinc-800 rounded-md p-4 bg-zinc-900 min-h-[400px]">
                    <MarkdownViewer content={enContent} />
                  </div>
                ) : (
                  <Textarea
                    id="enContent"
                    value={enContent}
                    onChange={(e) => setEnContent(e.target.value)}
                    rows={20}
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 font-mono text-sm"
                  />
                )}
              </div>
              <Button
                onClick={() => handleSubmit('en')}
                disabled={isPending}
                className="w-full"
              >
                {isPending ? 'Saving...' : post ? 'Update EN' : 'Create EN'}
              </Button>
            </TabsContent>

            <TabsContent value="es" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="esTitle">Título</Label>
                <Input
                  id="esTitle"
                  value={esTitle}
                  onChange={(e) => setEsTitle(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="esDescription">Descripción</Label>
                <Textarea
                  id="esDescription"
                  value={esDescription}
                  onChange={(e) => setEsDescription(e.target.value)}
                  rows={2}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="esContent">Contenido (Markdown)</Label>
                  <div className="flex gap-2">
                    {esTitle && esDescription && esContent && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          setIsTranslating(true)
                          try {
                            const translated = await translateBlogContentAction({
                              from: 'es',
                              to: 'en',
                              title: esTitle,
                              description: esDescription,
                              content: esContent,
                            })
                            setEnTitle(translated.title)
                            setEnDescription(translated.description)
                            setEnContent(translated.content)
                            toast({
                              title: 'Traducción completa',
                              description: 'El contenido en inglés ha sido generado desde español',
                            })
                          } catch (error: any) {
                            toast({
                              title: 'Error de traducción',
                              description: error.message || 'Error al traducir contenido',
                              variant: 'destructive',
                            })
                          } finally {
                            setIsTranslating(false)
                          }
                        }}
                        disabled={isTranslating}
                        className="gap-2"
                      >
                        <Languages className="h-4 w-4" />
                        {isTranslating ? 'Traduciendo...' : 'Generar EN desde ES'}
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      {previewMode ? 'Editar' : 'Vista Previa'}
                    </Button>
                  </div>
                </div>
                {previewMode ? (
                  <div className="border border-zinc-800 rounded-md p-4 bg-zinc-900 min-h-[400px]">
                    <MarkdownViewer content={esContent} />
                  </div>
                ) : (
                  <Textarea
                    id="esContent"
                    value={esContent}
                    onChange={(e) => setEsContent(e.target.value)}
                    rows={20}
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 font-mono text-sm"
                  />
                )}
              </div>
              <Button
                onClick={() => handleSubmit('es')}
                disabled={isPending}
                className="w-full"
              >
                {isPending ? 'Guardando...' : post ? 'Actualizar ES' : 'Crear ES'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

