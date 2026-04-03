export function BackgroundLayers(): JSX.Element {
  return (
    <>
      {/* Background Layers - Light Mode (lighter noise on small screens — less GPU work) */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0 opacity-25 mix-blend-normal md:opacity-40 md:mix-blend-multiply dark:opacity-20 dark:md:opacity-30 dark:md:mix-blend-overlay" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-zinc-50 to-zinc-100 -z-10 dark:from-zinc-900 dark:via-black dark:to-black" />
    </>
  )
}





