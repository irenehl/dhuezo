import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BLOG_ADMIN_COOKIE_NAME = 'blog-admin-auth'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete(BLOG_ADMIN_COOKIE_NAME)

  return NextResponse.json({ success: true })
}

