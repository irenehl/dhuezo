export const siteConfig = {
  name: "Daniela Huezo",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  links: {
    github: "https://github.com/irenehl",
    linkedin: "https://www.linkedin.com/in/irenehl/",
    email: "dhuezodev26@gmail.com",
  },
  calendarLink: "https://calendar.app.google/jmaEeJNsbMWnj6jcA", // Para el CTA de reunión
  whatsappLink: "https://wa.me/50370956453", // Para el CTA de whatsapp
}

export function getSiteConfig(t: (key: string) => string) {
  return {
    ...siteConfig,
    description: t('site.description'),
  }
}

export function getHeroConfig(t: (key: string) => string) {
  return {
    greeting: t('hero.greeting'),
    name: t('hero.name'),
    role: t('hero.role'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    stats: [
      { value: 20, label: t('hero.stats.projects'), suffix: "+" },
      { value: 6, label: t('hero.stats.countries'), suffix: "+" },
      { value: 7, label: t('hero.stats.industries'), suffix: "+" }
    ],
    cta: {
      primary: { text: t('hero.cta.chat'), icon: "MessageCircle", action: siteConfig.whatsappLink },
      secondary: { text: t('hero.cta.meeting'), icon: "Calendar", link: siteConfig.calendarLink }
    }
  }
}
