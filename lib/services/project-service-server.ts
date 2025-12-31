import type {
  CreateProjectParams,
  Project,
  UpdateProjectParams,
} from '@/types/project'

// Minimal server-side project service placeholder so that admin
// pages and actions can compile. Real persistence is not wired.

async function getAllProjects(_locale: string): Promise<Project[]> {
  // No server-side storage yet; return an empty list.
  return []
}

async function createProject(
  _params: CreateProjectParams,
): Promise<Project | null> {
  throw new Error('projectServiceServer.createProject is not implemented')
}

async function updateProject(
  _id: string,
  _params: UpdateProjectParams,
): Promise<Project | null> {
  throw new Error('projectServiceServer.updateProject is not implemented')
}

async function deleteProject(_id: string): Promise<boolean> {
  throw new Error('projectServiceServer.deleteProject is not implemented')
}

export const projectServiceServer = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
}



