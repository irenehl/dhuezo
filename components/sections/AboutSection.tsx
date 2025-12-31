'use client'

import { useTranslations } from 'next-intl'
import { Github, Linkedin, Quote } from 'lucide-react'
import { XIcon } from '@/components/icons/XIcon'

export function AboutSection() {
  const t = useTranslations()

  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-zinc-200 dark:border-zinc-900 scroll-mt-20">
      <div className="space-y-6">
        <h2 className="font-header text-4xl text-zinc-900 uppercase tracking-tighter dark:text-zinc-100">
          {t('about.title')}
        </h2>
        <p className="text-zinc-600 text-sm leading-relaxed font-normal dark:text-zinc-400">
          {t('about.description1')}
        </p>
        <p className="text-zinc-600 text-sm leading-relaxed font-normal dark:text-zinc-400">
          {t('about.description2')}
        </p>

        <div className="pt-8">
          <a
            href={`mailto:${t('about.email')}`}
            className="inline-block border-b-2 border-rose-600 text-2xl font-display text-zinc-900 hover:text-rose-600 transition-all pb-1 font-semibold dark:text-zinc-100 dark:hover:text-rose-600 dark:border-rose-600"
          >
            {t('about.cta')}
          </a>
        </div>
      </div>

      <div className="relative bg-white p-8 border border-zinc-200 flex flex-col justify-between min-h-[300px] shadow-sm dark:bg-zinc-900/30 dark:border-zinc-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        <div className="relative z-10">
          <Quote className="w-8 h-8 text-zinc-300 mb-4 rotate-180 dark:text-zinc-700" />
          <p className="text-lg font-serif italic text-zinc-800 dark:text-zinc-300">
            &ldquo;{t('about.quote')}&rdquo;
          </p>
        </div>

        <div className="relative z-10 flex gap-4 mt-8">
          <a
            href={t('about.social.github')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-zinc-200 rounded-full hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all text-zinc-600 dark:border-zinc-700 dark:hover:bg-zinc-100 dark:hover:text-black dark:hover:border-zinc-100"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={t('about.social.linkedin')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-zinc-200 rounded-full hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all text-zinc-600 dark:border-zinc-700 dark:hover:bg-zinc-100 dark:hover:text-black dark:hover:border-zinc-100"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={t('about.social.x')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-zinc-200 rounded-full hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all text-zinc-600 dark:border-zinc-700 dark:hover:bg-zinc-100 dark:hover:text-black dark:hover:border-zinc-100"
            aria-label="X"
          >
            <XIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

