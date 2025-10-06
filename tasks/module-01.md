# Módulo 01: Configuración Inicial del Proyecto

## Tarea 1.1: Crear proyecto Next.js
**Objetivo**: Inicializar el proyecto Next.js con TypeScript y Tailwind

**Comandos**:
```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --eslint
cd portfolio
```

**Configuración durante la instalación**:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory: No
- ✅ App Router
- ✅ Import alias: `@/*`

**Verificación**: El proyecto debe arrancar con `npm run dev`

---

## Tarea 1.2: Instalar Shadcn UI
**Objetivo**: Configurar Shadcn UI como sistema de componentes

**Comando**:
```bash
npx shadcn-ui@latest init
```

**Configuración**:
- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind config: Yes

**Verificación**: Debe existir el archivo `components.json`

---

## Tarea 1.3: Instalar componentes base de Shadcn
**Objetivo**: Instalar componentes UI que usaremos

**Comandos**:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add separator
```

**Verificación**: Los componentes deben estar en `/components/ui/`

---

## Tarea 1.4: Instalar dependencias del proyecto
**Objetivo**: Instalar todas las librerías necesarias

**Comando**:
```bash
npm install framer-motion @supabase/supabase-js @supabase/ssr lucide-react date-fns react-hot-toast clsx tailwind-merge
```

**Verificación**: Revisar `package.json` que incluya todas las dependencias

---

## Tarea 1.5: Crear estructura de carpetas
**Objetivo**: Organizar el proyecto en carpetas modulares

**Estructura a crear**:
```
/app
  /api
  /experience
  /color-palette
  /color-history
  /gallery
  /events
/components
  /ui (ya existe de Shadcn)
  /layout
  /sections
  /shared
/lib
  /supabase
  /utils
  /ai
/public
  /images
/tasks (crear aquí todos los módulos)
/types
```

**Comando**:
```bash
mkdir -p app/api app/experience app/color-palette app/color-history app/gallery app/events
mkdir -p components/layout components/sections components/shared
mkdir -p lib/supabase lib/utils lib/ai
mkdir -p public/images
mkdir -p tasks
mkdir -p types
```

---

## Tarea 1.6: Configurar archivo de utilidades
**Objetivo**: Crear helpers de Tailwind

**Archivo**: `/lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
```

---

## Tarea 1.7: Configurar variables de entorno
**Objetivo**: Preparar configuración de Supabase

**Archivo**: `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=tu_proyecto_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
OPENAI_API_KEY=tu_openai_key
```

**Archivo**: `.env.example`
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_OPENAI_API_KEY=
```

**Nota**: Agregar `.env.local` al `.gitignore`

---

## Tarea 1.8: Crear cliente de Supabase (Browser)
**Objetivo**: Configurar Supabase para el cliente

**Archivo**: `/lib/supabase/client.ts`
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

---

## Tarea 1.9: Crear cliente de Supabase (Server)
**Objetivo**: Configurar Supabase para el servidor

**Archivo**: `/lib/supabase/server.ts`
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Server Component error
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Server Component error
          }
        },
      },
    }
  )
}
```

---

## Tarea 1.10: Crear middleware de autenticación
**Objetivo**: Proteger rutas que requieren autenticación

**Archivo**: `/middleware.ts`
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

---

## Tarea 1.11: Configurar tipos TypeScript
**Objetivo**: Definir tipos base del proyecto

**Archivo**: `/types/index.ts`
```typescript
export interface User {
  id: string
  email: string
  created_at: string
}

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export interface ColorHistory {
  id: string
  user_id: string | null
  prompt: string
  palette: ColorPalette
  created_at: string
}

export interface Experience {
  id: string
  title: string
  company: string
  description: string
  technologies: string[]
  start_date: string
  end_date: string | null
  image_url: string | null
}

export interface Event {
  id: string
  name: string
  date: string
  description: string
  image_url: string
  location: string
}

export interface SharedImage {
  id: string
  user_id: string
  image_url: string
  caption: string | null
  created_at: string
}
```

---

## Tarea 1.12: Crear archivo de configuración global
**Objetivo**: Centralizar configuración del sitio

**Archivo**: `/lib/config.ts`
```typescript
export const siteConfig = {
  name: "Tu Nombre",
  description: "Portfolio Personal - Desarrollador Full Stack",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  links: {
    github: "https://github.com/tuusuario",
    linkedin: "https://linkedin.com/in/tuusuario",
    email: "tu@email.com",
  },
  calendarLink: "https://calendly.com/tuusuario", // Para el CTA de reunión
}
```

---

## Tarea 1.13: Actualizar layout principal
**Objetivo**: Preparar el layout base con providers

**Archivo**: `/app/layout.tsx`
```typescript
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/lib/config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

---

## Verificación Final del Módulo 01
- [ ] El proyecto arranca sin errores con `npm run dev`
- [ ] Shadcn UI está instalado y configurado
- [ ] Todas las carpetas están creadas
- [ ] Los archivos de configuración de Supabase existen
- [ ] El archivo `.env.local` está configurado
- [ ] Los tipos TypeScript están definidos
- [ ] El middleware está creado

**Siguiente módulo**: `module-02-header.md`