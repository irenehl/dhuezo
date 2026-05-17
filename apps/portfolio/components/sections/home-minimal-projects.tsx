import { getTranslations } from 'next-intl/server'
import { projectContentService } from '@/lib/services/project-content-service'
import { FadeUp, FadeUpStagger, FadeUpItem } from '@/components/ui/fade-up'
import { ProjectCard } from '@/components/ui/project-card'

export async function HomeMinimalProjects({
  locale,
}: {
  locale: string
}): Promise<JSX.Element> {
  const t = await getTranslations({ locale, namespace: 'projects' })
  let projects: Awaited<ReturnType<typeof projectContentService.getAllProjects>> =
    []

  try {
    projects = await projectContentService.getAllProjects(locale as 'en' | 'es')
    projects = [...projects].sort((a, b) => a.order_index - b.order_index)
  } catch {
    projects = []
  }

  return (
    <section id="projects">
      <div>
        <FadeUp>
          {/* Using a smaller, uppercase header matching the reference */}
          <h2 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-6">
            {t('title', { default: 'Projects' })}
          </h2>
        </FadeUp>

        {projects.length === 0 ? (
          <FadeUp delay={0.1}>
            <p className="mt-8 text-sm text-muted-foreground">{t('listEmpty')}</p>
          </FadeUp>
        ) : (
          <div className="mt-6 border-t border-border/40">
            <FadeUpStagger className="flex flex-col">
              {projects.map((p) => (
                <FadeUpItem key={p.project_id}>
                  <ProjectCard 
                    project={p}
                    translations={{
                      liveLink: t('liveLink', { default: 'Live' }),
                      sourceLink: t('sourceLink', { default: 'Code' })
                    }}
                  />
                </FadeUpItem>
              ))}
            </FadeUpStagger>
          </div>
        )}
      </div>
    </section>
  )
}
