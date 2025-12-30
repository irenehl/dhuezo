'use server'

import { assertAdminSession } from '@/lib/auth/admin-auth'
import { blogServiceServer } from '@/lib/services/blog-service-server'
import type {
  CreateBlogPostParams,
  UpdateBlogPostParams,
  BlogPost,
} from '@/types/blog'

export async function createBlogPostAction(
  params: CreateBlogPostParams
): Promise<BlogPost | null> {
  try {
    const user = await assertAdminSession()
    // Set author_id from session
    const paramsWithAuthor = {
      ...params,
      author_id: user.$id,
    }
    return await blogServiceServer.createPost(paramsWithAuthor)
  } catch (error) {
    console.error('Error in createBlogPostAction:', error)
    return null
  }
}

export async function updateBlogPostAction(
  id: string,
  params: UpdateBlogPostParams
): Promise<BlogPost | null> {
  try {
    await assertAdminSession()
    return await blogServiceServer.updatePost(id, params)
  } catch (error) {
    console.error('Error in updateBlogPostAction:', error)
    return null
  }
}

export async function deleteBlogPostAction(id: string): Promise<boolean> {
  try {
    await assertAdminSession()
    return await blogServiceServer.deletePost(id)
  } catch (error) {
    console.error('Error in deleteBlogPostAction:', error)
    return false
  }
}

export async function togglePublishBlogPostAction(
  id: string,
  published: boolean
): Promise<boolean> {
  try {
    await assertAdminSession()
    const updated = await blogServiceServer.updatePost(id, { published })
    return !!updated
  } catch (error) {
    console.error('Error in togglePublishBlogPostAction:', error)
    return false
  }
}

