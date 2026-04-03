'use client'

import { useTranslations } from 'next-intl'
import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { XIcon } from '@/components/icons/XIcon'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { SectionChapter } from '@/components/ui/SectionChapter'

export function AboutSection() {
  const t = useTranslations()

  const favorites = [
    {
      name: t('about.favorites.animalCrossing', { default: 'Animal Crossing' }),
      icon: (
        <svg
          className="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </svg>
      ),
    },
    {
      name: t('about.favorites.pokemon', { default: 'Pokémon' }),
      icon: (
        <svg
          className="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
      ),
    },
    {
      name: t('about.favorites.ramen', { default: 'Ramen spots' }),
      icon: (
        <svg
          className="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        </svg>
      ),
    },
    {
      name: t('about.favorites.fitness', { default: 'Fitness' }),
      icon: (
        <svg
          className="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
        </svg>
      ),
    },
    {
      name: t('about.favorites.taylorSwift', { default: 'Taylor Swift' }),
      icon: (
        <svg
          className="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10 8 16 12 10 16 10 8"></polygon>
        </svg>
      ),
    },
    {
      name: t('about.favorites.marketing', { default: 'Marketing strategy' }),
      icon: (
        <svg
          className="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      ),
    },
  ]

  const socialLinks = [
    {
      href: t('about.social.github', { default: 'https://github.com/irenehl' }),
      icon: Github,
      label: 'GitHub',
    },
    {
      href: t('about.social.linkedin', {
        default: 'https://linkedin.com/in/danielahuezo',
      }),
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: t('about.social.x', { default: 'https://x.com/irenehl26__' }),
      icon: XIcon,
      label: 'X',
    },
    {
      href: t('about.social.instagram', {
        default: 'https://instagram.com/irenehl__',
      }),
      icon: InstagramIcon,
      label: 'Instagram',
    },
  ]

  return (
    <section
      id="about"
      className="relative scroll-mt-header overflow-hidden border-t border-border/40 bg-card py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_20%_80%,hsl(var(--primary)/0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.006] md:opacity-[0.014]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <SectionChapter
            variant="immersive"
            sceneIndex="07"
            label={t('sections.chapter.about')}
            title={t('about.title', { default: 'About' })}
            description={t('about.subtitle', { default: 'Get to Know Me' })}
          />
        </motion.div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-stretch md:gap-5">
          <motion.blockquote
            className="relative col-span-1 rounded-3xl border border-border/60 bg-background/70 p-8 shadow-[0_16px_48px_-24px_hsl(var(--pressed-brown)/0.12)] backdrop-blur-sm md:col-span-12 md:p-10 dark:bg-card/50"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-accent text-3xl leading-snug text-primary md:text-4xl">
              {t('about.pullQuote', {
                default:
                  '“Systems that survive real load — and communities that make room for more voices in tech.”',
              })}
            </span>
          </motion.blockquote>

          <div className="col-span-1 flex min-h-0 flex-col gap-4 md:col-span-8">
            <motion.div
              className="rounded-2xl border border-border/50 bg-background/60 p-6 backdrop-blur-sm dark:bg-card/40"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('about.description2', {
                  default:
                    "When I'm not solving technical problems, I'm building communities and helping more women across Central America find their place in tech.",
                })}
              </p>
            </motion.div>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                {t('about.favorites.title', { default: 'Currently Into' })}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {favorites.map((favorite, index) => (
                  <motion.div
                    key={favorite.name}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-border/50 bg-card/70 px-3 py-4 text-center transition-colors hover:border-primary/40 hover:bg-card"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.35 }}
                  >
                    <div className="text-primary">{favorite.icon}</div>
                    <span className="text-sm font-medium leading-tight text-foreground">
                      {favorite.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="col-span-1 flex min-h-0 flex-col justify-between gap-6 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 p-6 md:col-span-4 md:h-full"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t('about.connectLabel', { default: 'Say hello' })}
              </p>
              <motion.a
                href="https://calendar.app.google/Q65Hgz9cCqa2m1Ei9"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-4 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground sm:w-auto"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.55 }}
                />
                <Mail className="relative z-10 size-5" />
                <span className="relative z-10">
                  {t('about.cta', { default: "Let's Connect" })}
                </span>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ boxShadow: '0 0 0 0 rgba(var(--primary-rgb), 0)' }}
                  whileHover={{
                    boxShadow: '0 8px 24px -4px rgba(var(--primary-rgb), 0.4)',
                  }}
                  style={{ '--primary-rgb': '212, 165, 196' } as React.CSSProperties}
                />
              </motion.a>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t('about.socialLabel', { default: 'Elsewhere' })}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border-2 border-border bg-background/80 p-2.5 text-foreground transition-colors hover:border-pressed-brown hover:bg-pressed-brown hover:text-warm-cream"
                    aria-label={label}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Icon className="size-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
