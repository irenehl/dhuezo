import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return a mock client if environment variables are not set
  const isInvalidUrl =
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes('placeholder') ||
    !(supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://'))

  if (isInvalidUrl) {
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithOAuth: () => Promise.resolve({ data: null, error: null }),
        signInWithOtp: () => Promise.resolve({ data: null, error: null }),
        verifyOtp: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: (table: string) => ({
        select: (columns?: string) => ({
          eq: (column: string, value: any) => ({
            order: (column: string, options?: { ascending?: boolean }) => Promise.resolve({ data: [], error: null }),
            limit: (count: number) => Promise.resolve({ data: [], error: null }),
            single: () => Promise.resolve({ data: null, error: null })
          }),
          order: (column: string, options?: { ascending?: boolean }) => Promise.resolve({ data: [], error: null }),
          limit: (count: number) => Promise.resolve({ data: [], error: null }),
          single: () => Promise.resolve({ data: null, error: null })
        }),
        insert: (values: any) => ({
          select: (columns?: string) => ({
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
          })
        }),
        update: (values: any) => ({
          eq: (column: string, value: any) => ({
            eq: (column: string, value: any) => ({
              select: (columns?: string) => ({
                single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
              })
            }),
            select: (columns?: string) => ({
              single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
            })
          }),
          select: (columns?: string) => ({
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
          })
        }),
        delete: () => ({
          eq: (column: string, value: any) => ({
            eq: (column: string, value: any) => Promise.resolve({ error: { message: 'Supabase not configured' } }),
            in: (column: string, values: any[]) => Promise.resolve({ error: { message: 'Supabase not configured' } })
          })
        })
      }),
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
          remove: () => Promise.resolve({ data: null, error: null })
        })
      }
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
