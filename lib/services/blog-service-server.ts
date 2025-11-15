import { createClient } from '@/lib/supabase/server'
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
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      return (data as BlogCategory[]) || []
    } catch {
      return []
    }
  }),

  // Get category by slug - Server Component
  async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error
      return data as BlogCategory
    } catch {
      return null
    }
  },

  // Get published posts - Server Component
  async getPublishedPosts(
    locale: string,
    limit = 10,
    categoryId?: string
  ): Promise<BlogPost[]> {
    try {
      const supabase = await createClient()
      // Use inner join when filtering by category, left join otherwise
      const joinType = categoryId ? '!inner' : ''
      let query = supabase
        .from('blog_posts')
        .select(
          `
          *,
          blog_post_categories${joinType}(
            blog_categories(*)
          )
        `
        )
        .eq('published', true)
        .eq('locale', locale)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (categoryId) {
        query = query.eq('blog_post_categories.category_id', categoryId)
      }

      const { data, error } = await query

      if (error) throw error

      // Transform the data to flatten categories
      const posts = (data as any[]) || []
      return posts.map((post) => ({
        ...post,
        categories: post.blog_post_categories?.map(
          (pc: any) => pc.blog_categories
        ) || [],
      })) as BlogPost[]
    } catch {
      return []
    }
  },

  // Get post by slug - Server Component
  async getPostBySlug(
    slug: string,
    locale: string
  ): Promise<BlogPost | null> {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('blog_posts')
        .select(
          `
          *,
          blog_post_categories(
            blog_categories(*)
          )
        `
        )
        .eq('slug', slug)
        .eq('locale', locale)
        .eq('published', true)
        .single()

      if (error) throw error

      const post = data as any
      return {
        ...post,
        categories:
          post.blog_post_categories?.map((pc: any) => pc.blog_categories) ||
          [],
      } as BlogPost
    } catch {
      return null
    }
  },

  // Get all posts (for admin) - Server Component
  async getAllPosts(locale?: string): Promise<BlogPost[]> {
    try {
      const supabase = await createClient()
      // No auth check for blog admin

      let query = supabase
        .from('blog_posts')
        .select(
          `
          *,
          blog_post_categories(
            blog_categories(*)
          )
        `
        )
        .order('created_at', { ascending: false })

      if (locale) {
        query = query.eq('locale', locale)
      }

      const { data, error } = await query

      if (error) throw error

      const posts = (data as any[]) || []
      return posts.map((post) => ({
        ...post,
        categories:
          post.blog_post_categories?.map((pc: any) => pc.blog_categories) ||
          [],
      })) as BlogPost[]
    } catch {
      return []
    }
  },

  // Create post - Server Action
  async createPost(params: CreateBlogPostParams): Promise<BlogPost | null> {
    try {
      const supabase = await createClient()
      // Use system user ID from env or generate a placeholder
      const systemUserId = process.env.NEXT_PUBLIC_BLOG_SYSTEM_USER_ID || '00000000-0000-0000-0000-000000000000'

      const { category_ids, ...postData } = params

      const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .insert({
          ...postData,
          author_id: systemUserId,
          published_at: params.published ? new Date().toISOString() : null,
        })
        .select()
        .single()

      if (postError) throw postError

      // Link categories
      if (category_ids && category_ids.length > 0) {
        const categoryLinks = category_ids.map((catId) => ({
          post_id: post.id,
          category_id: catId,
        }))

        await supabase
          .from('blog_post_categories')
          .insert(categoryLinks)
      }

      return post as BlogPost
    } catch (error) {
      console.error('Error creating post:', error)
      return null
    }
  },

  // Update post - Server Action
  async updatePost(
    postId: string,
    params: UpdateBlogPostParams
  ): Promise<BlogPost | null> {
    try {
      const supabase = await createClient()
      // No auth check for blog admin

      const { category_ids, ...updateData } = params

      // Update post
      const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .update({
          ...updateData,
          published_at:
            params.published === true
              ? new Date().toISOString()
              : params.published === false
                ? null
                : undefined,
        })
        .eq('id', postId)
        .select()
        .single()

      if (postError) throw postError

      // Update categories if provided
      if (category_ids !== undefined) {
        // Delete existing links
        await supabase
          .from('blog_post_categories')
          .delete()
          .eq('post_id', postId)

        // Insert new links
        if (category_ids.length > 0) {
          const categoryLinks = category_ids.map((catId) => ({
            post_id: postId,
            category_id: catId,
          }))

          await supabase
            .from('blog_post_categories')
            .insert(categoryLinks)
        }
      }

      return post as BlogPost
    } catch (error) {
      console.error('Error updating post:', error)
      return null
    }
  },

  // Delete post - Server Action
  async deletePost(postId: string): Promise<boolean> {
    try {
      const supabase = await createClient()
      // No auth check for blog admin

      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting post:', error)
      return false
    }
  },

  // Get post images - Server Component
  getPostImages: cache(async (postId: string): Promise<BlogPostImage[]> => {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('blog_post_images')
        .select('*')
        .eq('post_id', postId)
        .order('order_index', { ascending: true })

      if (error) throw error
      return (data as BlogPostImage[]) || []
    } catch {
      return []
    }
  }),
}

