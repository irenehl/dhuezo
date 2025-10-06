# Módulo 02: Header Component

## Referencia de Diseño
El header debe verse como: https://gradi-blinds.learnframer.site/
- Fondo con blur/glassmorphism
- Logo a la izquierda
- Navegación al centro
- CTA de reunión a la derecha
- Sticky al hacer scroll

---

## Tarea 2.1: Crear componente base del Header
**Objetivo**: Estructura básica del header

**Archivo**: `/components/layout/Header.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar, Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Se completará en siguiente tarea */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              Logo
            </Link>
          </div>

          {/* Desktop Navigation - Se completará en siguiente tarea */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Navigation items */}
          </nav>

          {/* CTA Button - Se completará en siguiente tarea */}
          <div className="hidden md:flex items-center">
            {/* CTA */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Se completará en siguiente tarea */}
      </div>
    </motion.header>
  )
}
```

---

## Tarea 2.2: Crear componente de Logo
**Objetivo**: Logo animado con efecto hover

**Archivo**: `/components/layout/Logo.tsx`
```typescript
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Logo() {
  return (
    <Link href="/">
      <motion.div
        className="flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <span className="text-white font-bold text-xl">D</span>
        </motion.div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Portfolio
        </span>
      </motion.div>
    </Link>
  )
}
```

---

## Tarea 2.3: Crear items de navegación
**Objetivo**: Definir rutas y crear componente de navegación

**Archivo**: `/lib/navigation.ts`
```typescript
export interface NavItem {
  label: string
  href: string
  icon?: string
}

export const navItems: NavItem[] = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Experiencia',
    href: '/experience',
  },
  {
    label: 'Paleta de Colores',
    href: '/color-palette',
  },
  {
    label: 'Galería',
    href: '/gallery',
  },
  {
    label: 'Eventos',
    href: '/events',
  },
]
```

**Archivo**: `/components/layout/NavLinks.tsx`
```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { navItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface NavLinksProps {
  isMobile?: boolean
  onLinkClick?: () => void
}

export function NavLinks({ isMobile = false, onLinkClick }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <>
      {navItems.map((item, index) => {
        const isActive = pathname === item.href

        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                'relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                isActive ? 'text-primary' : 'text-muted-foreground',
                isMobile && 'block text-lg py-3'
              )}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId={isMobile ? 'mobile-active-nav' : 'desktop-active-nav'}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                />
              )}
            </Link>
          </motion.div>
        )
      })}
    </>
  )
}
```

---

## Tarea 2.4: Crear botón CTA para reunión
**Objetivo**: Botón animado que lleva a Calendly

**Archivo**: `/components/layout/CTAButton.tsx`
```typescript
'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

interface CTAButtonProps {
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

export function CTAButton({ variant = 'default', size = 'default' }: CTAButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant={variant}
        size={size}
        asChild
        className="group"
      >
        <a
          href={siteConfig.calendarLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Calendar className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
          Agendar Reunión
        </a>
      </Button>
    </motion.div>
  )
}
```

---

## Tarea 2.5: Crear menú móvil
**Objetivo**: Menú responsive con animación

**Archivo**: `/components/layout/MobileMenu.tsx`
```typescript
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { NavLinks } from './NavLinks'
import { CTAButton } from './CTAButton'
import { X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l border-border z-50 p-6"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            <nav className="mt-12 space-y-1">
              <NavLinks isMobile onLinkClick={onClose} />
            </nav>

            {/* CTA */}
            <div className="mt-8">
              <CTAButton variant="default" size="lg" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## Tarea 2.6: Integrar todos los componentes en el Header
**Objetivo**: Header completo y funcional

**Archivo**: `/components/layout/Header.tsx` (actualización completa)
```typescript
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import { CTAButton } from './CTAButton'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <NavLinks />
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <CTAButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
```

---

## Tarea 2.7: Crear componente wrapper de página
**Objetivo**: Layout que incluye el header automáticamente

**Archivo**: `/components/layout/PageWrapper.tsx`
```typescript
import { ReactNode } from 'react'
import { Header } from './Header'

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        {children}
      </main>
    </div>
  )
}
```

---

## Tarea 2.8: Actualizar página principal para usar el Header
**Objetivo**: Implementar el header en la home

**Archivo**: `/app/page.tsx`
```typescript
import { PageWrapper } from '@/components/layout/PageWrapper'

export default function Home() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold">Bienvenido a mi Portfolio</h1>
        <p className="mt-4 text-muted-foreground">
          Esta es la página principal. El header ya está funcionando.
        </p>
      </div>
    </PageWrapper>
  )
}
```

---

## Tarea 2.9: Agregar efectos de glassmorphism
**Objetivo**: Mejorar el estilo visual del header

**Archivo**: `/app/globals.css` (agregar al final)
```css
/* Glassmorphism effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}
```

---

## Tarea 2.10: Agregar indicador de usuario autenticado
**Objetivo**: Mostrar avatar si el usuario está logueado

**Archivo**: `/components/layout/UserAvatar.tsx`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/supabase/client'
import { User, LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function UserAvatar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  if (!user) return null

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const initials = user.email?.substring(0, 2).toUpperCase() || 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full">
          <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.user_metadata?.name || 'Usuario'}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Configuración
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## Verificación Final del Módulo 02
- [ ] El header se muestra correctamente
- [ ] El header tiene efecto sticky con blur al hacer scroll
- [ ] El logo está animado
- [ ] La navegación funciona correctamente
- [ ] El botón CTA redirige a Calendly
- [ ] El menú móvil se abre y cierra correctamente
- [ ] El avatar de usuario aparece si está autenticado
- [ ] Todas las animaciones funcionan suavemente

**Siguiente módulo**: `module-03-footer.md`