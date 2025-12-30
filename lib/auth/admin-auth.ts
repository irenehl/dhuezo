import { account } from '@/lib/appwrite'
import type { Models } from 'appwrite'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

if (!ADMIN_EMAIL) {
  console.warn('ADMIN_EMAIL is not set in environment variables')
}

/**
 * Get the current Appwrite session user
 * Returns null if not authenticated or email doesn't match ADMIN_EMAIL
 */
export async function getAdminUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    const user = await account.get()
    
    if (!user || !user.email) {
      return null
    }

    // Check if email matches admin email
    if (ADMIN_EMAIL && user.email !== ADMIN_EMAIL) {
      return null
    }

    return user
  } catch (error) {
    // Not authenticated
    return null
  }
}

/**
 * Assert that the current user is authenticated and is the admin
 * Throws an error if not authenticated or not admin
 */
export async function assertAdminSession(): Promise<Models.User<Models.Preferences>> {
  const user = await getAdminUser()
  
  if (!user) {
    throw new Error('Unauthorized: Admin access required')
  }

  return user
}

