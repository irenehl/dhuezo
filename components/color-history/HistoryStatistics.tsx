'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { paletteService } from '@/lib/services/palette-service'
import { Palette, Users, UserX } from 'lucide-react'
import { motion } from 'framer-motion'

export function HistoryStatistics() {
  const [stats, setStats] = useState({ totalPalettes: 0, authenticatedUsers: 0, anonymousUsers: 0 })
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
    { title: 'Total de Paletas', value: stats.totalPalettes, icon: Palette, color: 'text-blue-500' },
    { title: 'Usuarios Registrados', value: stats.authenticatedUsers, icon: Users, color: 'text-green-500' },
    { title: 'Usuarios Anónimos', value: stats.anonymousUsers, icon: UserX, color: 'text-orange-500' },
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
        const Icon = stat.icon as any
        return (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
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


