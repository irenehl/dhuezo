'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface EventFiltersProps {
  eventTypes: string[]
  roles: string[]
  selectedType: string | null
  selectedRole: string | null
  onTypeSelect: (type: string | null) => void
  onRoleSelect: (role: string | null) => void
}

export function EventFilters({
  eventTypes,
  roles,
  selectedType,
  selectedRole,
  onTypeSelect,
  onRoleSelect,
}: EventFiltersProps) {
  const hasFilters = selectedType || selectedRole

  const handleClearAll = () => {
    onTypeSelect(null)
    onRoleSelect(null)
  }

  return (
    <div className="space-y-6">
      {/* Clear All */}
      {hasFilters && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Filtros activos</span>
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            <X className="mr-2 h-4 w-4" />
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* Type Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Tipo de Evento</h3>
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <Badge
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              className="cursor-pointer capitalize hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onTypeSelect(selectedType === type ? null : type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Role Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Mi Rol</h3>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <Badge
              key={role}
              variant={selectedRole === role ? 'default' : 'outline'}
              className="cursor-pointer capitalize hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onRoleSelect(selectedRole === role ? null : role)}
            >
              {role}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

