'use server'

import { translateMarkdown, translateText } from '@/lib/ai/translation-service'

export async function translateBlogContentAction({
  from,
  to,
  title,
  description,
  content,
}: {
  from: 'en' | 'es'
  to: 'en' | 'es'
  title: string
  description: string
  content: string
}) {
  try {
    const [translatedTitle, translatedDescription, translatedContent] =
      await Promise.all([
        translateText({ text: title, sourceLocale: from, targetLocale: to }),
        translateText({
          text: description,
          sourceLocale: from,
          targetLocale: to,
        }),
        translateMarkdown({ text: content, sourceLocale: from, targetLocale: to }),
      ])

    return {
      title: translatedTitle,
      description: translatedDescription,
      content: translatedContent,
    }
  } catch (error: any) {
    console.error('Error translating blog content:', error)
    throw new Error(error.message || 'Failed to translate content')
  }
}

export async function translateProjectContentAction({
  from,
  to,
  title,
  description,
  tags,
}: {
  from: 'en' | 'es'
  to: 'en' | 'es'
  title: string
  description: string
  tags: string[]
}) {
  try {
    const [translatedTitle, translatedDescription, translatedTags] =
      await Promise.all([
        translateText({ text: title, sourceLocale: from, targetLocale: to }),
        translateText({
          text: description,
          sourceLocale: from,
          targetLocale: to,
        }),
        Promise.all(
          tags.map((tag) =>
            translateText({ text: tag, sourceLocale: from, targetLocale: to })
          )
        ),
      ])

    return {
      title: translatedTitle,
      description: translatedDescription,
      tags: translatedTags,
    }
  } catch (error: any) {
    console.error('Error translating project content:', error)
    throw new Error(error.message || 'Failed to translate content')
  }
}

