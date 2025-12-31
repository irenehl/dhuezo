export type AdminUser = {
  $id: string
  email: string
  name: string
}

// Placeholder admin auth helpers.
// These are intentionally minimal so the app can build
// while a real Supabase-based admin flow is implemented.

export async function getAdminUser(): Promise<AdminUser | null> {
  // No admin session support wired yet; always unauthenticated.
  return null
}

export async function assertAdminSession(): Promise<AdminUser> {
  // In server actions, treat missing auth as an error.
  throw new Error('Admin session is not configured')
}


