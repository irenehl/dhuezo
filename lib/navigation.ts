export interface NavItem {
  label: string
  href: string
  icon?: string
}

export const navItems: NavItem[] = [
  {
    label: 'Inicio',
    href: '/',
  },
  // {
  //   label: 'Experiencia',
  //   href: '/about',
  // },
  {
    label: 'Paleta de Colores',
    href: '/color-palette',
  },
  // {
  //   label: 'Galería',
  //   href: '/gallery',
  // },
  // {
  //   label: 'Eventos',
  //   href: '/events',
  // },
]
