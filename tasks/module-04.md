# Módulo 04: Sistema de Autenticación con Supabase

## Objetivo
Implementar autenticación con:
- Magic Link (email)
- Google OAuth
- OTP (código de verificación)

---

## Tarea 4.1: Configurar Supabase Auth
**Objetivo**: Preparar las tablas y configuración en Supabase

**Instrucciones para Supabase Dashboard**:

1. Ir a Authentication > Providers
2. Habilitar:
   - Email (Magic Link)
   - Google OAuth
   - Phone (para OTP)

3. Ejecutar este SQL en SQL Editor:

```sql
-- Crear tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Función para crear perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## Tarea 4.2: Configurar Google OAuth
**Objetivo**: Obtener credenciales de Google

**Pasos**:
1. Ir a Google Cloud Console
2. Crear nuevo proyecto
3. Habilitar Google+ API
4. Crear credenciales OAuth 2.0
5. Agregar URLs autorizadas:
   - `http://localhost:3000`
   - `https://<tu-proyecto>.supabase.co/auth/v1/callback`

6. Copiar Client ID y Client Secret
7. Pegarlos en Supabase Dashboard > Authentication > Providers > Google

---

## Tarea 4.3: Crear tipos de autenticación
**Objetivo**: Definir tipos TypeScript para auth

**Archivo**: `/types/auth.ts`
```typescript
export type AuthProvider = 'google' | 'magic_link' | 'otp'

export interface AuthState {
  user: any | null
  loading: boolean
  error: string | null
}

export interface SignInWithMagicLinkParams {
  email: string
  redirectTo?: string
}

export interface SignInWithOTPParams {
  phone: string
}

export interface VerifyOTPParams {
  phone: string
  token: string
}
```

---

## Tarea 4.4: Crear servicio de autenticación
**Objetivo**: Centralizar lógica de auth

**Archivo**: `/lib/auth/auth-service.ts`
```typescript
import { createClient } from '@/lib/supabase/client'
import type {
  SignInWithMagicLinkParams,
  SignInWithOTPParams,
  VerifyOTPParams,
} from '@/types/auth'

const supabase = createClient()

export const authService = {
  // Sign in con Google
  async signInWithGoogle(redirectTo?: string) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    })
    return { data, error }
  },

  // Sign in con Magic Link
  async signInWithMagicLink({ email, redirectTo }: SignInWithMagicLinkParams) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    })
    return { data, error }
  },

  // Enviar OTP
  async sendOTP({ phone }: SignInWithOTPParams) {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    })
    return { data, error }
  },

  // Verificar OTP
  async verifyOTP({ phone, token }: VerifyOTPParams) {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obtener usuario actual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Obtener sesión actual
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },
}
```

---

## Tarea 4.5: Crear hook de autenticación
**Objetivo**: Hook personalizado para usar auth en componentes

**Archivo**: `/lib/auth/use-auth.ts`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Obtener usuario inicial
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    // Escuchar cambios en auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
  }
}
```

---

## Tarea 4.6: Crear componente de diálogo de auth
**Objetivo**: Modal con opciones de autenticación

**Archivo**: `/components/auth/AuthDialog.tsx`
```typescript
'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MagicLinkForm } from './MagicLinkForm'
import { OTPForm } from './OTPForm'
import { GoogleButton } from './GoogleButton'
import { Separator } from '@/components/ui/separator'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>
            Elige tu método preferido para autenticarte
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Google Sign In */}
          <GoogleButton />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O continúa con
              </span>
            </div>
          </div>

          {/* Tabs para Magic Link y OTP */}
          <Tabs defaultValue="magic-link" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
              <TabsTrigger value="otp">Código OTP</TabsTrigger>
            </TabsList>

            <TabsContent value="magic-link">
              <MagicLinkForm onSuccess={() => onOpenChange(false)} />
            </TabsContent>

            <TabsContent value="otp">
              <OTPForm onSuccess={() => onOpenChange(false)} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

---

## Tarea 4.7: Crear botón de Google Sign In
**Objetivo**: Componente para autenticación con Google

**Archivo**: `/components/auth/GoogleButton.tsx`
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { authService } from '@/lib/auth/auth-service'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

export function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const { error } = await authService.signInWithGoogle()

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al iniciar sesión',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      variant="outline"
      className="w-full"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
      )}
      Continuar con Google
    </Button>
  )
}
```

---

## Tarea 4.8: Crear formulario de Magic Link
**Objetivo**: Formulario para enviar magic link por email

**Archivo**: `/components/auth/MagicLinkForm.tsx`
```typescript
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
```

---

## Tarea 4.9: Crear formulario de OTP
**Objetivo**: Formulario para enviar y verificar código OTP

**Archivo**: `/components/auth/OTPForm.tsx`
```typescript
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
```

---

## Tarea 4.10: Crear página de callback
**Objetivo**: Manejar el redirect después de auth

**Archivo**: `/app/auth/callback/route.ts`
```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL(next, request.url))
}
```

---

## Tarea 4.11: Crear botón de login en el header
**Objetivo**: Integrar auth dialog en el header

**Archivo**: `/components/layout/AuthButton.tsx`
```typescript
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
```

---

## Tarea 4.12: Actualizar Header con AuthButton
**Objetivo**: Agregar botón de auth al header

**Archivo**: `/components/layout/Header.tsx` (actualización)
```typescript
// Agregar import
import { AuthButton } from './AuthButton'

// En el Desktop CTA section, reemplazar:
<div className="hidden md:flex items-center space-x-4">
  <AuthButton />
  <CTAButton />
</div>
```

---

## Tarea 4.13: Crear middleware para rutas protegidas
**Objetivo**: Proteger rutas que requieren autenticación

**Archivo**: `/lib/auth/protected-route.tsx`
```typescript
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './use-auth'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  redirectTo = '/',
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
```

---

## Tarea 4.14: Crear componente de perfil de usuario
**Objetivo**: Página para ver y editar perfil

**Archivo**: `/components/auth/UserProfile.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth/use-auth'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

export function UserProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || '')
      setAvatarUrl(user.user_metadata?.avatar_url || '')
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id)

      if (error) throw error

      toast({
        title: 'Perfil actualizado',
        description: 'Tus cambios han sido guardados',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el perfil',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  const initials = user.email?.substring(0, 2).toUpperCase() || 'U'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi Perfil</CardTitle>
        <CardDescription>
          Administra tu información personal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium">{user.email}</h3>
              <p className="text-sm text-muted-foreground">
                {user.user_metadata?.provider || 'Email'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatarUrl">URL del Avatar</Label>
            <Input
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://ejemplo.com/avatar.jpg"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar cambios'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

---

## Verificación Final del Módulo 04
- [ ] Supabase Auth está configurado correctamente
- [ ] Google OAuth funciona
- [ ] Magic Link se envía correctamente
- [ ] OTP se envía y verifica correctamente
- [ ] El AuthDialog se muestra y cierra correctamente
- [ ] El botón de login aparece en el header
- [ ] El avatar del usuario se muestra cuando está autenticado
- [ ] El callback de auth funciona
- [ ] Las rutas protegidas redirigen correctamente
- [ ] El perfil de usuario se puede editar

**Siguiente módulo**: `module-05-experience.md`