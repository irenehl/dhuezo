export const TechStackSection = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-70">
        <div className="flex gap-8 items-center grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-xs font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Built With
          </span>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">React</span>
            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">Expo</span>
            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">TypeScript</span>
            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">Cursor</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm text-center md:text-right">
          Developed with modern, reliable technology to ensure a smooth, crash-free experience on both iOS and Android.
        </p>
      </div>
    </section>
  )
}
