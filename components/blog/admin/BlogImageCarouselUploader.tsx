'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X, Loader2, GripVertical, Save } from 'lucide-react'
import { blogService } from '@/lib/services/blog-service'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import type { BlogPostImage } from '@/types/blog'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface BlogImageCarouselUploaderProps {
  postId?: string
  onImagesChange?: (images: BlogPostImage[]) => void
}

interface ImageItem extends BlogPostImage {
  isUploading?: boolean
  uploadProgress?: number
}

export function BlogImageCarouselUploader({
  postId,
  onImagesChange,
}: BlogImageCarouselUploaderProps) {
  const [images, setImages] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Load existing images when postId is available
  useEffect(() => {
    if (postId) {
      loadImages()
    }
  }, [postId])

  // Ensure multiple attribute is set on the file input
  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('multiple', '')
      // Verify it's set
      console.log('File input multiple attribute:', fileInputRef.current.hasAttribute('multiple'))
      console.log('File input element:', fileInputRef.current.outerHTML)
    }
  }, [postId, images.length])

  const loadImages = async () => {
    if (!postId) return

    setLoading(true)
    try {
      const loadedImages = await blogService.getPostImages(postId)
      setImages(loadedImages.map((img) => ({ ...img, isUploading: false })))
      onImagesChange?.(loadedImages)
    } catch (error) {
      console.error('Error loading images:', error)
      toast({
        title: 'Error',
        description: 'Failed to load images',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const processFiles = async (files: File[]) => {
    if (files.length === 0) return

    if (!postId) {
      toast({
        title: 'Warning',
        description: 'Please save the post first before uploading images',
        variant: 'destructive',
      })
      return
    }

    // Validate file count
    if (images.length + files.length > 20) {
      toast({
        title: 'Error',
        description: `Maximum 20 images allowed. You have ${images.length} images and tried to add ${files.length} more.`,
        variant: 'destructive',
      })
      return
    }

    // Validate files
    const validFiles: File[] = []
    const invalidFiles: string[] = []
    
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        invalidFiles.push(`${file.name} (not an image)`)
        continue
      }

      if (file.size > 10 * 1024 * 1024) {
        invalidFiles.push(`${file.name} (exceeds 10MB)`)
        continue
      }

      validFiles.push(file)
    }

    if (invalidFiles.length > 0) {
      toast({
        title: 'Some files were skipped',
        description: invalidFiles.join(', '),
        variant: 'destructive',
      })
    }

    if (validFiles.length === 0) return

    // Add placeholder images for immediate feedback
    const placeholders: ImageItem[] = validFiles.map((file, index) => ({
      id: `temp-${Date.now()}-${index}`,
      post_id: postId,
      image_url: URL.createObjectURL(file),
      storage_path: '',
      alt_text: null,
      order_index: images.length + index,
      created_at: new Date().toISOString(),
      isUploading: true,
      uploadProgress: 0,
    }))

    setImages((prev) => [...prev, ...placeholders])

    // Upload files
    try {
      const uploadedImages = await blogService.uploadPostImages(validFiles, postId)
      
      // Replace placeholders with uploaded images
      setImages((prev) => {
        const filtered = prev.filter((img) => !img.isUploading)
        return [...filtered, ...uploadedImages.map((img) => ({ ...img, isUploading: false }))]
      })

      toast({
        title: 'Success',
        description: `Uploaded ${uploadedImages.length} image(s)`,
      })

      // Reload to get proper order
      await loadImages()
    } catch (error) {
      // Remove placeholders on error
      setImages((prev) => prev.filter((img) => !img.isUploading))
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    console.log('Files selected:', files.length, files.map(f => f.name))
    
    if (files.length === 0) {
      console.warn('No files selected')
      return
    }
    
    await processFiles(files)
    // Reset file input to allow selecting the same files again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (!postId || images.length >= 20) return

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type.startsWith('image/')
    )
    
    if (files.length > 0) {
      await processFiles(files)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging && postId && images.length < 20) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // Only set dragging to false if we're actually leaving the drop zone
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragging(false)
    }
  }

  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const success = await blogService.deletePostImage(imageId)
      if (success) {
        setImages((prev) => prev.filter((img) => img.id !== imageId))
        onImagesChange?.(images.filter((img) => img.id !== imageId))
        toast({
          title: 'Success',
          description: 'Image deleted',
        })
      } else {
        throw new Error('Delete failed')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive',
      })
    }
  }

  const handleAltTextChange = async (imageId: string, altText: string) => {
    try {
      const success = await blogService.updatePostImageAltText(imageId, altText || null)
      if (success) {
        setImages((prev) =>
          prev.map((img) => (img.id === imageId ? { ...img, alt_text: altText || null } : img))
        )
      }
    } catch (error) {
      console.error('Error updating alt text:', error)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id || !postId) return

    const oldIndex = images.findIndex((img) => img.id === active.id)
    const newIndex = images.findIndex((img) => img.id === over.id)

    const newImages = arrayMove(images, oldIndex, newIndex)
    setImages(newImages)

    // Update order in database
    try {
      const imageIds = newImages.map((img) => img.id)
      await blogService.updatePostImageOrder(postId, imageIds)
      onImagesChange?.(newImages)
    } catch (error) {
      // Revert on error
      setImages(images)
      toast({
        title: 'Error',
        description: 'Failed to update image order',
        variant: 'destructive',
      })
    }
  }

  const handleSave = async () => {
    if (!postId) {
      toast({
        title: 'Warning',
        description: 'Please save the post first',
        variant: 'destructive',
      })
      return
    }

    setSaving(true)
    try {
      // Order is already saved via drag-and-drop, but we can trigger a reload
      await loadImages()
      toast({
        title: 'Success',
        description: 'Images saved',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save images',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Blog Images ({images.length}/20)</Label>
        {postId && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Images
              </>
            )}
          </Button>
        )}
      </div>

      {!postId && (
        <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
          Save the post first to upload images
        </div>
      )}

      {postId && (
        <div className="space-y-2">
          {/* Drag and Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => {
              if (!loading && images.length < 20 && fileInputRef.current) {
                // Ensure multiple attribute is set before clicking
                fileInputRef.current.setAttribute('multiple', '')
                console.log('Opening file picker with multiple selection enabled')
                fileInputRef.current.click()
              }
            }}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${isDragging
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }
              ${images.length >= 20 || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <input
              ref={(el) => {
                fileInputRef.current = el
                if (el) {
                  // Explicitly set multiple attribute
                  el.setAttribute('multiple', '')
                  el.multiple = true
                }
              }}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              disabled={loading || images.length >= 20}
              className="hidden"
              id="image-upload-input"
              aria-label="Select multiple images"
            />
            <div className="flex flex-col items-center gap-3">
              <Upload className={`h-10 w-10 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {isDragging ? 'Drop images here' : 'Click to select multiple images or drag them here'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Select multiple images at once (max 20 total, 10MB per image)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tip: In the file picker, you can select multiple files by holding Ctrl (Windows) or Cmd (Mac)
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (fileInputRef.current && !fileInputRef.current.disabled) {
                    // Ensure multiple attribute is set before clicking
                    fileInputRef.current.setAttribute('multiple', '')
                    console.log('Opening file picker with multiple selection enabled')
                    fileInputRef.current.click()
                  }
                }}
                disabled={loading || images.length >= 20}
                className="mt-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Select Multiple Images
              </Button>
            </div>
          </div>
          {images.length >= 20 && (
            <p className="text-sm text-muted-foreground text-center">
              Maximum 20 images reached
            </p>
          )}
        </div>
      )}

      {loading && images.length === 0 ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : images.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images.map((img) => img.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <SortableImageItem
                  key={image.id}
                  image={image}
                  onDelete={handleDelete}
                  onAltTextChange={handleAltTextChange}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
          No images uploaded yet
        </div>
      )}
    </div>
  )
}

interface SortableImageItemProps {
  image: ImageItem
  onDelete: (id: string) => void
  onAltTextChange: (id: string, altText: string) => void
}

function SortableImageItem({
  image,
  onDelete,
  onAltTextChange,
}: SortableImageItemProps) {
  const [altText, setAltText] = useState(image.alt_text || '')
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card ref={setNodeRef} style={style} className="relative group">
      <CardContent className="p-2">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          {image.isUploading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <Image
                src={image.image_url}
                alt={altText || 'Blog image'}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onDelete(image.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div
                {...attributes}
                {...listeners}
                className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-background/80 rounded p-1"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
            </>
          )}
        </div>
        <div className="mt-2 space-y-1">
          <Input
            type="text"
            placeholder="Alt text (optional)"
            value={altText}
            onChange={(e) => {
              setAltText(e.target.value)
              onAltTextChange(image.id, e.target.value)
            }}
            className="text-xs h-8"
          />
        </div>
      </CardContent>
    </Card>
  )
}

