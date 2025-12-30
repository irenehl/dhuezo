import type {
  BlogCategory,
  BlogPost,
  BlogPostImage,
  CreateBlogPostParams,
  UpdateBlogPostParams,
} from '@/types/blog'

export const blogService = {
  // Get all categories
  async getCategories(): Promise<BlogCategory[]> {
    return []
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    return null
  },

  // Get all posts (for admin)
  async getAllPosts(): Promise<BlogPost[]> {
    return []
  },

  // Get published posts
  async getPublishedPosts(
    locale: string,
    limit = 10,
    categoryId?: string
  ): Promise<BlogPost[]> {
    return []
  },

  // Get post by slug
  async getPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
    return null
  },

  // Get related posts
  async getRelatedPosts(
    postId: string,
    categoryId: string,
    limit = 3
  ): Promise<BlogPost[]> {
    return []
  },

  // Search posts
  async searchPosts(query: string, locale: string): Promise<BlogPost[]> {
    return []
  },

  // Get post images
  async getPostImages(postId: string): Promise<BlogPostImage[]> {
    return []
  },

  // Delete post - Client Action
  async deletePost(id: string): Promise<boolean> {
    return false
  },

  // Upload multiple post images - Client Action
  async uploadPostImages(
    files: File[],
    postId: string
  ): Promise<BlogPostImage[]> {
    return []
  },

  // Delete post image - Client Action
  async deletePostImage(imageId: string): Promise<boolean> {
    return false
  },
}
