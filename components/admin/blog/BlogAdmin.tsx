'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { BlogEditor } from './BlogEditor'
import type { BlogPost } from '@/types/blog'
import { useToast } from '@/components/ui/use-toast'
import {
  deleteBlogPostAction,
  togglePublishBlogPostAction,
} from '@/app/[locale]/admin/_actions/blog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface BlogAdminProps {
  locale: string
  initialPosts: BlogPost[]
}

export function BlogAdmin({ locale, initialPosts }: BlogAdminProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null)
  const { toast } = useToast()

  const handleDelete = async () => {
    if (!postToDelete) return

    try {
      const success = await deleteBlogPostAction(postToDelete.id)
      if (success) {
        setPosts(posts.filter((p) => p.id !== postToDelete.id))
        toast({
          title: 'Post deleted',
          description: 'The blog post has been deleted successfully.',
        })
      } else {
        throw new Error('Failed to delete post')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      })
    } finally {
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const success = await togglePublishBlogPostAction(post.id, !post.published)
      if (success) {
        setPosts(
          posts.map((p) =>
            p.id === post.id ? { ...p, published: !p.published } : p
          )
        )
        toast({
          title: post.published ? 'Post unpublished' : 'Post published',
          description: `The post has been ${post.published ? 'unpublished' : 'published'} successfully.`,
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to toggle publish status',
        variant: 'destructive',
      })
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setIsCreating(false)
  }

  const handleCreate = () => {
    setEditingPost(null)
    setIsCreating(true)
  }

  const handleEditorClose = () => {
    setEditingPost(null)
    setIsCreating(false)
  }

  const handleEditorSuccess = (updatedPost: BlogPost) => {
    if (isCreating) {
      setPosts([...posts, updatedPost])
    } else {
      setPosts(
        posts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      )
    }
    handleEditorClose()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground dark:text-zinc-100">Blog Posts</h2>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground dark:text-zinc-400">No blog posts found. Create your first post!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-foreground dark:text-zinc-100">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground dark:text-zinc-400 mt-1">{post.slug}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          post.published
                            ? 'bg-green-900/50 text-green-300'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded">
                        {post.locale.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(post)}
                      className="gap-2"
                    >
                      {post.published ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Publish
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPostToDelete(post)
                        setDeleteDialogOpen(true)
                      }}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-2">{post.description}</p>
                <p className="text-sm text-zinc-500">
                  Updated: {new Date(post.updated_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {(isCreating || editingPost) && (
        <BlogEditor
          post={editingPost || undefined}
          locale={locale}
          onClose={handleEditorClose}
          onSuccess={handleEditorSuccess}
        />
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{postToDelete?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

