import { getTranslations } from 'next-intl/server'

import { GithubContributionPanel } from '@/components/github/github-contribution-panel'
import { FadeUp, FadeUpStagger, FadeUpItem } from '@/components/ui/fade-up'
import { ProjectListEntry } from '@/components/ui/project-list-entry'
import { siteConfig } from '@/lib/config'
import {
  buildContributionWeekGrid,
  fetchGithubContributions,
  githubLoginFromProfileUrl,
} from '@/lib/github-contributions'
import { projectContentService } from '@/lib/services/project-content-service'

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

  const entryTranslations = {
    liveAriaLabel: t('liveAriaLabel', { default: 'Live deployment' }),
    repoAriaLabel: t('repoAriaLabel', { default: 'Repository on GitHub' }),
  }

  const githubUsername = githubLoginFromProfileUrl(siteConfig.links.github)
  const githubData =
    githubUsername !== null
      ? await fetchGithubContributions(githubUsername)
      : null
  const githubGrid =
    githubData !== null ? buildContributionWeekGrid(githubData.contributions) : null

  return (
    <section id="projects" className="scroll-mt-header">
      <div className="space-y-8">
        <FadeUp>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                {t('activityEyebrow', { default: 'Cadence' })}
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground/80">
                {t('activityCaption', {
                  default:
                    'Rolling year of public GitHub activity (live). Private and client work is not shown here.',
                })}
              </p>
            </div>
            {githubData !== null &&
            githubGrid !== null &&
            githubGrid.weeks.length > 0 &&
            githubUsername !== null ? (
              <GithubContributionPanel
                weeks={githubGrid.weeks}
                profileUrl={siteConfig.links.github}
                locale={locale}
                labels={{
                  totalLine: t('activityTotal', {
                    count: githubData.total.lastYear,
                    default:
                      '{count, number} contributions in the last year',
                  }),
                  viewProfile: t('activityViewProfile', {
                    default: 'Open GitHub profile',
                  }),
                  less: t('activityLess', { default: 'Less' }),
                  more: t('activityMore', { default: 'More' }),
                  gridAriaLabel: t('activityGridAriaLabel', {
                    count: githubData.total.lastYear,
                    default:
                      'GitHub contribution heatmap: {count, number} contributions in the last year',
                  }),
                  cellTitle: (count, formattedDate) =>
                    count === 0
                      ? t('activityCellTitleNone', {
                          date: formattedDate,
                          default: 'No contributions on {date}',
                        })
                      : t('activityCellTitle', {
                          count,
                          date: formattedDate,
                          default:
                            '{count, number} contributions on {date}',
                        }),
                }}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {t('activityLoadError', {
                  default:
                    'Could not load GitHub activity right now. You can still open your profile:',
                })}{' '}
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {t('activityViewProfile', { default: 'Open GitHub profile' })}
                </a>
              </p>
            )}
          </div>
        </FadeUp>

        {/* Section header */}
        <FadeUp delay={0.05}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div className="space-y-1">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                {t('title', { default: 'Projects' })}
              </p>
              <h2 className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                {t('subtitle', { default: 'Work' })}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground/80 sm:text-right">
              {t('description', {
                default:
                  'Shipped work. Titles open the live app or case study; GitHub when available.',
              })}
            </p>
          </div>
        </FadeUp>

        {projects.length === 0 ? (
          <FadeUp delay={0.1}>
            <p className="text-sm text-muted-foreground">{t('listEmpty')}</p>
          </FadeUp>
        ) : (
          <FadeUpStagger>
            {projects.map((project, i) => (
              <FadeUpItem key={project.project_id}>
                <ProjectListEntry
                  locale={locale}
                  project={project}
                  index={i + 1}
                  translations={entryTranslations}
                />
              </FadeUpItem>
            ))}
          </FadeUpStagger>
        )}
      </div>
    </section>
  )
}
