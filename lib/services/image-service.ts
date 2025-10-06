import { createClient } from '@/lib/supabase/client'
import type { SharedImage, UploadImageParams } from '@/types/shared-image'

const supabase = createClient()

export const imageService = {
  // Subir imagen
  async uploadImage({ file, caption }: UploadImageParams): Promise<SharedImage> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    // Generar nombre único
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    const filePath = `${user.id}/${fileName}`

    // Subir a Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('shared-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) throw uploadError

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('shared-images')
      .getPublicUrl(filePath)

    // Guardar metadata en la base de datos
    const { data: imageData, error: dbError } = await supabase
      .from('shared_images')
      .insert({
        user_id: user.id,
        image_url: publicUrl,
        storage_path: filePath,
        caption: caption || null,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
      })
      .select()
      .single()

    if (dbError) {
      // Si falla el insert, eliminar imagen del storage
      await supabase.storage.from('shared-images').remove([filePath])
      throw dbError
    }

    return imageData as SharedImage
  },

  // Obtener todas las imágenes
  async getAllImages(limit = 50): Promise<SharedImage[]> {
    const { data, error } = await supabase
      .from('shared_images')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching images:', error)
      return []
    }

    return data as SharedImage[]
  },

  // Obtener imágenes de un usuario
  async getUserImages(userId: string): Promise<SharedImage[]> {
    const { data, error } = await supabase
      .from('shared_images')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user images:', error)
      return []
    }

    return data as SharedImage[]
  },

  // Eliminar imagen
  async deleteImage(imageId: string, storagePath: string): Promise<void> {
    // Eliminar de storage
    const { error: storageError } = await supabase.storage
      .from('shared-images')
      .remove([storagePath])

    if (storageError) throw storageError

    // Eliminar de base de datos
    const { error: dbError } = await supabase
      .from('shared_images')
      .delete()
      .eq('id', imageId)

    if (dbError) throw dbError
  },

  // Suscribirse a cambios en tiempo real
  subscribeToImages(callback: (image: SharedImage) => void) {
    const channel = supabase
      .channel('shared-images-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'shared_images',
        },
        (payload: any) => {
          callback(payload.new as SharedImage)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  },
}
