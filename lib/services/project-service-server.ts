import { databases, getDatabaseId, getCollectionId } from '@/lib/appwrite'
import type { Project, CreateProjectParams, UpdateProjectParams } from '@/types/project'
import { cache } from 'react'
import { ID, Query } from 'appwrite'

const databaseId = () => getDatabaseId()
const collectionId = () => getCollectionId('projects')

function appwriteDocToProject(doc: any): Project {
  return {
    id: doc.$id,
    project_id: doc.project_id,
    locale: doc.locale,
    order_index: doc.order_index,
    preview_image_url: doc.preview_image_url,
    deployed_url: doc.deployed_url || null,
    repo_url: doc.repo_url || null,
    featured: doc.featured ?? true,
    title: doc.title,
    description: doc.description,
    tags: doc.tags || [],
    created_at: doc.created_at,
    updated_at: doc.updated_at,
  }
}

export const projectServiceServer = {
  // Get featured projects for a locale - Server Component with cache
  getFeaturedProjects: cache(async (locale: string): Promise<Project[]> => {
    try {
      const response = await databases.listDocuments(
        databaseId(),
        collectionId(),
        [
          Query.equal('locale', locale),
          Query.equal('featured', true),
          Query.orderAsc('order_index'),
        ]
      )

      return response.documents.map(appwriteDocToProject)
    } catch (error) {
      console.error('Error fetching featured projects:', error)
      return []
    }
  }),

  // Get all projects for a locale - Server Component
  async getAllProjects(locale: string): Promise<Project[]> {
    try {
      const response = await databases.listDocuments(
        databaseId(),
        collectionId(),
        [
          Query.equal('locale', locale),
          Query.orderAsc('order_index'),
        ]
      )

      return response.documents.map(appwriteDocToProject)
    } catch (error) {
      console.error('Error fetching all projects:', error)
      return []
    }
  },

  // Get project by slug/id and locale - Server Component
  async getProjectBySlug(projectId: string, locale: string): Promise<Project | null> {
    try {
      const response = await databases.listDocuments(
        databaseId(),
        collectionId(),
        [
          Query.equal('project_id', projectId),
          Query.equal('locale', locale),
        ]
      )

      if (response.documents.length === 0) {
        return null
      }

      return appwriteDocToProject(response.documents[0])
    } catch (error) {
      console.error('Error fetching project by slug:', error)
      return null
    }
  },

  // Create project - Server Action
  async createProject(params: CreateProjectParams): Promise<Project | null> {
    try {
      const response = await databases.createDocument(
        databaseId(),
        collectionId(),
        ID.unique(),
        {
          project_id: params.project_id,
          locale: params.locale,
          order_index: params.order_index,
          preview_image_url: params.preview_image_url,
          deployed_url: params.deployed_url || null,
          repo_url: params.repo_url || null,
          featured: params.featured ?? true,
          title: params.title,
          description: params.description,
          tags: params.tags || [],
        }
      )

      return appwriteDocToProject(response)
    } catch (error) {
      console.error('Error creating project:', error)
      return null
    }
  },

  // Update project - Server Action
  async updateProject(id: string, params: UpdateProjectParams): Promise<Project | null> {
    try {
      const updateData: any = {}
      
      if (params.order_index !== undefined) updateData.order_index = params.order_index
      if (params.preview_image_url !== undefined) updateData.preview_image_url = params.preview_image_url
      if (params.deployed_url !== undefined) updateData.deployed_url = params.deployed_url
      if (params.repo_url !== undefined) updateData.repo_url = params.repo_url
      if (params.featured !== undefined) updateData.featured = params.featured
      if (params.title !== undefined) updateData.title = params.title
      if (params.description !== undefined) updateData.description = params.description
      if (params.tags !== undefined) updateData.tags = params.tags

      const response = await databases.updateDocument(
        databaseId(),
        collectionId(),
        id,
        updateData
      )

      return appwriteDocToProject(response)
    } catch (error) {
      console.error('Error updating project:', error)
      return null
    }
  },

  // Delete project - Server Action (deletes all locales for a project_id)
  async deleteProject(projectId: string): Promise<boolean> {
    try {
      // Get all documents with this project_id
      const response = await databases.listDocuments(
        databaseId(),
        collectionId(),
        [Query.equal('project_id', projectId)]
      )

      // Delete all locale variants
      await Promise.all(
        response.documents.map((doc) =>
          databases.deleteDocument(databaseId(), collectionId(), doc.$id)
        )
      )

      return true
    } catch (error) {
      console.error('Error deleting project:', error)
      return false
    }
  },
}

