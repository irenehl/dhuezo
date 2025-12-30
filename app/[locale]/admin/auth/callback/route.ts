import { NextResponse } from 'next/server'
import { account } from '@/lib/appwrite'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')

  if (!userId || !secret) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  try {
    // Create session from magic URL token
    await account.createSession(userId, secret)
    
    // Extract locale from URL path (e.g., /en/admin/auth/callback or /es/admin/auth/callback)
    const url = new URL(request.url)
    const pathParts = url.pathname.split('/')
    const locale = pathParts[1] || 'en'
    
    // Redirect to admin dashboard
    return NextResponse.redirect(
      new URL(`/${locale}/admin`, request.url)
    )
  } catch (error: any) {
    console.error('Error creating session from magic URL:', error)
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 400 }
    )
  }
}

