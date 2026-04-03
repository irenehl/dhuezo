export default function LocaleLoading(): JSX.Element {
  return (
    <div className="min-h-screen bg-background" aria-busy="true" aria-label="Loading">
      <div className="fixed top-0 w-full z-40 border-b-2 border-border bg-background/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 h-20 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div className="hidden sm:block h-5 w-36 rounded-md bg-muted" />
          </div>
          <div className="hidden md:flex gap-8">
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-4 w-16 rounded bg-muted" />
          </div>
          <div className="flex gap-3">
            <div className="h-9 w-9 rounded-full bg-muted" />
          </div>
        </div>
      </div>
      <div className="pt-32 pb-16 px-6 lg:px-16 max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-10 w-52 max-w-full rounded-full bg-muted" />
        <div className="space-y-4 max-w-2xl">
          <div className="h-14 w-full rounded-xl bg-muted" />
          <div className="h-14 w-5/6 rounded-xl bg-muted" />
          <div className="h-6 w-full rounded-lg bg-muted" />
          <div className="h-6 w-full rounded-lg bg-muted" />
        </div>
        <div className="flex flex-wrap gap-4 pt-4">
          <div className="h-12 w-40 rounded-full bg-muted" />
          <div className="h-12 w-40 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  )
}
