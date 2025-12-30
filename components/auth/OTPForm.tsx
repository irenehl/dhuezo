'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Smartphone } from 'lucide-react'

interface OTPFormProps {
  onSuccess?: () => void
}

export function OTPForm({ onSuccess }: OTPFormProps) {
  const { toast } = useToast()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Autenticación no disponible',
      description: 'Supabase ha sido removido del proyecto',
      variant: 'destructive',
    })
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Autenticación no disponible',
      description: 'Supabase ha sido removido del proyecto',
      variant: 'destructive',
    })
  }

  return (
    <form onSubmit={handleSendOTP} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Número de teléfono</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1234567890"
          required
          disabled
        />
        <p className="text-xs text-muted-foreground">
          Incluye el código de país (ej: +503)
        </p>
      </div>

      <Button type="submit" className="w-full" disabled>
        <Smartphone className="mr-2 h-4 w-4" />
        Enviar código (Deshabilitado)
      </Button>
    </form>
  )
}
