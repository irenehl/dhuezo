import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return a mock client if environment variables are not set
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    return {
      auth: {
        exchangeCodeForSession: () => Promise.resolve({ data: null, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null })
      },
      from: () => ({
        select: () => ({
          eq: () => ({ data: [], error: null, count: 0 }),
          not: () => ({ data: [], error: null, count: 0 }),
          ilike: () => ({ data: [], error: null }),
          order: () => ({ data: [], error: null }),
          limit: () => ({ data: [], error: null }),
          range: () => ({ data: [], error: null, count: 0 }),
          single: () => ({ data: null, error: null }),
          data: [],
          error: null,
          count: 0
        }),
        insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }),
        update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }) }),
        delete: () => ({ eq: () => ({ data: null, error: null }) }),
      }),
    } as any
  }

  const cookieStore = await cookies()

  try {
    return createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              // Server Component error
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: '', ...options })
            } catch (error) {
              // Server Component error
            }
          },
        },
      }
    )
  } catch {
    // As a last resort, return a minimal mock client to prevent crashes during development
    return {
      auth: {
        exchangeCodeForSession: () => Promise.resolve({ data: null, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null })
      },
      from: () => ({
        select: () => ({
          eq: () => ({ data: [], error: null, count: 0 }),
          not: () => ({ data: [], error: null, count: 0 }),
          ilike: () => ({ data: [], error: null }),
          order: () => ({ data: [], error: null }),
          limit: () => ({ data: [], error: null }),
          range: () => ({ data: [], error: null, count: 0 }),
          single: () => ({ data: null, error: null }),
          data: [],
          error: null,
          count: 0
        }),
        insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }),
        update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }) }),
        delete: () => ({ eq: () => ({ data: null, error: null }) }),
      }),
    } as any
  }
}
