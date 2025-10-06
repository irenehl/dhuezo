# Módulo 07: Historial de Paletas de Colores

## Objetivo
Crear una página que muestre el historial de todas las paletas generadas por usuarios (autenticados y anónimos), con capacidad de buscar, filtrar y aplicar paletas anteriores.

---

## Tarea 7.1: Crear servicio de historial de paletas
**Objetivo**: Funciones para obtener paletas históricas

**Archivo**: `/lib/services/palette-service.ts`
```typescript
import { createClient } from '@/lib/supabase/client'
import type { ColorPalette } from '@/types/color-palette'

const supabase = createClient()

export const paletteService = {
  // Obtener todas las paletas (paginado)
  async getAllPalettes(page = 1, limit = 20): Promise<{
    palettes: ColorPalette[]
    total: number
  }> {
    const start = (page - 1) * limit
    const end = start + limit - 1

    const { data, error, count } = await supabase
      .from('color_palettes')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(start, end)

    if (error) {
      console.error('Error fetching palettes:', error)
      return { palettes: [], total: 0 }
    }

    return {
      palettes: data as ColorPalette[],
      total: count || 0,
    }
  },

  // Obtener paletas del usuario actual
  async getUserPalettes(userId: string): Promise<ColorPalette[]> {
    const { data, error } = await supabase
      .from('color_palettes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user palettes:', error)
      return []
    }

    return data as ColorPalette[]
  },

  // Obtener paletas de sesión anónima
  async getAnonymousPalettes(sessionId: string): Promise<ColorPalette[]> {
    const { data, error } = await supabase
      .from('color_palettes')
      .select('*')
      .eq('anonymous_session_id', sessionId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching anonymous palettes:', error)
      return []
    }

    return data as ColorPalette[]
  },

  // Buscar paletas por prompt
  async searchPalettes(query: string): Promise<ColorPalette[]> {
    const { data, error } = await supabase
      .from('color_palettes')
      .select('*')
      .ilike('prompt', `%${query}%`)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error searching palettes:', error)
      return []
    }

    return data as ColorPalette[]
  },

  // Obtener paletas populares (más recientes)
  async getPopularPalettes(limit = 10): Promise<ColorPalette[]> {
    const { data, error } = await supabase
      .from('color_palettes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching popular palettes:', error)
      return []
    }

    return data as ColorPalette[]
  },

  // Obtener estadísticas
  async getStatistics(): Promise<{
    totalPalettes: number
    authenticatedUsers: number
    anonymousUsers: number
  }> {
    const { count: totalPalettes } = await supabase
      .from('color_palettes')
      .select('*', { count: 'exact', head: true })

    const { count: authenticatedUsers } = await supabase
      .from('color_palettes')
      .select('*', { count: 'exact', head: true })
      .not('user_id', 'is', null)

    const { count: anonymousUsers } = await supabase
      .from('color_palettes')
      .select('*', { count: 'exact', head: true })
      .eq('is_anonymous', true)

    return {
      totalPalettes: totalPalettes || 0,
      authenticatedUsers: authenticatedUsers || 0,
      anonymousUsers: anonymousUsers || 0,
    }
  },
}
```

---

## Tarea 7.2: Crear componente de tarjeta de paleta
**Objetivo**: Tarjeta para mostrar cada paleta en el historial

**Archivo**: `/components/color-history/PaletteCard.tsx`
```typescript
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Palette, User, Calendar, Check } from 'lucide-react'
import type { ColorPalette } from '@/types/color-palette'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useTheme } from '@/lib/context/ThemeContext'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

interface PaletteCardProps {
  palette: ColorPalette
  index: number
}

export function PaletteCard({ palette, index }: PaletteCardProps) {
  const { applyPalette, currentPalette } = useTheme()
  const { toast } = useToast()
  const [isApplied, setIsApplied] = useState(false)

  const handleApply = () => {
    applyPalette(palette)
    setIsApplied(true)
    toast({
      title: '¡Paleta aplicada!',
      description: `"${palette.prompt}" ahora es tu tema activo`,
    })
    setTimeout(() => setIsApplied(false), 2000)
  }

  const isCurrentPalette = currentPalette?.id === palette.id

  const colors = [
    palette.primary_color,
    palette.secondary_color,
    palette.accent_color,
    palette.background_color,
    palette.text_color,
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        {/* Color Preview */}
        <div className="h-24 flex">
          {colors.map((color, i) => (
            <div
              key={i}
              className="flex-1 transition-all hover:flex-[1.5]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Prompt */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <p className="font-semibold text-lg">&quot;{palette.prompt}&quot;</p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {palette.is_anonymous ? 'Anónimo' : 'Usuario'}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(palette.created_at || '')}
            </div>
          </div>

          {/* Actions */}
          <Button
            onClick={handleApply}
            className="w-full"
            variant={isCurrentPalette ? 'secondary' : 'default'}
            disabled={isCurrentPalette}
          >
            {isCurrentPalette ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Paleta Activa
              </>
            ) : isApplied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Aplicada!
              </>
            ) : (
              <>
                <Palette className="mr-2 h-4 w-4" />
                Aplicar Paleta
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

---

## Tarea 7.3: Crear barra de búsqueda y filtros
**Objetivo**: Componente para buscar paletas

**Archivo**: `/components/color-history/PaletteSearch.tsx`
```typescript
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface PaletteSearchProps {
  onSearch: (query: string) => void
  onFilterChange: (filter: 'all' | 'authenticated' | 'anonymous') => void
  currentFilter: 'all' | 'authenticated' | 'anonymous'
}

export function PaletteSearch({
  onSearch,
  onFilterChange,
  currentFilter,
}: PaletteSearchProps) {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por prompt..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <Button type="submit">Buscar</Button>
      </form>

      {/* Filters */}
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground">Filtrar:</span>
        <Badge
          variant={currentFilter === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => onFilterChange('all')}
        >
          Todas
        </Badge>
        <Badge
          variant={currentFilter === 'authenticated' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => onFilterChange('authenticated')}
        >
          Usuarios
        </Badge>
        <Badge
          variant={currentFilter === 'anonymous' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => onFilterChange('anonymous')}
        >
          Anónimos
        </Badge>
      </div>
    </div>
  )
}
```

---

## Tarea 7.4: Crear componente de estadísticas
**Objetivo**: Mostrar estadísticas del historial

**Archivo**: `/components/color-history/HistoryStatistics.tsx`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { paletteService } from '@/lib/services/palette-service'
import { Palette, Users, UserX, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export function HistoryStatistics() {
  const [stats, setStats] = useState({
    totalPalettes: 0,
    authenticatedUsers: 0,
    anonymousUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const data = await paletteService.getStatistics()
      setStats(data)
      setLoading(false)
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total de Paletas',
      value: stats.totalPalettes,
      icon: Palette,
      color: 'text-blue-500',
    },
    {
      title: 'Usuarios Registrados',
      value: stats.authenticatedUsers,
      icon: Users,
      color: 'text-green-500',
    },
    {
      title: 'Usuarios Anónimos',
      value: stats.anonymousUsers,
      icon: UserX,
      color: 'text-orange-500',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
```

---

## Tarea 7.5: Crear grid de historial de paletas
**Objetivo**: Grid responsivo con todas las paletas

**Archivo**: `/components/color-history/PaletteHistoryGrid.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import { paletteService } from '@/lib/services/palette-service'
import type { ColorPalette } from '@/types/color-palette'
import { PaletteCard } from './PaletteCard'
import { PaletteSearch } from './PaletteSearch'
import { Button } from '@/components/ui/button'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

export function PaletteHistoryGrid() {
  const [palettes, setPalettes] = useState<ColorPalette[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState<'all' | 'authenticated' | 'anonymous'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const pageSize = 12

  useEffect(() => {
    fetchPalettes()
  }, [page, filter])

  const fetchPalettes = async () => {
    setLoading(true)
    const { palettes: data, total: totalCount } = await paletteService.getAllPalettes(page, pageSize)
    
    // Aplicar filtros
    let filtered = data
    if (filter === 'authenticated') {
      filtered = data.filter((p) => !p.is_anonymous)
    } else if (filter === 'anonymous') {
      filtered = data.filter((p) => p.is_anonymous)
    }

    setPalettes(filtered)
    setTotal(totalCount)
    setLoading(false)
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setLoading(true)
      const results = await paletteService.searchPalettes(query)
      setPalettes(results)
      setLoading(false)
    } else {
      fetchPalettes()
    }
  }

  const handleFilterChange = (newFilter: 'all' | 'authenticated' | 'anonymous') => {
    setFilter(newFilter)
    setPage(1)
  }

  const totalPages = Math.ceil(total / pageSize)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <PaletteSearch
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        currentFilter={filter}
      />

      {/* Grid */}
      {palettes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery
              ? 'No se encontraron paletas con ese criterio de búsqueda'
              : 'No hay paletas disponibles'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {palettes.map((palette, index) => (
              <PaletteCard key={palette.id} palette={palette} index={index} />
            ))}
          </div>

          {/* Pagination */}
          {!searchQuery && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
```

---

## Tarea 7.6: Crear página de historial de colores
**Objetivo**: Página principal del historial

**Archivo**: `/app/color-history/page.tsx`
```typescript
import { PageWrapper } from '@/components/layout/PageWrapper'
import { PaletteHistoryGrid } from '@/components/color-history/PaletteHistoryGrid'
import { HistoryStatistics } from '@/components/color-history/HistoryStatistics'
import { History, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Historial de Paletas | Portfolio',
  description: 'Explora todas las paletas de colores generadas por la comunidad',
}

export default function ColorHistoryPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <History className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Historial de Paletas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explora todas las paletas de colores generadas por la comunidad y encuentra inspiración
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-12">
          <HistoryStatistics />
        </div>

        {/* Info Card */}
        <div className="mb-8 p-6 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start gap-4">
            <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">¿Cómo funciona?</h3>
              <p className="text-sm text-muted-foreground">
                Cada vez que alguien genera una paleta con IA, se guarda aquí. Puedes explorar
                las creaciones de otros usuarios, buscar por palabras clave, y aplicar cualquier
                paleta a tu experiencia en el sitio con solo un click.
              </p>
            </div>
          </div>
        </div>

        {/* History Grid */}
        <PaletteHistoryGrid />
      </div>
    </PageWrapper>
  )
}
```

---

## Tarea 7.7: Crear sección de "Mis Paletas"
**Objetivo**: Vista personal de paletas del usuario

**Archivo**: `/components/color-history/MyPalettes.tsx`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth/use-auth'
import { paletteService } from '@/lib/services/palette-service'
import type { ColorPalette } from '@/types/color-palette'
import { PaletteCard } from './PaletteCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Palette } from 'lucide-react'

export function MyPalettes() {
  const { user } = useAuth()
  const [palettes, setPalettes] = useState<ColorPalette[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserPalettes = async () => {
      if (user) {
        const data = await paletteService.getUserPalettes(user.id)
        setPalettes(data)
      } else {
        // Obtener paletas anónimas
        const sessionId = localStorage.getItem('anonymousSessionId')
        if (sessionId) {
          const data = await paletteService.getAnonymousPalettes(sessionId)
          setPalettes(data)
        }
      }
      setLoading(false)
    }

    fetchUserPalettes()
  }, [user])

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Mis Paletas
        </CardTitle>
        <CardDescription>
          {user
            ? 'Paletas que has creado con tu cuenta'
            : 'Paletas que has creado en esta sesión'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {palettes.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aún no has creado ninguna paleta
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {palettes.map((palette, index) => (
              <PaletteCard key={palette.id} palette={palette} index={index} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
```

---

## Tarea 7.8: Agregar "Mis Paletas" a la página
**Objetivo**: Integrar sección personal en la página

**Archivo**: `/app/color-history/page.tsx` (actualización)
```typescript
import { PageWrapper } from '@/components/layout/PageWrapper'
import { PaletteHistoryGrid } from '@/components/color-history/PaletteHistoryGrid'
import { HistoryStatistics } from '@/components/color-history/HistoryStatistics'
import { MyPalettes } from '@/components/color-history/MyPalettes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { History, Sparkles, User } from 'lucide-react'

export const metadata = {
  title: 'Historial de Paletas | Portfolio',
  description: 'Explora todas las paletas de colores generadas por la comunidad',
}

export default function ColorHistoryPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <History className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Historial de Paletas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explora todas las paletas de colores generadas por la comunidad y encuentra inspiración
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-12">
          <HistoryStatistics />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="all">
              <History className="mr-2 h-4 w-4" />
              Todas las Paletas
            </TabsTrigger>
            <TabsTrigger value="mine">
              <User className="mr-2 h-4 w-4" />
              Mis Paletas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Info Card */}
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start gap-4">
                <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">¿Cómo funciona?</h3>
                  <p className="text-sm text-muted-foreground">
                    Cada vez que alguien genera una paleta con IA, se guarda aquí. Puedes explorar
                    las creaciones de otros usuarios, buscar por palabras clave, y aplicar cualquier
                    paleta a tu experiencia en el sitio con solo un click.
                  </p>
                </div>
              </div>
            </div>

            {/* History Grid */}
            <PaletteHistoryGrid />
          </TabsContent>

          <TabsContent value="mine">
            <MyPalettes />
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  )
}
```

---

## Verificación Final del Módulo 07
- [ ] El servicio de historial funciona correctamente
- [ ] Las paletas se muestran en tarjetas
- [ ] La búsqueda por prompt funciona
- [ ] Los filtros (todos/usuarios/anónimos) funcionan
- [ ] Las estadísticas se muestran correctamente
- [ ] La paginación funciona
- [ ] Se pueden aplicar paletas desde el historial
- [ ] "Mis Paletas" muestra las paletas del usuario
- [ ] Los usuarios anónimos ven sus paletas de sesión
- [ ] El diseño es responsivo

**Siguiente módulo**: `module-08-image-sharing.md`