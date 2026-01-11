import { Accessibility, Zap, Moon } from 'lucide-react'

export const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-24 bg-white/50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
          Your Calm, Your Way
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-12">
          Personalize your experience with themes and accessibility options.
        </p>
        
        <div className="flex flex-wrap justify-center gap-8">
          {/* Theme Card Light */}
          <div className="w-32 h-48 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40"></div>
            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="w-10 h-2 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-2">Pastel</span>
          </div>
          {/* Theme Card Dark */}
          <div className="w-32 h-48 bg-slate-900 dark:bg-slate-950 rounded-2xl border-2 border-slate-800 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-indigo-500/30 dark:bg-indigo-600/40"></div>
            <div className="w-16 h-2 bg-slate-700 dark:bg-slate-800 rounded-full"></div>
            <div className="w-10 h-2 bg-slate-800 dark:bg-slate-900 rounded-full"></div>
            <span className="text-xs text-slate-500 dark:text-slate-600 mt-2">Midnight</span>
          </div>
          {/* Theme Card Warm */}
          <div className="w-32 h-48 bg-[#FDF8F6] dark:bg-orange-950/30 rounded-2xl border-2 border-orange-100 dark:border-orange-900/40 shadow-sm flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-orange-200 dark:bg-orange-900/40"></div>
            <div className="w-16 h-2 bg-orange-100 dark:bg-orange-900/30 rounded-full"></div>
            <div className="w-10 h-2 bg-orange-50 dark:bg-orange-900/20 rounded-full"></div>
            <span className="text-xs text-orange-300 dark:text-orange-600 mt-2">Warmth</span>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            <Accessibility className="w-4 h-4" />
            Reduced Motion
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            <Zap className="w-4 h-4" />
            Haptic Controls
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            <Moon className="w-4 h-4" />
            Dark Mode
          </div>
        </div>
      </div>
    </section>
  )
}
