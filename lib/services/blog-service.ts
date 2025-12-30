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
}
