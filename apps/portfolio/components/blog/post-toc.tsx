'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

export function PostToc({ contentHtml }: { contentHtml: string }) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Parse headings from HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = contentHtml
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    const items: TocItem[] = []
    headings.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
      if (id) {
        items.push({
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1)),
        })
      }
    })
    
    setTocItems(items)
  }, [contentHtml])

  useEffect(() => {
    if (tocItems.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [tocItems])

  if (tocItems.length === 0) return null

  return (
    <aside
      className="hidden w-full min-w-0 xl:block xl:sticky xl:top-28 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto xl:pl-1 animate-in fade-in-50 duration-500"
      aria-label="Table of contents"
    >
      <nav className="border-border/28 border-l pl-4">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Content
        </h3>
        <ul className="space-y-1.5">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.id)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className={`block truncate text-xs transition-colors ${
                  activeId === item.id
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{
                  paddingLeft: `${Math.max(0, item.level - 2) * 0.75}rem`,
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

