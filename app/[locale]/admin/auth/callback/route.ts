import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Admin magic-link callback for Appwrite has been removed.
  // Keep this endpoint so legacy links fail gracefully instead of 404.
  const url = new URL(request.url)
  const pathParts = url.pathname.split('/')
  const locale = pathParts[1] || 'en'

  return NextResponse.redirect(
    new URL(`/${locale}/admin/login`, request.url),
  )
}


