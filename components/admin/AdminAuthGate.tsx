'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminAuthGateProps {
  children: React.ReactNode
  locale: string
}

export function AdminAuthGate({ children, locale }: AdminAuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/admin/session')
        const data = await response.json()

        if (!data.authenticated) {
          setIsAuthenticated(false)
          router.push(`/${locale}/admin/login`)
          return
        }

        setIsAuthenticated(true)
      } catch (_error) {
        // Not authenticated
        setIsAuthenticated(false)
        router.push(`/${locale}/admin/login`)
      }
    }

    void checkAuth()
  }, [locale, router])

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground dark:text-zinc-400">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}


