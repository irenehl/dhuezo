import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const BLOG_ADMIN_COOKIE_NAME = 'blog-admin-auth'
const BLOG_ADMIN_PASSWORD = process.env.BLOG_ADMIN_PASSWORD || 'admin123'

export async function requireBlogAdmin(locale: string = 'es') {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(BLOG_ADMIN_COOKIE_NAME)
  
  if (!authCookie || authCookie.value !== 'authenticated') {
    redirect(`/${locale}/blog/admin/login`)
  }
}

export async function checkBlogAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(BLOG_ADMIN_COOKIE_NAME)
  return authCookie?.value === 'authenticated'
}

export async function setBlogAdminAuth() {
  const cookieStore = await cookies()
  cookieStore.set(BLOG_ADMIN_COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export function getBlogAdminPassword(): string {
  return BLOG_ADMIN_PASSWORD
}

