import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { paletteServiceServer } from '@/lib/services/palette-service-server'
import { Palette, Users, UserX } from 'lucide-react'
import { Suspense } from 'react'

async function StatisticsContent() {
  const stats = await paletteServiceServer.getStatistics()

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
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
        )
      })}
    </div>
  )
}

function StatisticsSkeleton() {
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

export function HistoryStatisticsServer() {
  return (
    <Suspense fallback={<StatisticsSkeleton />}>
      <StatisticsContent />
    </Suspense>
  )
}

