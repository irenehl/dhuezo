import { getTranslations } from 'next-intl/server'

import { getPublishedPostsWithMeta } from '@/lib/services/blog-helpers'
import { projectContentService } from '@/lib/services/project-content-service'
import type { CommandPaletteItem } from '@/types/command-palette'

export type { CommandPaletteItem, CommandPaletteItemGroup } from '@/types/command-palette'

export async function getCommandPaletteItems(
  locale: string,
): Promise<CommandPaletteItem[]> {
  const t = await getTranslations({ locale, namespace: 'commandPalette' })

  const nav: CommandPaletteItem[] = [
    {
      id: 'nav-intro',
      group: 'nav',
      label: t('nav.intro'),
      hint: t('navHint'),
      href: `/${locale}#intro`,
      keywords: ['home', 'inicio'],
    },
    {
      id: 'nav-projects',
      group: 'nav',
      label: t('nav.projects'),
      hint: t('navHint'),
      href: `/${locale}#projects`,
      keywords: ['work', 'trabajo'],
    },
    {
      id: 'nav-skills',
      group: 'nav',
      label: t('nav.skills'),
      hint: t('navHint'),
      href: `/${locale}#skills`,
      keywords: ['stack', 'technologies', 'tecnologías'],
    },
    {
      id: 'nav-experience',
      group: 'nav',
      label: t('nav.experience'),
      hint: t('navHint'),
      href: `/${locale}#experience`,
      keywords: ['timeline', 'career', 'trayectoria'],
    },
    {
      id: 'nav-writing',
      group: 'nav',
      label: t('nav.writing'),
      hint: t('navHint'),
      href: `/${locale}#stage`,
      keywords: ['blog', 'articles', 'artículos', 'stage'],
    },
    {
      id: 'nav-about',
      group: 'nav',
      label: t('nav.about'),
      hint: t('navHint'),
      href: `/${locale}#about`,
      keywords: ['contact', 'contacto'],
    },
    {
      id: 'nav-blog',
      group: 'nav',
      label: t('nav.blogArchive'),
      hint: t('blogHint'),
      href: `/${locale}/blog`,
      keywords: ['posts', 'writing', 'archive'],
    },
  ]

  const items: CommandPaletteItem[] = [...nav]

  try {
    const projects = await projectContentService.getAllProjects(
      locale as 'en' | 'es',
    )
    const sorted = [...projects].sort((a, b) => a.order_index - b.order_index)
    for (const p of sorted) {
      const href =
        p.skip_detail_page && p.deployed_url
          ? p.deployed_url
          : p.skip_detail_page && p.repo_url
            ? p.repo_url
            : `/${locale}/projects/${p.project_id}`
      items.push({
        id: `project-${p.project_id}`,
        group: 'project',
        label: p.title,
        hint: t('openProject'),
        href,
        keywords: [...(p.tags ?? [])],
      })
    }
  } catch {
    // Markdown / content optional
  }

  try {
    const posts = await getPublishedPostsWithMeta(locale, 20)
    for (const post of posts) {
      items.push({
        id: `post-${post.slug}`,
        group: 'post',
        label: post.title,
        hint: t('openPost'),
        href: `/${locale}/blog/${post.slug}`,
        keywords: post.tags ?? [],
      })
    }
  } catch {
    // Blog optional
  }

  return items
}
