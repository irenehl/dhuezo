import type { useTranslations } from 'next-intl'

type MessageTranslator = ReturnType<typeof useTranslations>

export interface NavItem {
  label: string
  href: string
  pathPattern: string // used to determine active state
  icon?: string
}

export function getNavItems(t: MessageTranslator): NavItem[] {
  // hrefs must be locale-neutral paths: `Link` from `@/i18n/routing` (next-intl)
  // already prefixes the active locale. Using `/${locale}/…` duplicates the segment
  // (e.g. `/en/en/projects` → 404).
  return [
    {
      label: t('navigation.timeline', { default: 'Experience' }),
      href: '/',
      pathPattern: '/',
    },
    {
      label: t('navigation.projects', { default: 'Projects' }),
      href: '/projects',
      pathPattern: '/projects',
    },
    {
      label: t('navigation.blog', { default: 'Blog' }),
      href: '/blog',
      pathPattern: '/blog',
    },
    {
      label: t('navigation.about', { default: 'About' }),
      href: '/about',
      pathPattern: '/about',
    },
  ]
}
