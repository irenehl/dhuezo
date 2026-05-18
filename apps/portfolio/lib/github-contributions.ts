export type GithubContributionDay = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export type GithubContributionsPayload = {
  total: { lastYear: number }
  contributions: GithubContributionDay[]
}

export type GithubWeekCell = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export function githubLoginFromProfileUrl(url: string): string | null {
  try {
    const path = new URL(url).pathname.replace(/^\/+|\/+$/g, '')
    const [owner] = path.split('/').filter(Boolean)
    return owner ?? null
  } catch {
    return null
  }
}

export async function fetchGithubContributions(
  username: string,
): Promise<GithubContributionsPayload | null> {
  try {
    const endpoint = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
      username,
    )}?y=last`
    const response = await fetch(endpoint, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return null
    }

    const body: unknown = await response.json()
    if (!isGithubContributionsPayload(body)) {
      return null
    }

    return body
  } catch {
    return null
  }
}

export function buildContributionWeekGrid(
  contributions: GithubContributionDay[],
): { weeks: GithubWeekCell[][]; firstDate: string; lastDate: string } {
  if (contributions.length === 0) {
    return { weeks: [], firstDate: '', lastDate: '' }
  }

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date))
  const firstDate = sorted[0].date
  const lastDate = sorted[sorted.length - 1].date
  const byDate = new Map(sorted.map((c) => [c.date, c]))

  const start = parseIsoLocal(firstDate)
  const weekStart = new Date(start)
  weekStart.setDate(start.getDate() - start.getDay())
  weekStart.setHours(12, 0, 0, 0)

  const end = parseIsoLocal(lastDate)
  const endWeekSaturday = new Date(end)
  endWeekSaturday.setDate(end.getDate() + (6 - end.getDay()))
  endWeekSaturday.setHours(12, 0, 0, 0)

  const weeks: GithubWeekCell[][] = []
  const cursor = new Date(weekStart)

  while (cursor <= endWeekSaturday) {
    const week: GithubWeekCell[] = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(cursor)
      day.setDate(cursor.getDate() + i)
      const iso = formatIsoDate(day)
      const entry = byDate.get(iso)
      week.push({
        date: iso,
        count: entry?.count ?? 0,
        level: entry?.level ?? 0,
      })
    }
    weeks.push(week)
    cursor.setDate(cursor.getDate() + 7)
  }

  return { weeks, firstDate, lastDate }
}

function parseIsoLocal(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00`)
}

function formatIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function isGithubContributionsPayload(
  value: unknown,
): value is GithubContributionsPayload {
  if (!value || typeof value !== 'object') {
    return false
  }

  const v = value as Record<string, unknown>
  if (!v.total || typeof v.total !== 'object') {
    return false
  }

  const total = v.total as Record<string, unknown>
  if (typeof total.lastYear !== 'number') {
    return false
  }

  if (!Array.isArray(v.contributions)) {
    return false
  }

  return v.contributions.every(isContributionDay)
}

function isContributionDay(value: unknown): value is GithubContributionDay {
  if (!value || typeof value !== 'object') {
    return false
  }

  const c = value as Record<string, unknown>
  return (
    typeof c.date === 'string' &&
    typeof c.count === 'number' &&
    typeof c.level === 'number' &&
    c.level >= 0 &&
    c.level <= 4
  )
}
