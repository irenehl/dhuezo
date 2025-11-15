import { PageWrapper } from '@/components/layout/PageWrapper'
import { ImageUpload } from '@/components/gallery/ImageUpload'
import { RealtimeGallery } from '@/components/gallery/RealtimeGallery'
import { OnlineUsers } from '@/components/gallery/OnlineUsers'
import { Image as ImageIcon, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Galería en Tiempo Real | Portfolio',
  description: 'Comparte imágenes y ve en tiempo real lo que otros suben',
}

export default function GalleryPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <ImageIcon className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Galería en Tiempo Real
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comparte tus imágenes y observa en tiempo real lo que otros usuarios están subiendo
          </p>
        </div>

        {/* Online Users */}
        <div className="flex justify-center mb-8">
          <OnlineUsers />
        </div>

        {/* Realtime Info */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Actualización en Tiempo Real</h3>
                <p className="text-sm text-muted-foreground">
                  Esta galería utiliza WebSockets para mostrar instantáneamente las imágenes que
                  otros usuarios suben. No necesitas recargar la página para ver el contenido nuevo.
                  Solo usuarios autenticados pueden subir imágenes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        <div className="mb-12">
          <ImageUpload />
        </div>

        {/* Gallery */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Imágenes Compartidas</h2>
          <RealtimeGallery />
        </div>
      </div>
    </PageWrapper>
  )
}

