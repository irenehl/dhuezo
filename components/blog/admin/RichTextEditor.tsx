'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MarkdownViewer } from '../MarkdownViewer'

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your description here...',
  minHeight = '200px',
}: RichTextEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const colorMode = mounted && (resolvedTheme === 'dark' || theme === 'dark') ? 'dark' : 'light'

  return (
    <div className="space-y-2">
      <Tabs value={mode} onValueChange={(v) => setMode(v as 'edit' | 'preview')}>
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="mt-4">
          <div data-color-mode={colorMode}>
            <MDEditor
              value={value}
              onChange={(val) => onChange(val || '')}
              preview="edit"
              hideToolbar={false}
              visibleDragbar={false}
              textareaProps={{
                placeholder,
                style: {
                  fontSize: 14,
                  minHeight,
                },
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="preview" className="mt-4">
          <div className="border rounded-lg p-4" style={{ minHeight }}>
            {value ? (
              <MarkdownViewer content={value} />
            ) : (
              <p className="text-muted-foreground">No content to preview</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

