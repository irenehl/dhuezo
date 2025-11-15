'use client'

import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import type { Root, Paragraph, Image } from 'mdast'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// Remark plugin to unwrap images from paragraphs
function remarkUnwrapImages() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (
        parent &&
        typeof index === 'number' &&
        node.children.length === 1 &&
        node.children[0].type === 'image'
      ) {
        // Replace paragraph with just the image
        parent.children[index] = node.children[0] as Image
      }
    })
  }
}

interface MarkdownViewerProps {
  content: string
  className?: string
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    setCopied(true)
    toast({
      title: 'Copied!',
      description: 'Markdown content copied to clipboard',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('relative', className)}>
      <div className="absolute top-4 right-4 z-10">
        <CopyToClipboard text={content} onCopy={handleCopy}>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </CopyToClipboard>
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted prose-pre:border">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkUnwrapImages]}
          components={{
            code(props: any) {
              const { node, className, children, ...rest } = props
              const match = /language-(\w+)/.exec(className || '')
              // In react-markdown v10+, inline code doesn't have a language class
              const isInline = !match
              return !isInline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            img({ src, alt }) {
              if (!src) return null
              // Check if it's an external URL or relative path
              const isExternal = src.startsWith('http://') || src.startsWith('https://')
              
              return (
                <div className="my-6 flex justify-center">
                  <div className="relative w-full max-w-4xl rounded-lg overflow-hidden">
                    {isExternal ? (
                      // Use regular img for external URLs
                      <img
                        src={src}
                        alt={alt || 'Content image'}
                        className="w-full h-auto rounded-lg"
                        loading="lazy"
                      />
                    ) : (
                      // Use Next.js Image for internal URLs
                      <Image
                        src={src}
                        alt={alt || 'Content image'}
                        width={1200}
                        height={800}
                        className="w-full h-auto rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                    )}
                  </div>
                </div>
              )
            },
            a({ href, children }) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {children}
                </a>
              )
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

