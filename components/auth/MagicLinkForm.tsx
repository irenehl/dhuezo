'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authService } from '@/lib/auth/auth-service'
import { useToast } from '@/components/ui/use-toast'
import { Mail, Loader2, CheckCircle } from 'lucide-react'

interface MagicLinkFormProps {
  onSuccess?: () => void
}

export function MagicLinkForm({ onSuccess }: MagicLinkFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await authService.signInWithMagicLink({ email })

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        setIsSuccess(true)
        toast({
          title: '¡Magic Link enviado!',
          description: 'Revisa tu email para iniciar sesión',
        })
        setTimeout(() => {
          onSuccess?.()
        }, 2000)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo enviar el magic link',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <div className="text-center space-y-2">
          <h3 className="font-semibold">¡Revisa tu email!</h3>
          <p className="text-sm text-muted-foreground">
            Te hemos enviado un link de acceso a <strong>{email}</strong>
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Enviar Magic Link
          </>
        )}
      </Button>
    </form>
  )
}
