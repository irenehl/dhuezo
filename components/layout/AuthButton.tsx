'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AuthDialog } from '@/components/auth/AuthDialog'
import { UserAvatar } from './UserAvatar'
import { useAuth } from '@/lib/auth/use-auth'
import { LogIn, Loader2 } from 'lucide-react'

export function AuthButton() {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    )
  }

  if (user) {
    return <UserAvatar />
  }

  return (
    <>
      <Button
        variant="default"
        size="sm"
        onClick={() => setShowAuthDialog(true)}
      >
        <LogIn className="mr-2 h-4 w-4" />
        Iniciar Sesión
      </Button>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
      />
    </>
  )
}
