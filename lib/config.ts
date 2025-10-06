export const siteConfig = {
  name: "Daniela Huezo",
  description: "Desarrolladora Full Stack",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  links: {
    github: "https://github.com/irenehl",
    linkedin: "https://www.linkedin.com/in/irenehl/",
    email: "dhuezodev26@gmail.com",
  },
  calendarLink: "https://calendar.app.google/jmaEeJNsbMWnj6jcA", // Para el CTA de reunión
  whatsappLink: "https://wa.me/50370956453", // Para el CTA de whatsapp
}

export const heroConfig = {
  greeting: "Hola!👋🏻 ¿Listo para lanzar tu siguiente producto?",
  name: "Daniela Huezo",
  role: "Full Stack Developer",
  tagline: "Una desarrolladora que transforma ideas en productos digitales impactantes — con +5 años de experiencia",
  description: "Creo experiencias digitales sin complicaciones — combinando diseño limpio con código sólido. Desde startups hasta equipos establecidos, ayudo a transformar ideas ambiciosas en aplicaciones web rápidas, hermosas y escalables.",
  stats: [
    { value: 20, label: "Proyectos", suffix: "+" },
    { value: 6, label: "Países", suffix: "+" },
    { value: 7, label: "Industrias", suffix: "+" }
  ],
  cta: {
    primary: { text: "Chat en tiempo real", icon: "MessageCircle", action: siteConfig.whatsappLink },
    secondary: { text: "Agendar una reunión", icon: "Calendar", link: siteConfig.calendarLink }
  }
}
