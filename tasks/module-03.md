# Módulo 03: Footer Component

## Referencia de Diseño
El footer debe incluir:
- Links de redes sociales
- Información de contacto
- CTA para agendar reunión
- Copyright
- Links de navegación

---

## Tarea 3.1: Crear estructura base del Footer
**Objetivo**: Layout principal del footer

**Archivo**: `/components/layout/Footer.tsx`
```typescript
'use client'

import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/lib/config'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Branding y descripción */}
          <div className="space-y-4">
            {/* Se completará en siguiente tarea */}
          </div>

          {/* Columna 2: Navegación */}
          <div className="space-y-4">
            {/* Se completará en siguiente tarea */}
          </div>

          {/* Columna 3: Contacto */}
          <div className="space-y-4">
            {/* Se completará en siguiente tarea */}
          </div>

          {/* Columna 4: CTA */}
          <div className="space-y-4">
            {/* Se completará en siguiente tarea */}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright y redes sociales */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Se completará en siguiente tarea */}
        </div>
      </div>
    </footer>
  )
}
```

---

## Tarea 3.2: Crear sección de branding
**Objetivo**: Logo y descripción en el footer

**Archivo**: `/components/layout/footer/FooterBranding.tsx`
```typescript
'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

export function FooterBranding() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">D</span>
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {siteConfig.name}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs">
        {siteConfig.description}
      </p>
    </motion.div>
  )
}
```

---

## Tarea 3.3: Crear sección de navegación
**Objetivo**: Links rápidos en el footer

**Archivo**: `/components/layout/footer/FooterNavigation.tsx`
```typescript
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { navItems } from '@/lib/navigation'

export function FooterNavigation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground">Navegación</h3>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/color-history"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Historial de Colores
          </Link>
        </li>
      </ul>
    </motion.div>
  )
}
```

---

## Tarea 3.4: Crear sección de contacto
**Objetivo**: Información de contacto y redes sociales

**Archivo**: `/components/layout/footer/FooterContact.tsx`
```typescript
'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function FooterContact() {
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${siteConfig.links.email}`,
      text: siteConfig.links.email,
    },
    {
      icon: Github,
      label: 'GitHub',
      href: siteConfig.links.github,
      text: 'GitHub',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: siteConfig.links.linkedin,
      text: 'LinkedIn',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground">Contacto</h3>
      <ul className="space-y-3">
        {contactLinks.map((link) => {
          const Icon = link.icon
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>{link.text}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}
```

---

## Tarea 3.5: Crear sección CTA del footer
**Objetivo**: Call to action para agendar reunión

**Archivo**: `/components/layout/footer/FooterCTA.tsx`
```typescript
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function FooterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground">¿Trabajamos juntos?</h3>
      <p className="text-sm text-muted-foreground">
        Agenda una reunión y conversemos sobre tu proyecto
      </p>
      <Button
        asChild
        size="lg"
        className="w-full group"
      >
        <a
          href={siteConfig.calendarLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Agendar Reunión
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
    </motion.div>
  )
}
```

---

## Tarea 3.6: Crear iconos de redes sociales
**Objetivo**: Links animados de redes sociales

**Archivo**: `/components/layout/footer/SocialLinks.tsx`
```typescript
'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function SocialLinks() {
  const socials = [
    {
      icon: Github,
      href: siteConfig.links.github,
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: siteConfig.links.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: `mailto:${siteConfig.links.email}`,
      label: 'Email',
    },
  ]

  return (
    <div className="flex items-center space-x-4">
      {socials.map((social, index) => {
        const Icon = social.icon
        return (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.label !== 'Email' ? '_blank' : undefined}
            rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
            aria-label={social.label}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        )
      })}
    </div>
  )
}
```

---

## Tarea 3.7: Crear componente de copyright
**Objetivo**: Texto de copyright con año actual

**Archivo**: `/components/layout/footer/Copyright.tsx`
```typescript
'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export function Copyright() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex items-center space-x-2 text-sm text-muted-foreground"
    >
      <span>© {currentYear} {siteConfig.name}.</span>
      <span className="flex items-center">
        Hecho con
        <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500 animate-pulse" />
        y Next.js
      </span>
    </motion.div>
  )
}
```

---

## Tarea 3.8: Integrar todos los componentes en el Footer
**Objetivo**: Footer completo y funcional

**Archivo**: `/components/layout/Footer.tsx` (actualización completa)
```typescript
'use client'

import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { FooterBranding } from './footer/FooterBranding'
import { FooterNavigation } from './footer/FooterNavigation'
import { FooterContact } from './footer/FooterContact'
import { FooterCTA } from './footer/FooterCTA'
import { SocialLinks } from './footer/SocialLinks'
import { Copyright } from './footer/Copyright'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterBranding />
          <FooterNavigation />
          <FooterContact />
          <FooterCTA />
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <Copyright />
          <SocialLinks />
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"
      />
    </footer>
  )
}
```

---

## Tarea 3.9: Actualizar PageWrapper para incluir Footer
**Objetivo**: Agregar footer a todas las páginas

**Archivo**: `/components/layout/PageWrapper.tsx` (actualización)
```typescript
import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

---

## Tarea 3.10: Crear efecto de newsletter (opcional)
**Objetivo**: Sección de newsletter en el footer

**Archivo**: `/components/layout/footer/Newsletter.tsx`
```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Aquí iría la lógica para guardar el email
    // Por ahora solo simulamos el envío

    setTimeout(() => {
      toast({
        title: "¡Suscripción exitosa!",
        description: "Gracias por suscribirte a nuestro newsletter.",
      })
      setEmail('')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground">Newsletter</h3>
      <p className="text-sm text-muted-foreground">
        Recibe actualizaciones sobre nuevos proyectos
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            'Enviando...'
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Suscribirse
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
```

---

## Tarea 3.11: Agregar efecto parallax al footer
**Objetivo**: Animación suave al hacer scroll

**Archivo**: `/components/layout/Footer.tsx` (mejora opcional)
```typescript
// Agregar al inicio del componente Footer
'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])

  return (
    <motion.footer
      ref={ref}
      style={{ opacity, y }}
      className="bg-muted/50 border-t border-border mt-20"
    >
      {/* Resto del código del footer */}
    </motion.footer>
  )
}
```

---

## Tarea 3.12: Agregar modo oscuro toggle (opcional)
**Objetivo**: Botón para cambiar tema en el footer

**Archivo**: `/components/layout/footer/ThemeToggle.tsx`
```typescript
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
```

---

## Verificación Final del Módulo 03
- [ ] El footer se muestra correctamente en todas las páginas
- [ ] Todas las secciones del footer están presentes
- [ ] Los links de navegación funcionan
- [ ] Los links de redes sociales abren correctamente
- [ ] El botón CTA redirige a Calendly
- [ ] El copyright muestra el año actual
- [ ] Las animaciones se ejecutan al hacer scroll
- [ ] El footer es responsive en móvil
- [ ] La línea decorativa de gradiente se muestra

**Siguiente módulo**: `module-04-auth.md`