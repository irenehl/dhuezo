import type {
  BlogCategory,
  BlogPost,
  BlogPostImage,
  CreateBlogPostParams,
  UpdateBlogPostParams,
} from '@/types/blog'
import { cache } from 'react'

export const blogServiceServer = {
  // Get all categories - Server Component with cache
  getCategories: cache(async (): Promise<BlogCategory[]> => {
    return []
  }),

  // Get category by slug - Server Component
  async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    return null
  },

  // Get published posts - Server Component
  async getPublishedPosts(
    locale: string,
    limit = 10,
    categoryId?: string
  ): Promise<BlogPost[]> {
    return []
  },

  // Get post by slug - Server Component
  async getPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
    return null
  },

  // Get related posts - Server Component
  async getRelatedPosts(
    postId: string,
    categoryId: string,
    limit = 3
  ): Promise<BlogPost[]> {
    return []
  },

  // Search posts - Server Component
  async searchPosts(query: string, locale: string): Promise<BlogPost[]> {
    return []
  },

  // Get post images - Server Component
  async getPostImages(postId: string): Promise<BlogPostImage[]> {
    return []
  },

  // Create post - Server Action
  async createPost(params: CreateBlogPostParams): Promise<BlogPost | null> {
    return null
  },

  // Update post - Server Action
  async updatePost(
    id: string,
    params: UpdateBlogPostParams
  ): Promise<BlogPost | null> {
    return null
  },

  // Delete post - Server Action
  async deletePost(id: string): Promise<boolean> {
    return false
  },

  // Upload post image - Server Action
  async uploadPostImage(
    postId: string,
    file: File,
    alt?: string
  ): Promise<BlogPostImage | null> {
    return null
  },

  // Delete post image - Server Action
  async deletePostImage(imageId: string): Promise<boolean> {
    return false
  },
}
