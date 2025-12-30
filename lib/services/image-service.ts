import type { SharedImage, UploadImageParams } from '@/types/shared-image'

export const imageService = {
  // Subir imagen
  async uploadImage({ file, caption }: UploadImageParams): Promise<SharedImage> {
    throw new Error('Image upload not available: Supabase has been removed')
  },

  // Obtener todas las imágenes
  async getAllImages(limit = 50): Promise<SharedImage[]> {
    return []
  },

  // Obtener imágenes de un usuario
  async getUserImages(userId: string): Promise<SharedImage[]> {
    return []
  },

  // Eliminar imagen
  async deleteImage(imageId: string, storagePath: string): Promise<void> {
    throw new Error('Image deletion not available: Supabase has been removed')
  },

  // Suscribirse a cambios en tiempo real
  subscribeToImages(callback: (image: SharedImage) => void) {
    // Return a no-op unsubscribe function
    return () => {}
  },
}
