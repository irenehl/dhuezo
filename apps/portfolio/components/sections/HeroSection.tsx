'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useRef } from 'react'

const containerVariants = {
  hidden: {},
  visible: (reduced: boolean) => ({
    transition: {
      staggerChildren: reduced ? 0 : 0.14,
      delayChildren: reduced ? 0 : 0.04,
    },
  }),
}

const columnVariants = {
  hidden: (reduced: boolean) => ({
    opacity: 0,
    y: reduced ? 0 : 32,
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

export function HeroSection() {
  const t = useTranslations()
  const reducedMotion = useReducedMotion()
  const rm = reducedMotion ?? false
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const introProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.55], [0.5, 0.06])
  const backdropParallax = useTransform(scrollYProgress, [0, 1], [0, 48])

  const proofItems = [
    t('hero.proof1', { default: 'Strategy → prod' }),
    t('hero.proof2', { default: 'Teams & systems' }),
    t('hero.proof3', { default: 'LatAm · Remote' }),
  ]

  return (
    <header
      ref={ref}
      id="intro"
      className="relative min-h-[100dvh] scroll-mt-header overflow-hidden"
    >
      {rm ? (
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-border"
          aria-hidden
        />
      ) : (
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-[3px] origin-left bg-gradient-to-r from-primary via-secondary to-primary"
          style={{ scaleX: introProgress }}
          aria-hidden
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--gentle-beige)/0.25)] to-background dark:via-[hsl(var(--card)/0.35)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_100%_0%,hsl(var(--primary)/0.28),transparent_45%)] dark:bg-[radial-gradient(ellipse_120%_80%_at_100%_0%,hsl(var(--primary)/0.2),transparent_48%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_0%_100%,hsl(var(--secondary)/0.18),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:min(4rem,8vw)_min(4rem,8vw)] opacity-[0.35] dark:opacity-[0.2]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[20%] top-0 h-[120%] w-[55%] rotate-[-14deg] bg-gradient-to-b from-primary/10 via-transparent to-secondary/10 opacity-80 dark:from-primary/15"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-[8%] top-[12%] h-[min(90vw,560px)] w-[min(90vw,560px)] rounded-full bg-[radial-gradient(circle,hsl(var(--dusty-rose)/0.42)_0%,transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,hsl(var(--dusty-rose)/0.32)_0%,transparent_68%)]"
        style={{ opacity: glowOpacity }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.012] md:opacity-[0.022]" />

      <motion.div
        className="pointer-events-none absolute -right-4 bottom-8 -z-0 select-none font-display text-[clamp(6rem,28vw,16rem)] font-bold leading-none text-muted-foreground/[0.07] dark:text-muted-foreground/[0.09] md:right-8 lg:bottom-16"
        style={{ y: rm ? 0 : backdropParallax }}
        aria-hidden
      >
        {t('hero.backdropWord', { default: 'SHIP' })}
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-6 pb-16 pt-28 lg:px-16 lg:pb-20 lg:pt-32"
        initial="hidden"
        animate="visible"
        custom={rm}
        variants={containerVariants}
      >
        <div
          className="pointer-events-none absolute left-6 top-[18%] hidden h-[64%] w-1 rounded-full bg-gradient-to-b from-primary via-secondary to-primary opacity-90 lg:left-16 lg:block"
          aria-hidden
        />

        <motion.div
          className="relative z-20 mx-auto flex w-full max-w-3xl flex-col justify-center pl-0 lg:max-w-4xl lg:pl-3"
          custom={rm}
          variants={columnVariants}
        >
          <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-primary md:text-xs">
            {t('hero.eyebrow', {
              default: 'Tech lead · Full-stack · Production-obsessed',
            })}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <motion.a
              href="https://calendar.app.google/Q65Hgz9cCqa2m1Ei9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary/60 bg-primary/10 px-4 py-2 text-sm font-bold text-primary shadow-[0_0_24px_-4px_hsl(var(--primary)/0.45)] transition-colors hover:bg-primary/15"
              aria-label={t('hero.ambassador')}
              whileHover={rm ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/cursor.svg"
                alt=""
                width={24}
                height={24}
                priority
                unoptimized
                className="size-7 rounded-full"
              />
              {t('hero.ambassador')}
            </motion.a>
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              {t('hero.meta')}
            </span>
          </div>

          <div className="mt-8">
            <h1 className="bg-gradient-to-br from-primary via-deep-rose to-primary bg-clip-text font-accent text-[clamp(3.25rem,11vw,6.25rem)] leading-[0.92] text-transparent drop-shadow-sm dark:from-primary dark:via-primary dark:to-soft-pink">
              {t('hero.subtitle')}
            </h1>
          </div>

          <p className="mt-3 font-mono text-xs text-muted-foreground sm:hidden">
            {t('hero.meta')}
          </p>

          <div
            className="mt-8 grid grid-cols-3 divide-x divide-border/60 border-y border-border/60 py-4 dark:divide-border/40 dark:border-border/50"
            role="list"
          >
            {proofItems.map((label) => (
              <div
                key={label}
                role="listitem"
                className="flex flex-col items-center justify-center px-2 text-center"
              >
                <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-foreground md:text-xs md:tracking-[0.18em]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <p className="relative mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            {t('hero.bio.intro')}{' '}
            <span
              tabIndex={0}
              className="group/shipping relative inline-block cursor-help rounded-sm border-b border-dotted border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t('hero.bio.shipping')}
              <span className="pointer-events-none absolute bottom-full left-0 right-0 z-50 w-full -translate-y-2 rounded-lg border-2 border-border bg-background/95 px-4 py-2.5 font-body text-sm text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover/shipping:opacity-100 group-focus-visible/shipping:opacity-100 group-focus-within/shipping:opacity-100">
                {t('hero.bio.shippingTooltip')}
              </span>
            </span>
            {t('hero.bio.andOccasionally')}{' '}
            <span
              tabIndex={0}
              className="group/debug relative inline-block cursor-help rounded-sm border-b border-dotted border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t('hero.bio.debugging')}
              <span className="pointer-events-none absolute bottom-full left-0 z-50 max-w-[min(32rem,calc(100vw-3rem))] -translate-y-2 rounded-lg border-2 border-border bg-background/95 px-4 py-2.5 font-body text-sm text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover/debug:opacity-100 group-focus-visible/debug:opacity-100 group-focus-within/debug:opacity-100">
                {t('hero.bio.debuggingTooltip')}
              </span>
            </span>
            {t('hero.bio.ending')}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.55)]"
              whileHover={rm ? undefined : { scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.55 }}
              />
              <span className="relative z-10">{t('hero.cta.viewProjects')}</span>
              <ArrowRight className="relative z-10 size-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="https://calendar.app.google/Q65Hgz9cCqa2m1Ei9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-foreground/20 bg-background/60 px-8 py-3.5 text-base font-bold backdrop-blur-sm transition-colors hover:border-primary hover:text-primary dark:border-foreground/25 dark:bg-card/40"
              whileHover={rm ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.cta.contact', { default: "Let's Chat" })}
            </motion.a>
          </div>

          <a
            href="#projects"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={t('hero.scrollHint')}
          >
            <ChevronDown
              className="size-4 shrink-0 opacity-80 motion-reduce:animate-none motion-safe:animate-bounce"
              aria-hidden
            />
            {t('hero.scrollHint')}
          </a>
        </motion.div>
      </motion.div>
    </header>
  )
}
