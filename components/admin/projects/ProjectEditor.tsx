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
import { createProjectAction, updateProjectAction } from '@/app/[locale]/admin/_actions/projects'
import { translateProjectContentAction } from '@/app/[locale]/admin/_actions/translation'
import type { Project } from '@/types/project'
import { X, Languages } from 'lucide-react'

interface ProjectEditorProps {
  project?: Project
  locale: string
  onClose: () => void
  onSuccess: (project: Project) => void
}

export function ProjectEditor({
  project,
  locale,
  onClose,
  onSuccess,
}: ProjectEditorProps) {
  const [isPending, startTransition] = useTransition()
  const [isTranslating, setIsTranslating] = useState(false)
  const { toast } = useToast()
  const [activeLocale, setActiveLocale] = useState<'en' | 'es'>(locale as 'en' | 'es')

  // Shared fields
  const [projectId, setProjectId] = useState(project?.project_id || '')
  const [orderIndex, setOrderIndex] = useState(project?.order_index || 0)
  const [previewImageUrl, setPreviewImageUrl] = useState(project?.preview_image_url || '')
  const [deployedUrl, setDeployedUrl] = useState(project?.deployed_url || '')
  const [repoUrl, setRepoUrl] = useState(project?.repo_url || '')
  const [featured, setFeatured] = useState(project?.featured ?? true)

  // Localized fields
  const [enTitle, setEnTitle] = useState('')
  const [enDescription, setEnDescription] = useState('')
  const [enTags, setEnTags] = useState<string[]>([])
  const [enTagInput, setEnTagInput] = useState('')

  const [esTitle, setEsTitle] = useState('')
  const [esDescription, setEsDescription] = useState('')
  const [esTags, setEsTags] = useState<string[]>([])
  const [esTagInput, setEsTagInput] = useState('')

  // Initialize from project if editing
  React.useEffect(() => {
    if (project) {
      if (project.locale === 'en') {
        setEnTitle(project.title)
        setEnDescription(project.description)
        setEnTags(project.tags)
      } else {
        setEsTitle(project.title)
        setEsDescription(project.description)
        setEsTags(project.tags)
      }
    }
  }, [project])

  const handleAddTag = (locale: 'en' | 'es') => {
    const input = locale === 'en' ? enTagInput : esTagInput
    if (!input.trim()) return

    if (locale === 'en') {
      setEnTags([...enTags, input.trim()])
      setEnTagInput('')
    } else {
      setEsTags([...esTags, input.trim()])
      setEsTagInput('')
    }
  }

  const handleRemoveTag = (locale: 'en' | 'es', index: number) => {
    if (locale === 'en') {
      setEnTags(enTags.filter((_, i) => i !== index))
    } else {
      setEsTags(esTags.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (targetLocale: 'en' | 'es') => {
    if (!projectId.trim()) {
      toast({
        title: 'Error',
        description: 'Project ID is required',
        variant: 'destructive',
      })
      return
    }

    const title = targetLocale === 'en' ? enTitle : esTitle
    const description = targetLocale === 'en' ? enDescription : esDescription
    const tags = targetLocale === 'en' ? enTags : esTags

    if (!title.trim() || !description.trim()) {
      toast({
        title: 'Error',
        description: 'Title and description are required',
        variant: 'destructive',
      })
      return
    }

    startTransition(async () => {
      try {
        if (project && project.locale === targetLocale) {
          // Update existing
          const updated = await updateProjectAction(project.id, {
            order_index: orderIndex,
            preview_image_url: previewImageUrl,
            deployed_url: deployedUrl || null,
            repo_url: repoUrl || null,
            featured,
            title,
            description,
            tags,
          })

          if (updated) {
            toast({
              title: 'Project updated',
              description: 'The project has been updated successfully.',
            })
            onSuccess(updated)
          }
        } else {
          // Create new
          const created = await createProjectAction({
            project_id: projectId,
            locale: targetLocale,
            order_index: orderIndex,
            preview_image_url: previewImageUrl,
            deployed_url: deployedUrl || null,
            repo_url: repoUrl || null,
            featured,
            title,
            description,
            tags,
          })

          if (created) {
            toast({
              title: 'Project created',
              description: 'The project has been created successfully.',
            })
            onSuccess(created)
          }
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to save project',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-zinc-100">
              {project ? 'Edit Project' : 'New Project'}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Shared fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectId">Project ID</Label>
              <Input
                id="projectId"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                disabled={!!project}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderIndex">Order Index</Label>
              <Input
                id="orderIndex"
                type="number"
                value={orderIndex}
                onChange={(e) => setOrderIndex(Number(e.target.value))}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="previewImageUrl">Preview Image URL</Label>
            <Input
              id="previewImageUrl"
              value={previewImageUrl}
              onChange={(e) => setPreviewImageUrl(e.target.value)}
              className="bg-zinc-900 border-zinc-800 text-zinc-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deployedUrl">Deployed URL</Label>
              <Input
                id="deployedUrl"
                value={deployedUrl}
                onChange={(e) => setDeployedUrl(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repoUrl">Repo URL</Label>
              <Input
                id="repoUrl"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-zinc-100"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={setFeatured}
            />
            <Label htmlFor="featured">Featured</Label>
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
                  rows={4}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enTags">Tags</Label>
                  {enTitle && enDescription && enTags.length > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          setIsTranslating(true)
                          try {
                            const translated = await translateProjectContentAction({
                              from: 'en',
                              to: 'es',
                              title: enTitle,
                              description: enDescription,
                              tags: enTags,
                            })
                            setEsTitle(translated.title)
                            setEsDescription(translated.description)
                            setEsTags(translated.tags)
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
                </div>
                <div className="flex gap-2">
                  <Input
                    id="enTags"
                    value={enTagInput}
                    onChange={(e) => setEnTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag('en')
                      }
                    }}
                    placeholder="Add a tag"
                    className="bg-zinc-900 border-zinc-800 text-zinc-100"
                  />
                  <Button type="button" onClick={() => handleAddTag('en')}>
                    Add
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {enTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-sm bg-zinc-800 text-zinc-300 rounded flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag('en', idx)}
                        className="text-zinc-400 hover:text-zinc-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => handleSubmit('en')}
                disabled={isPending}
                className="w-full"
              >
                {isPending ? 'Saving...' : project ? 'Update EN' : 'Create EN'}
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
                  rows={4}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="esTags">Etiquetas</Label>
                  {esTitle && esDescription && esTags.length > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          setIsTranslating(true)
                          try {
                            const translated = await translateProjectContentAction({
                              from: 'es',
                              to: 'en',
                              title: esTitle,
                              description: esDescription,
                              tags: esTags,
                            })
                            setEnTitle(translated.title)
                            setEnDescription(translated.description)
                            setEnTags(translated.tags)
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
                </div>
                <div className="flex gap-2">
                  <Input
                    id="esTags"
                    value={esTagInput}
                    onChange={(e) => setEsTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag('es')
                      }
                    }}
                    placeholder="Agregar etiqueta"
                    className="bg-zinc-900 border-zinc-800 text-zinc-100"
                  />
                  <Button type="button" onClick={() => handleAddTag('es')}>
                    Agregar
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {esTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-sm bg-zinc-800 text-zinc-300 rounded flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag('es', idx)}
                        className="text-zinc-400 hover:text-zinc-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => handleSubmit('es')}
                disabled={isPending}
                className="w-full"
              >
                {isPending ? 'Guardando...' : project ? 'Actualizar ES' : 'Crear ES'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

