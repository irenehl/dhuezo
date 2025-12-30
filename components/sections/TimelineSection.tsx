'use client'

import { useTranslations } from 'next-intl'

interface Experience {
  id: string
  title: string
  company: string
  period: string
  bullets: string[]
  tags: string[]
  isActive?: boolean
}

export function TimelineSection() {
  const t = useTranslations()

  // Get experiences from translations
  const experiences: Experience[] = [
    {
      id: '1',
      title: t('timeline.exp1.title'),
      company: t('timeline.exp1.company'),
      period: t('timeline.exp1.period'),
      bullets: [
        t('timeline.exp1.bullet1'),
        t('timeline.exp1.bullet2'),
        t('timeline.exp1.bullet3'),
      ],
      tags: [t('timeline.exp1.tag1'), t('timeline.exp1.tag2'), t('timeline.exp1.tag3')],
      isActive: true,
    },
    {
      id: '2',
      title: t('timeline.exp2.title'),
      company: t('timeline.exp2.company'),
      period: t('timeline.exp2.period'),
      bullets: [
        t('timeline.exp2.bullet1'),
        t('timeline.exp2.bullet2'),
      ],
      tags: [t('timeline.exp2.tag1'), t('timeline.exp2.tag2'), t('timeline.exp2.tag3')],
    },
  ]

  return (
    <section id="timeline" className="space-y-16">
      <h2 className="font-header text-4xl md:text-6xl text-zinc-100 uppercase tracking-tighter text-right dark:text-zinc-100">
        {t('timeline.title')}
      </h2>

      <div className="relative border-l border-zinc-800 ml-3 md:ml-6 space-y-12 py-4 dark:border-zinc-800">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-8 md:pl-12 group">
            <div className="absolute -left-[5px] top-6 w-[9px] h-[9px] rounded-full bg-zinc-900 border border-zinc-600 group-hover:bg-rose-600 group-hover:border-rose-500 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)] dark:bg-zinc-900 dark:border-zinc-600 dark:group-hover:bg-rose-600 dark:group-hover:border-rose-500" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-2xl font-display text-zinc-100 dark:text-zinc-100">
                {exp.title}
              </h3>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
                {exp.period}
              </span>
            </div>
            <div
              className={`text-sm font-bold uppercase tracking-wider mb-4 ${
                exp.isActive ? 'text-rose-700 dark:text-rose-700' : 'text-zinc-500 dark:text-zinc-500'
              }`}
            >
              {exp.company}
            </div>

            <ul className="space-y-2 text-sm text-zinc-400 font-light list-disc list-inside marker:text-zinc-700 dark:text-zinc-400 dark:marker:text-zinc-700">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded-full uppercase tracking-wide dark:text-zinc-600 dark:border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

