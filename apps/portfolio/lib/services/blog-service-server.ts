import type {
  BlogPost,
  CreateBlogPostParams,
  UpdateBlogPostParams,
} from '@/types/blog'

type CreateWithAuthorParams = CreateBlogPostParams & { author_id: string }

// Minimal server-side blog service placeholder so that admin
// pages and actions can compile. Real persistence is not wired.

async function getAllPosts(_locale: string): Promise<BlogPost[]> {
  // No server-side storage yet; return an empty list.
  return []
}

async function createPost(
  _params: CreateWithAuthorParams,
): Promise<BlogPost | null> {
  throw new Error('blogServiceServer.createPost is not implemented')
}

async function updatePost(
  _id: string,
  _params: UpdateBlogPostParams,
): Promise<BlogPost | null> {
  throw new Error('blogServiceServer.updatePost is not implemented')
}

async function deletePost(_id: string): Promise<boolean> {
  throw new Error('blogServiceServer.deletePost is not implemented')
}

export const blogServiceServer = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
}






