import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY
const openai = apiKey ? new OpenAI({ apiKey }) : null

export interface TranslateMarkdownParams {
  text: string
  sourceLocale: 'en' | 'es'
  targetLocale: 'en' | 'es'
}

/**
 * Translate Markdown content while preserving formatting, links, images, and code blocks
 */
export async function translateMarkdown({
  text,
  sourceLocale,
  targetLocale,
}: TranslateMarkdownParams): Promise<string> {
  if (!openai) {
    throw new Error('OpenAI API key is not configured')
  }

  if (sourceLocale === targetLocale) {
    return text
  }

  const sourceLang = sourceLocale === 'en' ? 'English' : 'Spanish'
  const targetLang = targetLocale === 'en' ? 'English' : 'Spanish'

  const systemPrompt = `You are a professional translator specializing in technical and content translation.

Your task is to translate Markdown content from ${sourceLang} to ${targetLang} while preserving ALL formatting, structure, and technical elements.

CRITICAL RULES:
1. Preserve ALL Markdown syntax exactly (headers, lists, links, images, code blocks, etc.)
2. Do NOT translate URLs, image URLs, or code content
3. Do NOT translate code block content (anything inside \`\`\` blocks)
4. Do NOT translate link URLs (only translate the link text if appropriate)
5. Preserve all special characters, formatting, and structure
6. Only translate the actual text content, not the Markdown syntax itself
7. Maintain the same Markdown structure and formatting

Return ONLY the translated Markdown content, nothing else.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      temperature: 0.3,
    })

    const translated = completion.choices[0]?.message?.content
    if (!translated) {
      throw new Error('No translation received from OpenAI')
    }

    return translated.trim()
  } catch (error) {
    console.error('Error translating markdown:', error)
    throw error
  }
}

/**
 * Translate plain text (for titles, descriptions, etc.)
 */
export async function translateText({
  text,
  sourceLocale,
  targetLocale,
}: TranslateMarkdownParams): Promise<string> {
  if (!openai) {
    throw new Error('OpenAI API key is not configured')
  }

  if (sourceLocale === targetLocale) {
    return text
  }

  const sourceLang = sourceLocale === 'en' ? 'English' : 'Spanish'
  const targetLang = targetLocale === 'en' ? 'English' : 'Spanish'

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate from ${sourceLang} to ${targetLang}. Return only the translation, nothing else.`,
        },
        { role: 'user', content: text },
      ],
      temperature: 0.3,
    })

    const translated = completion.choices[0]?.message?.content
    if (!translated) {
      throw new Error('No translation received from OpenAI')
    }

    return translated.trim()
  } catch (error) {
    console.error('Error translating text:', error)
    throw error
  }
}

