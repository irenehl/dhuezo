'use client'

import { useTranslations } from 'next-intl'
import { trackPromptExample } from '@/lib/analytics/clarity'

export function PromptExamples() {
  const t = useTranslations()
  const examples = [
    t('promptExamples.happy'),
    t('promptExamples.nostalgic'),
    t('promptExamples.energetic'),
    t('promptExamples.relaxed'),
    t('promptExamples.professional'),
    t('promptExamples.creative'),
    t('promptExamples.minimalist'),
    t('promptExamples.vintage'),
  ]

  const handleClick = (example: string) => {
    // Track prompt example click
    trackPromptExample(example)
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('prompt-example', { detail: example }))
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {examples.map((example) => (
        <button
          key={example}
          className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
          onClick={() => handleClick(example)}
          type="button"
        >
          {example}
        </button>
      ))}
    </div>
  )
}


