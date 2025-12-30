import type {
  BlogCategory,
  BlogPost,
  BlogPostImage,
  CreateBlogPostParams,
  UpdateBlogPostParams,
} from '@/types/blog'
import { databases, getDatabaseId, getCollectionId } from '@/lib/appwrite'
import { cache } from 'react'
import { ID, Query } from 'appwrite'

const databaseId = () => getDatabaseId()
const postsCollectionId = () => getCollectionId('blog_posts')

function appwriteDocToBlogPost(doc: any): BlogPost {
  return {
    id: doc.$id,
    slug: doc.slug,
    locale: doc.locale,
    title: doc.title,
    description: doc.description,
    content: doc.content,
    featured_image_url: doc.featured_image_url || null,
    pdf_url: doc.pdf_url || null,
    pdf_preview_images: doc.pdf_preview_images || [],
    author_id: doc.author_id,
    published: doc.published ?? false,
    published_at: doc.published_at || null,
    created_at: doc.created_at,
    updated_at: doc.updated_at,
    stage_type: doc.stage_type || null,
    event_location: doc.event_location || null,
    event_date: doc.event_date || null,
    cta_label: doc.cta_label || null,
    cta_url: doc.cta_url || null,
    categories: doc.categories || [],
    author: doc.author || undefined,
  }
}

export const blogServiceServer = {
  // Get all categories - Server Component with cache
  getCategories: cache(async (): Promise<BlogCategory[]> => {
    try {
      const categoriesCollectionId = getCollectionId('blog_categories')
      const response = await databases.listDocuments(
        databaseId(),
        categoriesCollectionId,
        [Query.orderAsc('order_index')]
      )

      return response.documents.map((doc) => ({
        id: doc.$id,
        slug: doc.slug,
        name_en: doc.name_en,
        name_es: doc.name_es,
        description_en: doc.description_en || null,
        description_es: doc.description_es || null,
        icon: doc.icon || null,
        color: doc.color || null,
        order_index: doc.order_index,
        created_at: doc.created_at,
      }))
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }),

  // Get category by slug - Server Component
  async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    try {
      const categoriesCollectionId = getCollectionId('blog_categories')
      const response = await databases.listDocuments(
        databaseId(),
        categoriesCollectionId,
        [Query.equal('slug', slug)]
      )

      if (response.documents.length === 0) {
        return null
      }

      const doc = response.documents[0]
      return {
        id: doc.$id,
        slug: doc.slug,
        name_en: doc.name_en,
        name_es: doc.name_es,
        description_en: doc.description_en || null,
        description_es: doc.description_es || null,
        icon: doc.icon || null,
        color: doc.color || null,
        order_index: doc.order_index,
        created_at: doc.created_at,
      }
    } catch (error) {
      console.error('Error fetching category by slug:', error)
      return null
    }
  },

  // Get all posts (for admin) - Server Component
  async getAllPosts(locale?: string): Promise<BlogPost[]> {
    try {
      const queries = locale ? [Query.equal('locale', locale)] : []
      queries.push(Query.orderDesc('created_at'))

      const response = await databases.listDocuments(
        databaseId(),
        postsCollectionId(),
        queries
      )

      return response.documents.map(appwriteDocToBlogPost)
    } catch (error) {
      console.error('Error fetching all posts:', error)
      return []
    }
  },

  // Get stage entries (posts with stage_type) - Server Component
  async getStageEntries(
    locale: string,
    limit = 10
  ): Promise<BlogPost[]> {
    try {
      const response = await databases.listDocuments(
        databaseId(),
        postsCollectionId(),
        [
          Query.equal('locale', locale),
          Query.equal('published', true),
          Query.isNotNull('stage_type'),
          Query.limit(limit),
          Query.orderDesc('created_at'),
        ]
      )

      return response.documents.map(appwriteDocToBlogPost)
    } catch (error) {
      console.error('Error fetching stage entries:', error)
      return []
    }
  },

  // Get published posts - Server Component
  async getPublishedPosts(
    locale: string,
    limit = 10,
    categoryId?: string
  ): Promise<BlogPost[]> {
    try {
      const queries: string[] = [
        Query.equal('locale', locale),
        Query.equal('published', true),
        Query.limit(limit),
        Query.orderDesc('published_at'),
      ]

      if (categoryId) {
        queries.push(Query.equal('category_ids', categoryId))
      }

      const response = await databases.listDocuments(
        databaseId(),
        postsCollectionId(),
        queries
      )

      return response.documents.map(appwriteDocToBlogPost)
    } catch (error) {
      console.error('Error fetching published posts:', error)
      return []
    }
  },

  // Get post by slug - Server Component
  async getPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
    try {
      const response = await databases.listDocuments(
        databaseId(),
        postsCollectionId(),
        [
          Query.equal('slug', slug),
          Query.equal('locale', locale),
        ]
      )

      if (response.documents.length === 0) {
        return null
      }

      return appwriteDocToBlogPost(response.documents[0])
    } catch (error) {
      console.error('Error fetching post by slug:', error)
      return null
    }
  },

  // Get related posts - Server Component
  async getRelatedPosts(
    postId: string,
    categoryId: string,
    limit = 3
  ): Promise<BlogPost[]> {
    try {
      // First get the post to find its locale
      const post = await databases.getDocument(
        databaseId(),
        postsCollectionId(),
        postId
      )

      const response = await databases.listDocuments(
        databaseId(),
        postsCollectionId(),
        [
          Query.equal('locale', post.locale),
          Query.equal('published', true),
          Query.equal('category_ids', categoryId),
          Query.notEqual('$id', postId),
          Query.limit(limit),
          Query.orderDesc('published_at'),
        ]
      )

      return response.documents.map(appwriteDocToBlogPost)
    } catch (error) {
      console.error('Error fetching related posts:', error)
      return []
    }
  },

  // Search posts - Server Component
  async searchPosts(query: string, locale: string): Promise<BlogPost[]> {
    try {
      const response = await databases.listDocuments(
        databaseId(),
        postsCollectionId(),
        [
          Query.equal('locale', locale),
          Query.equal('published', true),
          Query.search('title', query),
          Query.limit(20),
        ]
      )

      return response.documents.map(appwriteDocToBlogPost)
    } catch (error) {
      console.error('Error searching posts:', error)
      return []
    }
  },

  // Get post images - Server Component
  async getPostImages(postId: string): Promise<BlogPostImage[]> {
    try {
      const imagesCollectionId = getCollectionId('blog_images')
      const response = await databases.listDocuments(
        databaseId(),
        imagesCollectionId,
        [
          Query.equal('post_id', postId),
          Query.orderAsc('order_index'),
        ]
      )

      return response.documents.map((doc) => ({
        id: doc.$id,
        post_id: doc.post_id,
        image_url: doc.image_url,
        storage_path: doc.storage_path,
        alt_text: doc.alt_text || null,
        order_index: doc.order_index,
        created_at: doc.created_at,
      }))
    } catch (error) {
      console.error('Error fetching post images:', error)
      return []
    }
  },

  // Create post - Server Action
  async createPost(params: CreateBlogPostParams & { author_id?: string }): Promise<BlogPost | null> {
    try {
      const response = await databases.createDocument(
        databaseId(),
        postsCollectionId(),
        ID.unique(),
        {
          slug: params.slug,
          locale: params.locale,
          title: params.title,
          description: params.description,
          content: params.content,
          featured_image_url: params.featured_image_url || null,
          pdf_url: params.pdf_url || null,
          pdf_preview_images: params.pdf_preview_images || [],
          author_id: params.author_id || '',
          published: params.published ?? false,
          published_at: params.published ? new Date().toISOString() : null,
          stage_type: params.stage_type || null,
          event_location: params.event_location || null,
          event_date: params.event_date || null,
          cta_label: params.cta_label || null,
          cta_url: params.cta_url || null,
          category_ids: params.category_ids || [],
        }
      )

      return appwriteDocToBlogPost(response)
    } catch (error) {
      console.error('Error creating post:', error)
      return null
    }
  },

  // Update post - Server Action
  async updatePost(
    id: string,
    params: UpdateBlogPostParams
  ): Promise<BlogPost | null> {
    try {
      const updateData: any = {}

      if (params.slug !== undefined) updateData.slug = params.slug
      if (params.title !== undefined) updateData.title = params.title
      if (params.description !== undefined) updateData.description = params.description
      if (params.content !== undefined) updateData.content = params.content
      if (params.featured_image_url !== undefined) updateData.featured_image_url = params.featured_image_url
      if (params.pdf_url !== undefined) updateData.pdf_url = params.pdf_url
      if (params.pdf_preview_images !== undefined) updateData.pdf_preview_images = params.pdf_preview_images
      if (params.category_ids !== undefined) updateData.category_ids = params.category_ids
      if (params.published !== undefined) {
        updateData.published = params.published
        updateData.published_at = params.published ? new Date().toISOString() : null
      }
      if (params.stage_type !== undefined) updateData.stage_type = params.stage_type
      if (params.event_location !== undefined) updateData.event_location = params.event_location
      if (params.event_date !== undefined) updateData.event_date = params.event_date
      if (params.cta_label !== undefined) updateData.cta_label = params.cta_label
      if (params.cta_url !== undefined) updateData.cta_url = params.cta_url

      const response = await databases.updateDocument(
        databaseId(),
        postsCollectionId(),
        id,
        updateData
      )

      return appwriteDocToBlogPost(response)
    } catch (error) {
      console.error('Error updating post:', error)
      return null
    }
  },

  // Delete post - Server Action
  async deletePost(id: string): Promise<boolean> {
    try {
      await databases.deleteDocument(
        databaseId(),
        postsCollectionId(),
        id
      )
      return true
    } catch (error) {
      console.error('Error deleting post:', error)
      return false
    }
  },

  // Upload post image - Server Action (stub for now)
  async uploadPostImage(
    postId: string,
    file: File,
    alt?: string
  ): Promise<BlogPostImage | null> {
    // TODO: Implement Appwrite Storage upload
    console.warn('uploadPostImage not yet implemented')
    return null
  },

  // Delete post image - Server Action
  async deletePostImage(imageId: string): Promise<boolean> {
    try {
      const imagesCollectionId = getCollectionId('blog_images')
      await databases.deleteDocument(
        databaseId(),
        imagesCollectionId,
        imageId
      )
      return true
    } catch (error) {
      console.error('Error deleting post image:', error)
      return false
    }
  },
}
