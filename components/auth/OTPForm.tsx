'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authService } from '@/lib/auth/auth-service'
import { useToast } from '@/components/ui/use-toast'
import { Smartphone, Loader2, CheckCircle } from 'lucide-react'

interface OTPFormProps {
  onSuccess?: () => void
}

export function OTPForm({ onSuccess }: OTPFormProps) {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'verify'>('phone')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await authService.sendOTP({ phone })

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        setStep('verify')
        toast({
          title: 'Código enviado',
          description: 'Revisa tus mensajes de texto',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo enviar el código',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await authService.verifyOTP({ phone, token: otp })

      if (error) {
        toast({
          title: 'Error',
          description: 'Código inválido',
          variant: 'destructive',
        })
      } else {
        toast({
          title: '¡Bienvenido!',
          description: 'Has iniciado sesión correctamente',
        })
        onSuccess?.()
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo verificar el código',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'verify') {
    return (
      <form onSubmit={handleVerifyOTP} className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="otp">Código de verificación</Label>
          <Input
            id="otp"
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={isLoading}
            maxLength={6}
          />
          <p className="text-xs text-muted-foreground">
            Enviado a {phone}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep('phone')}
            className="flex-1"
            disabled={isLoading}
          >
            Cambiar número
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            Verificar
          </Button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSendOTP} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Número de teléfono</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1234567890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Incluye el código de país (ej: +503)
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Smartphone className="mr-2 h-4 w-4" />
            Enviar código
          </>
        )}
      </Button>
    </form>
  )
}
