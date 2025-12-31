'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import type { BlogPost } from '@/types/blog'
import type { Project } from '@/types/project'

import { ProjectsAdmin } from './projects/ProjectsAdmin'
import { BlogAdmin } from './blog/BlogAdmin'

interface AdminDashboardClientProps {
  locale: string
  initialPosts: BlogPost[]
  initialProjects: Project[]
}

export function AdminDashboardClient({
  locale,
  initialPosts,
  initialProjects,
}: AdminDashboardClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('projects')

  const handleSignOut = (): void => {
    router.push(`/${locale}/admin/login`)
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    })
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-zinc-100">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground dark:text-zinc-400">
            Manage projects and blog posts
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <ProjectsAdmin locale={locale} initialProjects={initialProjects} />
        </TabsContent>

        <TabsContent value="blog">
          <BlogAdmin locale={locale} initialPosts={initialPosts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}


