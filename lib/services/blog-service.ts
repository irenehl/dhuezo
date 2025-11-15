import { createClient } from '@/lib/supabase/client'
import type {
  BlogCategory,
  BlogPost,
  BlogPostImage,
  CreateBlogPostParams,
  UpdateBlogPostParams,
} from '@/types/blog'

const supabase = createClient()

export const blogService = {
  // Get all categories
  async getCategories(): Promise<BlogCategory[]> {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      return (data as BlogCategory[]) || []
    } catch {
      return []
    }
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    try {
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

  // Get published posts
  async getPublishedPosts(
    locale: string,
    limit = 10,
    categoryId?: string
  ): Promise<BlogPost[]> {
    try {
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

  // Get post by slug
  async getPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
    try {
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

  // Get all posts (for admin)
  async getAllPosts(locale?: string): Promise<BlogPost[]> {
    try {
      // For blog admin, we don't require Supabase auth
      // Just get all published and unpublished posts
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

  // Create post
  async createPost(params: CreateBlogPostParams): Promise<BlogPost | null> {
    try {
      // Check if Supabase is configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      console.log('Supabase URL check:', {
        hasUrl: !!supabaseUrl,
        urlStartsWithHttp: supabaseUrl?.startsWith('http'),
        urlPreview: supabaseUrl?.substring(0, 30) + '...',
        hasKey: !!supabaseAnonKey
      })
      
      if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file.')
      }
      
      if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
        throw new Error(`Invalid Supabase URL format. Expected URL starting with http:// or https://, got: ${supabaseUrl?.substring(0, 50)}. Please check your NEXT_PUBLIC_SUPABASE_URL in .env file.`)
      }

      // Use system user ID from env or generate a placeholder
      const systemUserId = process.env.NEXT_PUBLIC_BLOG_SYSTEM_USER_ID || '00000000-0000-0000-0000-000000000000'

      const { category_ids, ...postData } = params

      console.log('Attempting to insert post with data:', {
        title: postData.title,
        slug: postData.slug,
        locale: postData.locale,
        author_id: systemUserId,
        hasContent: !!postData.content
      })

      const insertResult = await supabase
        .from('blog_posts')
        .insert({
          ...postData,
          author_id: systemUserId,
          published_at: params.published ? new Date().toISOString() : null,
        })
        .select()
        .single()

      console.log('Insert result:', {
        hasData: !!insertResult.data,
        hasError: !!insertResult.error,
        errorType: typeof insertResult.error,
        resultKeys: Object.keys(insertResult),
        fullResult: JSON.stringify(insertResult, null, 2)
      })

      const { data: post, error: postError } = insertResult

      if (postError) {
        // Log full response for debugging
        console.error('Full Supabase response:', JSON.stringify(insertResult, null, 2))
        console.error('Supabase error creating post:', postError)
        console.error('Error type:', typeof postError)
        console.error('Error constructor:', postError?.constructor?.name)
        
        // Try to stringify the error object with all its properties
        try {
          const errorString = JSON.stringify(postError, Object.getOwnPropertyNames(postError), 2)
          console.error('Error as JSON:', errorString)
        } catch (e) {
          console.error('Could not stringify error:', e)
        }
        
        // Try to get all properties including non-enumerable ones
        const errorProps: Record<string, any> = {}
        if (postError && typeof postError === 'object') {
          for (const key in postError) {
            errorProps[key] = (postError as any)[key]
          }
          // Also check common Supabase error properties
          errorProps.message = (postError as any).message
          errorProps.details = (postError as any).details
          errorProps.hint = (postError as any).hint
          errorProps.code = (postError as any).code
        }
        console.error('Error properties:', errorProps)
        
        // Extract error message from various possible formats
        let errorMessage = 'Failed to create post'
        
        if (typeof postError === 'string') {
          errorMessage = postError
        } else if (postError && typeof postError === 'object') {
          const message = (postError as any).message
          const details = (postError as any).details
          const hint = (postError as any).hint
          const code = (postError as any).code
          
          errorMessage = 
            message || 
            details || 
            hint ||
            code ||
            (Object.keys(postError).length === 0 
              ? 'Database error: Empty error object. This usually means:\n1. The blog_posts table does not exist - run the SQL from supabase/blog-schema.sql\n2. RLS policies are blocking the operation - check your RLS policies\n3. Supabase connection issue - verify your env variables'
              : `Database error: ${JSON.stringify(postError)}`)
        }
        
        throw new Error(errorMessage)
      }

      if (!post) {
        throw new Error('Post was not created')
      }

      // Link categories
      if (category_ids && category_ids.length > 0) {
        const categoryLinks = category_ids.map((catId) => ({
          post_id: post.id,
          category_id: catId,
        }))

        const { error: categoryError } = await supabase
          .from('blog_post_categories')
          .insert(categoryLinks)

        if (categoryError) {
          console.error('Error linking categories:', categoryError)
          // Don't fail the whole operation if categories fail
        }
      }

      return post as BlogPost
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error creating post'
      console.error('Error creating post:', errorMessage, error)
      throw error // Re-throw so the UI can show the error
    }
  },

  // Update post
  async updatePost(
    postId: string,
    params: UpdateBlogPostParams
  ): Promise<BlogPost | null> {
    try {
      const { category_ids, ...updateData } = params

      // Update post (no auth check for blog admin)
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

      if (postError) {
        console.error('Supabase error updating post:', postError)
        const errorMessage = 
          postError.message || 
          postError.details || 
          postError.hint ||
          (typeof postError === 'string' ? postError : JSON.stringify(postError)) ||
          'Failed to update post'
        throw new Error(errorMessage)
      }

      if (!post) {
        throw new Error('Post was not updated')
      }

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

  // Delete post
  async deletePost(postId: string): Promise<boolean> {
    try {
      // No auth check for blog admin
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId)

      if (error) {
        console.error('Supabase error deleting post:', error)
        const errorMessage = 
          error.message || 
          error.details || 
          error.hint ||
          (typeof error === 'string' ? error : JSON.stringify(error)) ||
          'Failed to delete post'
        throw new Error(errorMessage)
      }
      return true
    } catch (error) {
      console.error('Error deleting post:', error)
      return false
    }
  },

  // Upload image
  async uploadImage(
    file: File,
    postId?: string
  ): Promise<{ url: string; path: string } | null> {
    try {
      if (!supabase.storage) {
        throw new Error('Supabase storage is not configured')
      }

      // Use system user ID for file paths
      const systemUserId = process.env.NEXT_PUBLIC_BLOG_SYSTEM_USER_ID || 'blog-admin'
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${systemUserId}-${Date.now()}.${fileExt}`
      const filePath = postId
        ? `${systemUserId}/${postId}/${fileName}`
        : `${systemUserId}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      // Save image metadata if postId provided
      if (postId) {
        await supabase.from('blog_post_images').insert({
          post_id: postId,
          image_url: publicUrl,
          storage_path: filePath,
        })
      }

      return { url: publicUrl, path: filePath }
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  },

  // Upload PDF
  async uploadPDF(file: File): Promise<{ url: string; path: string } | null> {
    try {
      if (!supabase.storage) {
        throw new Error('Supabase storage is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file.')
      }

      // Use system user ID for file paths
      const systemUserId = process.env.NEXT_PUBLIC_BLOG_SYSTEM_USER_ID || 'blog-admin'
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${systemUserId}-${Date.now()}.${fileExt}`
      const filePath = `${systemUserId}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('blog-pdfs')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-pdfs')
        .getPublicUrl(filePath)

      return { url: publicUrl, path: filePath }
    } catch (error) {
      console.error('Error uploading PDF:', error)
      return null
    }
  },

  // Get post images
  async getPostImages(postId: string): Promise<BlogPostImage[]> {
    try {
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
  },

  // Upload multiple images for a post (with 20 image limit validation)
  async uploadPostImages(
    files: File[],
    postId: string
  ): Promise<BlogPostImage[]> {
    try {
      if (!postId) {
        throw new Error('Post ID is required')
      }

      // Check current image count
      const existingImages = await this.getPostImages(postId)
      const currentCount = existingImages.length
      const maxImages = 20

      if (currentCount + files.length > maxImages) {
        throw new Error(
          `Cannot upload ${files.length} images. Maximum ${maxImages} images allowed. Current count: ${currentCount}`
        )
      }

      if (!supabase.storage) {
        throw new Error('Supabase storage is not configured')
      }

      const systemUserId = process.env.NEXT_PUBLIC_BLOG_SYSTEM_USER_ID || 'blog-admin'
      const uploadedImages: BlogPostImage[] = []

      // Upload files sequentially to maintain order
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Validate file type
        if (!file.type.startsWith('image/')) {
          console.warn(`Skipping non-image file: ${file.name}`)
          continue
        }

        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
          console.warn(`Skipping file too large: ${file.name}`)
          continue
        }

        const fileExt = file.name.split('.').pop()
        const fileName = `${systemUserId}-${Date.now()}-${i}.${fileExt}`
        const filePath = `${systemUserId}/${postId}/${fileName}`

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          })

        if (uploadError) {
          console.error(`Error uploading ${file.name}:`, uploadError)
          continue
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath)

        // Save metadata with order_index
        const orderIndex = currentCount + uploadedImages.length
        const { data: imageData, error: dbError } = await supabase
          .from('blog_post_images')
          .insert({
            post_id: postId,
            image_url: publicUrl,
            storage_path: filePath,
            order_index: orderIndex,
          })
          .select()
          .single()

        if (dbError) {
          console.error(`Error saving metadata for ${file.name}:`, dbError)
          // Clean up storage if DB insert fails
          await supabase.storage.from('blog-images').remove([filePath])
          continue
        }

        uploadedImages.push(imageData as BlogPostImage)
      }

      return uploadedImages
    } catch (error) {
      console.error('Error uploading post images:', error)
      throw error
    }
  },

  // Delete individual image (with storage cleanup)
  async deletePostImage(imageId: string): Promise<boolean> {
    try {
      // Get image data first to get storage path
      const { data: image, error: fetchError } = await supabase
        .from('blog_post_images')
        .select('*')
        .eq('id', imageId)
        .single()

      if (fetchError) throw fetchError
      if (!image) throw new Error('Image not found')

      // Delete from storage
      if (image.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('blog-images')
          .remove([image.storage_path])

        if (storageError) {
          console.error('Error deleting from storage:', storageError)
          // Continue with DB deletion even if storage deletion fails
        }
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('blog_post_images')
        .delete()
        .eq('id', imageId)

      if (dbError) throw dbError

      return true
    } catch (error) {
      console.error('Error deleting post image:', error)
      return false
    }
  },

  // Update image order (for drag-and-drop reordering)
  async updatePostImageOrder(
    postId: string,
    imageIds: string[]
  ): Promise<boolean> {
    try {
      // Update order_index for each image based on its position in the array
      const updates = imageIds.map((imageId, index) => ({
        id: imageId,
        order_index: index,
      }))

      // Update each image's order_index
      for (const update of updates) {
        const { error } = await supabase
          .from('blog_post_images')
          .update({ order_index: update.order_index })
          .eq('id', update.id)
          .eq('post_id', postId)

        if (error) {
          console.error(`Error updating order for image ${update.id}:`, error)
          throw error
        }
      }

      return true
    } catch (error) {
      console.error('Error updating image order:', error)
      return false
    }
  },

  // Update image alt text
  async updatePostImageAltText(
    imageId: string,
    altText: string | null
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('blog_post_images')
        .update({ alt_text: altText })
        .eq('id', imageId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error updating image alt text:', error)
      return false
    }
  },

  // Save images independently (can be called without saving the post)
  async savePostImages(
    postId: string,
    images: Array<{ id?: string; url: string; alt_text?: string; order_index: number }>
  ): Promise<boolean> {
    try {
      if (!postId) {
        throw new Error('Post ID is required')
      }

      // Validate image count
      if (images.length > 20) {
        throw new Error('Maximum 20 images allowed per post')
      }

      // For now, this method is mainly for reordering existing images
      // New images should be uploaded via uploadPostImages
      // This can be extended if needed for other use cases

      return true
    } catch (error) {
      console.error('Error saving post images:', error)
      return false
    }
  },
}

