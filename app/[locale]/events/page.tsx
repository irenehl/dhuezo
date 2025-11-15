import { PageWrapper } from '@/components/layout/PageWrapper'
import { EventsGalleryServer } from '@/components/events/EventsGalleryServer'
import { Calendar, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Eventos | Portfolio',
  description: 'Colección de eventos en los que he participado',
}

export default function EventsPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <Calendar className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Eventos & Conferencias
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Una colección de eventos, conferencias y meetups en los que he participado
          </p>
        </div>

        {/* Info Card */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Galería Estilo Polaroid</h3>
                <p className="text-sm text-muted-foreground">
                  Cada evento está representado como una foto polaroid con información clave.
                  Haz click en cualquier evento para ver detalles completos, incluyendo mi rol,
                  tecnologías utilizadas y más información sobre la experiencia.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Gallery */}
        <EventsGalleryServer />
      </div>
    </PageWrapper>
  )
}

