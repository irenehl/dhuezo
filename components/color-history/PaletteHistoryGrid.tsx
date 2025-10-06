'use client'

import { useState, useEffect, useCallback } from 'react'
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

  const fetchPalettes = useCallback(async () => {
    setLoading(true)
    const { palettes: data, total: totalCount } = await paletteService.getAllPalettes(page, pageSize)

    let filtered = data
    if (filter === 'authenticated') filtered = data.filter((p) => !p.is_anonymous)
    else if (filter === 'anonymous') filtered = data.filter((p) => p.is_anonymous)

    setPalettes(filtered)
    setTotal(totalCount)
    setLoading(false)
  }, [page, pageSize, filter])

  useEffect(() => {
    fetchPalettes()
  }, [fetchPalettes])

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
      <PaletteSearch onSearch={handleSearch} onFilterChange={handleFilterChange} currentFilter={filter} />

      {palettes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery ? 'No se encontraron paletas con ese criterio de búsqueda' : 'No hay paletas disponibles'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {palettes.map((palette, index) => (
              <PaletteCard key={palette.id || `${palette.prompt}-${index}`} palette={palette} index={index} />
            ))}
          </div>

          {!searchQuery && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
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


