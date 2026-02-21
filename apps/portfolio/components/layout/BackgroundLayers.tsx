'use client'

export function BackgroundLayers() {
  return (
    <>
      {/* Background Layers - Light Mode */}
      <div className="fixed inset-0 bg-noise opacity-40 pointer-events-none z-0 mix-blend-multiply dark:opacity-30 dark:mix-blend-overlay" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-zinc-50 to-zinc-100 -z-10 dark:from-zinc-900 dark:via-black dark:to-black" />
    </>
  )
}





