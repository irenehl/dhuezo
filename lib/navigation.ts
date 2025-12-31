import { Locale } from '@/i18n/config'

export interface NavItem {
  label: string
  href: string
  icon?: string
  isAnchor?: boolean
}

export function getNavItems(t: (key: string) => string, locale: Locale): NavItem[] {
  return [
    {
      label: t('navigation.projects'),
      href: `/${locale}#projects`,
      isAnchor: true,
    },
    {
      label: t('navigation.stage'),
      href: `/${locale}#stage`,
      isAnchor: true,
    },
    {
      label: t('navigation.timeline'),
      href: `/${locale}#timeline`,
      isAnchor: true,
    },
    {
      label: t('navigation.about'),
      href: `/${locale}#about`,
      isAnchor: true,
    },
  ]
}
