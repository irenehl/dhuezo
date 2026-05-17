import { getTranslations } from 'next-intl/server'

import { experienceService } from '@/lib/services/experience-service'
import { formatExperiencePeriod } from '@/lib/format-experience-period'
import { FadeUp, FadeUpStagger, FadeUpItem } from '@/components/ui/fade-up'

const skills = [
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'NestJS',
  '.NET',
  'PostgreSQL',
  'MongoDB',
  'SQL Server',
  'Prisma',
  'Docker',
  'AWS',
  'Azure',
  'Vercel',
  'OpenAI',
  'Cursor',
]

export async function HomeMinimalExperience({
  locale,
}: {
  locale: string
}): Promise<JSX.Element> {
  const tExp = await getTranslations({ locale, namespace: 'experience' })
  const tSkills = await getTranslations({ locale, namespace: 'skills' })
  
  let experiences = await experienceService.getAllExperiences(locale)
  experiences = [...experiences].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
  )

  return (
    <section id="experience" className="space-y-16">
      {/* Tech DNA / Skills Section */}
      <div>
        <FadeUp>
          <h2 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-6">
            {tSkills('title', { default: 'Skills' })}
          </h2>
        </FadeUp>

        <FadeUpStagger className="flex flex-wrap gap-2">
          {skills.map((skill, index) => {
            // Create a subtle fade effect for the last few items to match the reference image's aesthetic
            const isFaded = index >= skills.length - 4
            const isVeryFaded = index >= skills.length - 2
            
            return (
              <FadeUpItem key={skill}>
                <span 
                  className={`
                    inline-flex items-center justify-center rounded-full border px-4 py-1.5 text-sm font-mono transition-all duration-300
                    hover:scale-105 hover:border-foreground/40 hover:text-foreground hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-foreground/5
                    ${isVeryFaded 
                      ? 'border-border/20 text-foreground/30' 
                      : isFaded 
                        ? 'border-border/40 text-foreground/50' 
                        : 'border-border/60 text-foreground/80'
                    }
                  `}
                >
                  {skill}
                </span>
              </FadeUpItem>
            )
          })}
        </FadeUpStagger>
      </div>

      {/* Experience Timeline */}
      <div>
        <FadeUp>
          <h2 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-6">
            {tExp('title', { default: 'Experience' })}
          </h2>
        </FadeUp>

        {experiences.length === 0 ? (
          <FadeUp delay={0.1}>
            <p className="mt-8 text-sm text-muted-foreground">{tExp('empty')}</p>
          </FadeUp>
        ) : (
          <div className="mt-6">
            <FadeUpStagger className="flex flex-col">
              {experiences.map((exp, index) => (
                <FadeUpItem key={exp.id}>
                  {/* Container has padding and bottom border, except for the last item */}
                  <div className={`flex flex-col gap-2 py-6 ${index !== experiences.length - 1 ? 'border-b border-border/40' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                        {exp.company}
                        {/* The little blue dot next to the company name as seen in the reference */}
                        {index < 2 && <span className="inline-block size-1.5 rounded-full bg-blue-500/80" aria-hidden="true" />}
                      </h3>
                      <time
                        dateTime={exp.start_date}
                        className="text-sm tabular-nums font-mono text-muted-foreground whitespace-nowrap"
                      >
                        {formatExperiencePeriod(
                          exp.start_date,
                          exp.end_date,
                          locale,
                        )}
                      </time>
                    </div>
                    
                    <p className="text-sm text-foreground/70">{exp.title}</p>
                    
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                    
                    {exp.technologies?.length ? (
                      <div className="mt-2 font-mono text-xs text-muted-foreground/60">
                        {exp.technologies.join(', ')}
                      </div>
                    ) : null}
                  </div>
                </FadeUpItem>
              ))}
            </FadeUpStagger>
          </div>
        )}
      </div>
    </section>
  )
}
