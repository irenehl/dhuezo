/**
 * Format experience date range for list display (short month + year).
 */
export function formatExperiencePeriod(
  startDate: string,
  endDate: string | null | undefined,
  locale: string,
): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }
  const start = new Date(startDate).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    options,
  )
  const end = endDate
    ? new Date(endDate).toLocaleDateString(
        locale === 'es' ? 'es-ES' : 'en-US',
        options,
      )
    : locale === 'es'
      ? 'Presente'
      : 'Present'
  return `${start} — ${end}`
}
