'use server'

import { assertAdminSession } from '@/lib/auth/admin-auth'
import { projectServiceServer } from '@/lib/services/project-service-server'
import type { CreateProjectParams, UpdateProjectParams, Project } from '@/types/project'

export async function createProjectAction(
  params: CreateProjectParams
): Promise<Project | null> {
  try {
    await assertAdminSession()
    return await projectServiceServer.createProject(params)
  } catch (error) {
    console.error('Error in createProjectAction:', error)
    return null
  }
}

export async function updateProjectAction(
  id: string,
  params: UpdateProjectParams
): Promise<Project | null> {
  try {
    await assertAdminSession()
    return await projectServiceServer.updateProject(id, params)
  } catch (error) {
    console.error('Error in updateProjectAction:', error)
    return null
  }
}

export async function deleteProjectAction(projectId: string): Promise<boolean> {
  try {
    await assertAdminSession()
    return await projectServiceServer.deleteProject(projectId)
  } catch (error) {
    console.error('Error in deleteProjectAction:', error)
    return false
  }
}

