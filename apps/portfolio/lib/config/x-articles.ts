/**
 * X Articles Configuration
 * 
 * Add your X.com articles here. Each article should have:
 * - id: Unique identifier
 * - locale: 'en' | 'es'
 * - url: Full X.com URL (e.g., https://x.com/username/status/123456)
 * - title: Article title
 * - description: Article description/preview text
 * - date: Optional date string (ISO format or display format)
 */

export interface XArticle {
  id: string
  locale: 'en' | 'es'
  url: string
  title: string
  description: string
  date?: string
  previewImageUrl?: string
}

export const xArticlesConfig: XArticle[] = [
  {
    id: 'x-article-1',
    locale: 'en',
    url: 'https://x.com/irenehl26__/status/2010750606428791027?s=20',
    title: 'Microsoft Clarity + Taylor Swift + Sourdough bread',
    description: "ok… but why are these three in the same sentence? This isn't a post about Taylor Swift. Or sourdough bread. Or analytics. It's about what happens when you stop guessing and start watching.",
    date: '2025-12-01',
    previewImageUrl: '/x-article-one.png',
  },
  {
    id: 'x-article-1',
    locale: 'es',
    url: 'https://x.com/irenehl26__/status/2010750606428791027?s=20',
    title: 'Microsoft Clarity + Taylor Swift + Pan de masa madre',
    description: "ok… pero ¿por qué están estos tres en la misma oración? Esto no es una publicación sobre Taylor Swift. O pan de masa madre. O análisis. Se trata de lo que sucede cuando dejas de adivinar y empiezas a observar.",
    date: '2025-12-01',
    previewImageUrl: '/x-article-one.png',
  },
]

/**
 * Get X articles filtered by locale
 */
export function getXArticles(locale: 'en' | 'es'): XArticle[] {
  return xArticlesConfig
    .filter((article) => article.locale === locale)
    .sort((a, b) => {
      // Sort by date descending if dates exist, otherwise by id
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return a.id.localeCompare(b.id)
    })
}
