'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { account } from '@/lib/appwrite'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ProjectsAdmin } from './projects/ProjectsAdmin'
import { BlogAdmin } from './blog/BlogAdmin'
import type { BlogPost } from '@/types/blog'
import type { Project } from '@/types/project'
import { LogOut } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

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

  const handleSignOut = async () => {
    try {
      await account.deleteSession('current')
      router.push(`/${locale}/admin/login`)
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      })
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Admin Dashboard</h1>
          <p className="text-zinc-400 mt-1">Manage projects and blog posts</p>
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

