'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { ProjectEditor } from './ProjectEditor'
import type { Project } from '@/types/project'
import { useToast } from '@/components/ui/use-toast'
import { deleteProjectAction } from '@/app/[locale]/admin/_actions/projects'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ProjectsAdminProps {
  locale: string
  initialProjects: Project[]
}

export function ProjectsAdmin({ locale, initialProjects }: ProjectsAdminProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const { toast } = useToast()

  const handleDelete = async () => {
    if (!projectToDelete) return

    try {
      const success = await deleteProjectAction(projectToDelete.project_id)
      if (success) {
        setProjects(projects.filter((p) => p.project_id !== projectToDelete.project_id))
        toast({
          title: 'Project deleted',
          description: 'The project has been deleted successfully.',
        })
      } else {
        throw new Error('Failed to delete project')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      })
    } finally {
      setDeleteDialogOpen(false)
      setProjectToDelete(null)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsCreating(false)
  }

  const handleCreate = () => {
    setEditingProject(null)
    setIsCreating(true)
  }

  const handleEditorClose = () => {
    setEditingProject(null)
    setIsCreating(false)
  }

  const handleEditorSuccess = (updatedProject: Project) => {
    if (isCreating) {
      setProjects([...projects, updatedProject])
    } else {
      setProjects(
        projects.map((p) =>
          p.id === updatedProject.id ? updatedProject : p
        )
      )
    }
    handleEditorClose()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground dark:text-zinc-100">Projects</h2>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground dark:text-zinc-400">No projects found. Create your first project!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-foreground dark:text-zinc-100">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground dark:text-zinc-400 mt-1">{project.project_id}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setProjectToDelete(project)
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
                <p className="text-zinc-300 mb-2">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-zinc-500">
                  Order: {project.order_index} | Featured: {project.featured ? 'Yes' : 'No'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {(isCreating || editingProject) && (
        <ProjectEditor
          project={editingProject || undefined}
          locale={locale}
          onClose={handleEditorClose}
          onSuccess={handleEditorSuccess}
        />
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{projectToDelete?.title}&quot;? This action cannot be undone.
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

