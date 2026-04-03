export function ProjectsSectionSkeleton(): JSX.Element {
  return (
    <section
      className="relative py-24 px-6 lg:px-16"
      aria-hidden="true"
    >
      <div className="max-w-7xl mx-auto space-y-10 animate-pulse">
        <div className="h-12 w-64 max-w-full rounded-2xl bg-muted" />
        <div className="flex flex-wrap gap-3">
          <div className="h-10 w-20 rounded-full bg-muted" />
          <div className="h-10 w-24 rounded-full bg-muted" />
          <div className="h-10 w-16 rounded-full bg-muted" />
        </div>
        <div className="h-72 w-full rounded-3xl bg-muted" />
      </div>
    </section>
  )
}

export function TimelineSectionSkeleton(): JSX.Element {
  return (
    <section
      className="relative py-24 px-6 lg:px-16"
      aria-hidden="true"
    >
      <div className="max-w-7xl mx-auto space-y-10 animate-pulse">
        <div className="h-12 w-56 max-w-full rounded-2xl bg-muted" />
        <div className="space-y-6">
          <div className="h-24 w-full rounded-2xl bg-muted" />
          <div className="h-24 w-full rounded-2xl bg-muted" />
          <div className="h-24 w-full rounded-2xl bg-muted" />
        </div>
      </div>
    </section>
  )
}

export function StageSectionSkeleton(): JSX.Element {
  return (
    <section
      className="relative py-24 px-6 lg:px-16"
      aria-hidden="true"
    >
      <div className="max-w-7xl mx-auto space-y-10 animate-pulse">
        <div className="h-12 w-48 max-w-full rounded-2xl bg-muted" />
        <div className="h-40 w-full rounded-3xl bg-muted" />
      </div>
    </section>
  )
}
