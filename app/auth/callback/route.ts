import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const next = requestUrl.searchParams.get('next') ?? '/'

  // Auth callback disabled - Supabase has been removed
  return NextResponse.redirect(new URL(next, request.url))
}
