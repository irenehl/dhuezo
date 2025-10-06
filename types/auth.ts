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
