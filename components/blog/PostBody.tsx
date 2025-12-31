import { cn } from '@/lib/utils'

interface PostBodyProps {
  contentHtml: string
  className?: string
}

export function PostBody({ contentHtml, className }: PostBodyProps) {
  return (
    <div
      className={cn(
        'prose prose-slate dark:prose-invert max-w-none',
        'prose-headings:font-bold prose-headings:text-foreground',
        'prose-p:text-foreground prose-p:leading-relaxed',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-foreground',
        'prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
        'prose-pre:bg-muted prose-pre:border prose-pre:border-border',
        'prose-ul:list-disc prose-ol:list-decimal',
        'prose-li:my-2',
        'prose-img:rounded-lg prose-img:my-6',
        className
      )}
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  )
}



