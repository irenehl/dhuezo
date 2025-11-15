import { Locale } from '@/i18n/config'

export interface NavItem {
  label: string
  href: string
  icon?: string
}

export function getNavItems(t: (key: string) => string, locale: Locale): NavItem[] {
  return [
    {
      label: t('navigation.home'),
      href: '/',
    },
    // {
    //   label: t('navigation.about'),
    //   href: '/about',
    // },
    {
      label: t('navigation.colorPalette'),
      href: '/color-palette',
    },
    {
      label: t('navigation.blog'),
      href: '/blog',
    },
    // {
    //   label: t('navigation.gallery'),
    //   href: '/gallery',
    // },
    // {
    //   label: t('navigation.events'),
    //   href: '/events',
    // },
  ]
}
