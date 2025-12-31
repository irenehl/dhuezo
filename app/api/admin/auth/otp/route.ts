import { NextResponse } from 'next/server'

const ADMIN_EMAIL_ENV = process.env.ADMIN_EMAIL

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email matches admin email
    if (ADMIN_EMAIL_ENV && email !== ADMIN_EMAIL_ENV) {
      return NextResponse.json(
        { error: 'Unauthorized email address' },
        { status: 403 },
      )
    }

    // Admin OTP login via Appwrite has been removed.
    // This endpoint is kept only to avoid breaking clients.
    return NextResponse.json(
      {
        error: 'Admin magic link login is not configured',
      },
      { status: 501 },
    )
  } catch (_error: unknown) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 400 },
    )
  }
}


