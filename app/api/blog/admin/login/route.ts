import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getBlogAdminPassword } from '@/lib/auth/blog-admin-auth'

const BLOG_ADMIN_COOKIE_NAME = 'blog-admin-auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    const correctPassword = getBlogAdminPassword()

    if (password !== correctPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Set authentication cookie
    const cookieStore = await cookies()
    cookieStore.set(BLOG_ADMIN_COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

