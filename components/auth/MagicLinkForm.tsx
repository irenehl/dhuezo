'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Mail } from 'lucide-react'

interface MagicLinkFormProps {
  onSuccess?: () => void
}

export function MagicLinkForm({ onSuccess }: MagicLinkFormProps) {
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Autenticación no disponible',
      description: 'Supabase ha sido removido del proyecto',
      variant: 'destructive',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          required
          disabled
        />
      </div>

      <Button type="submit" className="w-full" disabled>
        <Mail className="mr-2 h-4 w-4" />
        Enviar Magic Link (Deshabilitado)
      </Button>
    </form>
  )
}
