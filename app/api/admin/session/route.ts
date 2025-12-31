import { NextResponse } from 'next/server'
import { getAdminUser } from '@/lib/auth/admin-auth'

export async function GET() {
  try {
    const user = await getAdminUser()
    
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.$id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}

