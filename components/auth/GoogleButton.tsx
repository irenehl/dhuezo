'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export function GoogleButton() {
  const { toast } = useToast()

  const handleGoogleSignIn = () => {
    toast({
      title: 'Autenticación no disponible',
      description: 'Supabase ha sido removido del proyecto',
      variant: 'destructive',
    })
  }

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outline"
      className="w-full"
      disabled
    >
      Continuar con Google (Deshabilitado)
    </Button>
  )
}
