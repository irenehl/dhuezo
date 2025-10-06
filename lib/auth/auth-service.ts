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
