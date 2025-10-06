export interface ColorPalette {
  id?: string
  user_id?: string
  prompt: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted: string
    border: string
  }
  primary_color: string
  secondary_color: string
  accent_color: string
  background_color: string
  text_color: string
  is_anonymous?: boolean
  anonymous_session_id?: string
  created_at?: string
}

export interface GeneratePaletteRequest {
  prompt: string
  userId?: string
  anonymousSessionId?: string
}

export interface GeneratePaletteResponse {
  palette: ColorPalette
  success: boolean
  error?: string
}


