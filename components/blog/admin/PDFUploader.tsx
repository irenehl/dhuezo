'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, Loader2, FileText } from 'lucide-react'
import { blogService } from '@/lib/services/blog-service'
import { useToast } from '@/components/ui/use-toast'

interface PDFUploaderProps {
  onPDFProcessed?: (pdfUrl: string, previewImages: string[]) => void
}

export function PDFUploader({ onPDFProcessed }: PDFUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const { toast } = useToast()

  const convertPDFToImages = async (file: File): Promise<string[]> => {
    try {
      // Load PDF.js from CDN to avoid webpack bundling issues
      // This is the most reliable way to avoid "Object.defineProperty called on non-object" errors
      if (!(window as any).pdfjsLib) {
        await new Promise<void>((resolve, reject) => {
          // Use the UMD build from jsDelivr which properly exposes pdfjsLib
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.min.js'
          script.onload = () => {
            // The UMD build exposes pdfjsLib globally
            // Wait a moment for it to initialize
            setTimeout(() => {
              if ((window as any).pdfjsLib) {
                resolve()
              } else {
                // Try alternative global names
                const pdfjs = (window as any).pdfjsLib || 
                             (window as any).pdfjs || 
                             (globalThis as any).pdfjsLib ||
                             (globalThis as any).pdfjs
                if (pdfjs) {
                  (window as any).pdfjsLib = pdfjs
                  resolve()
                } else {
                  reject(new Error('PDF.js library not found after loading'))
                }
              }
            }, 200)
          }
          script.onerror = () => reject(new Error('Failed to load PDF.js from CDN'))
          document.head.appendChild(script)
        })
      }

      const pdfjsLib = (window as any).pdfjsLib
      if (!pdfjsLib || typeof pdfjsLib.getDocument !== 'function') {
        throw new Error('PDF.js library not available. Please refresh the page.')
      }

      // Configure worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.min.js'
      
      const getDocument = pdfjsLib.getDocument

      const arrayBuffer = await file.arrayBuffer()
      
      // Load PDF document with proper error handling
      const loadingTask = getDocument({
        data: arrayBuffer,
        useSystemFonts: false,
        verbosity: 0, // Suppress console warnings
      })
      
      const pdf = await loadingTask.promise
      const images: string[] = []
      const maxPages = Math.min(pdf.numPages, 50) // Limit to 50 pages

      // Convert each page to an image
      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum)
          const viewport = page.getViewport({ scale: 2.0 })

          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          if (!context) {
            console.warn(`Could not get 2d context for page ${pageNum}`)
            continue
          }

          canvas.height = viewport.height
          canvas.width = viewport.width

          // Render page to canvas
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          } as any
          
          await page.render(renderContext).promise

          // Convert canvas to blob
          const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob)
                } else {
                  reject(new Error(`Failed to convert canvas to blob for page ${pageNum}`))
                }
              },
              'image/png',
              0.95 // Quality
            )
          })

          // Upload image to Supabase storage
          const imageFile = new File([blob], `page-${pageNum}.png`, { type: 'image/png' })
          const uploadResult = await blogService.uploadImage(imageFile)
          
          if (uploadResult?.url) {
            images.push(uploadResult.url)
          } else {
            console.warn(`Failed to upload page ${pageNum} image`)
          }
        } catch (pageError) {
          console.error(`Error processing page ${pageNum}:`, pageError)
          // Continue with next page instead of failing completely
          continue
        }
      }

      if (images.length === 0) {
        throw new Error('No pages were successfully converted to images')
      }

      return images
    } catch (error) {
      console.error('PDF conversion error:', error)
      throw error
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast({
        title: 'Error',
        description: 'Please select a PDF file',
        variant: 'destructive',
      })
      return
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'PDF size must be less than 50MB',
        variant: 'destructive',
      })
      return
    }

    setFileName(file.name)

    // Upload PDF first
    setUploading(true)
    try {
      const result = await blogService.uploadPDF(file)
      if (!result) {
        throw new Error('Upload failed')
      }

      setPdfUrl(result.url)

      // Convert PDF to images
      setProcessing(true)
      
      try {
        const images = await convertPDFToImages(file)
        setPreviewImages(images)
        
        if (images.length > 0) {
          toast({
            title: 'Success',
            description: `PDF uploaded and ${images.length} page${images.length > 1 ? 's' : ''} converted to images.`,
          })
        } else {
          toast({
            title: 'PDF Uploaded',
            description: 'PDF uploaded successfully, but no images were generated.',
            variant: 'destructive',
          })
        }
        
        onPDFProcessed?.(result.url, images)
      } catch (conversionError) {
        // PDF conversion failed, but upload succeeded
        console.warn('PDF conversion failed, but upload succeeded:', conversionError)
        const errorMessage = conversionError instanceof Error ? conversionError.message : 'Unknown error'
        toast({
          title: 'PDF Uploaded',
          description: `PDF uploaded successfully, but image conversion failed: ${errorMessage}. The PDF can still be downloaded.`,
          variant: 'destructive',
        })
        onPDFProcessed?.(result.url, [])
      }
    } catch (error) {
      console.error('Error processing PDF:', error)
      toast({
        title: 'Error',
        description: 'Failed to process PDF',
        variant: 'destructive',
      })
      setPdfUrl(null)
      setPreviewImages([])
      setFileName(null)
    } finally {
      setUploading(false)
      setProcessing(false)
    }
  }

  const handleRemove = () => {
    setPdfUrl(null)
    setPreviewImages([])
    setFileName(null)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pdf-upload">Upload PDF</Label>
        <div className="flex items-center gap-4">
          <Input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={uploading || processing}
            className="cursor-pointer"
          />
          {(uploading || processing) && <Loader2 className="h-4 w-4 animate-spin" />}
        </div>
      </div>

      {fileName && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <FileText className="h-5 w-5" />
          <span className="flex-1 text-sm">{fileName}</span>
          <Button variant="ghost" size="icon" onClick={handleRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {previewImages.length > 0 && (
        <div className="space-y-2">
          <Label>Preview Images ({previewImages.length} pages)</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {previewImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] rounded border overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-background/80 text-xs text-center p-1">
                  Page {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

