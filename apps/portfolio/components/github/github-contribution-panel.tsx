import { ExternalLink } from 'lucide-react'

import type { GithubWeekCell } from '@/lib/github-contributions'

export type GithubContributionPanelLabels = {
  totalLine: string
  viewProfile: string
  less: string
  more: string
  cellTitle: (count: number, formattedDate: string) => string
  gridAriaLabel: string
}

const cellSizeClass = 'size-[10px] sm:size-3'

export function GithubContributionPanel({
  weeks,
  profileUrl,
  locale,
  labels,
}: {
  weeks: GithubWeekCell[][]
  profileUrl: string
  locale: string
  labels: GithubContributionPanelLabels
}): JSX.Element {
  const monthShort = new Intl.DateTimeFormat(locale, { month: 'short' })
  const dayMedium = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' })

  return (
    <div className="space-y-4 rounded-lg border border-border/40 bg-muted/10 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-sm font-medium text-foreground">{labels.totalLine}</p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-opacity hover:opacity-90"
        >
          {labels.viewProfile}
          <ExternalLink className="size-3.5 shrink-0 opacity-80" aria-hidden />
        </a>
      </div>

      <div
        className="overflow-x-auto pb-1"
        role="img"
        aria-label={labels.gridAriaLabel}
      >
        <div className="flex min-w-max gap-1">
          {weeks.map((week, wi) => {
            const representative = week[3]
            const repDay = parseIsoNoon(representative.date)
            const repMonth = repDay.getMonth()
            const prevMonth =
              wi > 0
                ? parseIsoNoon(weeks[wi - 1][3].date).getMonth()
                : -1
            const showMonth = repMonth !== prevMonth

            return (
              <div key={`${representative.date}-${wi}`} className="flex flex-col gap-1">
                <div className="flex h-3 w-full min-w-[10px] items-end justify-center whitespace-nowrap font-mono text-[8px] leading-none text-muted-foreground sm:min-w-3 sm:text-[9px]">
                  {showMonth ? monthShort.format(repDay) : null}
                </div>
                {week.map((cell) => {
                  const formatted = dayMedium.format(parseIsoNoon(cell.date))
                  return (
                    <div
                      key={cell.date}
                      role="presentation"
                      title={labels.cellTitle(cell.count, formatted)}
                      data-contrib-level={cell.level}
                      className={`contrib-cell shrink-0 ${cellSizeClass} rounded-[2px]`}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-muted-foreground">
        <span className="font-mono uppercase tracking-wide">{labels.less}</span>
        <div className="flex gap-1">
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <div
              key={level}
              data-contrib-level={level}
              className={`contrib-cell ${cellSizeClass} rounded-[2px]`}
              aria-hidden
            />
          ))}
        </div>
        <span className="font-mono uppercase tracking-wide">{labels.more}</span>
      </div>
    </div>
  )
}

function parseIsoNoon(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00`)
}
