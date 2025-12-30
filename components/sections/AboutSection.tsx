'use client'

import { useTranslations } from 'next-intl'
import { Github, Linkedin, Twitter, Quote } from 'lucide-react'

export function AboutSection() {
  const t = useTranslations()

  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-zinc-900 dark:border-zinc-900">
      <div className="space-y-6">
        <h2 className="font-header text-4xl text-zinc-100 uppercase tracking-tighter dark:text-zinc-100">
          {t('about.title')}
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed dark:text-zinc-400">
          {t('about.description1')}
        </p>
        <p className="text-zinc-400 text-sm leading-relaxed dark:text-zinc-400">
          {t('about.description2')}
        </p>

        <div className="pt-8">
          <a
            href={`mailto:${t('about.email')}`}
            className="inline-block border-b-2 border-rose-800 text-2xl font-display text-zinc-100 hover:text-rose-600 hover:border-rose-600 transition-all pb-1 dark:text-zinc-100 dark:hover:text-rose-600 dark:border-rose-800 dark:hover:border-rose-600"
          >
            {t('about.cta')}
          </a>
        </div>
      </div>

      <div className="relative bg-zinc-900/30 p-8 border border-zinc-800 flex flex-col justify-between min-h-[300px] dark:bg-zinc-900/30 dark:border-zinc-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="relative z-10">
          <Quote className="w-8 h-8 text-zinc-700 mb-4 rotate-180 dark:text-zinc-700" />
          <p className="text-lg font-serif italic text-zinc-300 dark:text-zinc-300">
            &ldquo;{t('about.quote')}&rdquo;
          </p>
        </div>

        <div className="relative z-10 flex gap-4 mt-8">
          <a
            href={t('about.social.github')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-zinc-700 rounded-full hover:bg-zinc-100 hover:text-black hover:border-zinc-100 transition-all dark:border-zinc-700 dark:hover:bg-zinc-100 dark:hover:text-black dark:hover:border-zinc-100"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={t('about.social.linkedin')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-zinc-700 rounded-full hover:bg-zinc-100 hover:text-black hover:border-zinc-100 transition-all dark:border-zinc-700 dark:hover:bg-zinc-100 dark:hover:text-black dark:hover:border-zinc-100"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={t('about.social.twitter')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-zinc-700 rounded-full hover:bg-zinc-100 hover:text-black hover:border-zinc-100 transition-all dark:border-zinc-700 dark:hover:bg-zinc-100 dark:hover:text-black dark:hover:border-zinc-100"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

