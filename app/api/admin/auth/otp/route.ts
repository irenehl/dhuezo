import { NextResponse } from 'next/server'
import { account } from '@/lib/appwrite'

const ADMIN_EMAIL_ENV = process.env.ADMIN_EMAIL

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email matches admin email
    if (ADMIN_EMAIL_ENV && email !== ADMIN_EMAIL_ENV) {
      return NextResponse.json(
        { error: 'Unauthorized email address' },
        { status: 403 }
      )
    }

    // Create magic URL token for email OTP/magic link
    // Appwrite's createMagicURLToken sends an email with a magic link
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    // Default to 'en' locale, but you can customize this logic
    const redirectUrl = `${baseUrl}/en/admin/auth/callback`
    
    await account.createMagicURLToken(email, redirectUrl)

    return NextResponse.json({
      success: true,
      message: 'Magic link sent to your email',
    })
  } catch (error: any) {
    console.error('Error creating magic URL token:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send magic link' },
      { status: 400 }
    )
  }
}

