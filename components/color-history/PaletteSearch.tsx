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

export function PaletteSearch({ onSearch, onFilterChange, currentFilter }: PaletteSearchProps) {
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
        <Badge variant={currentFilter === 'all' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => onFilterChange('all')}>Todas</Badge>
        <Badge variant={currentFilter === 'authenticated' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => onFilterChange('authenticated')}>Usuarios</Badge>
        <Badge variant={currentFilter === 'anonymous' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => onFilterChange('anonymous')}>Anónimos</Badge>
      </div>
    </div>
  )
}


