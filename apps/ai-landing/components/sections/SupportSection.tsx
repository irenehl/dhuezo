import { Heart, Coffee } from 'lucide-react'

export const SupportSection = () => {
  return (
    <section className="py-20 px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card dark:bg-slate-800/40 rounded-3xl p-10 md:p-12 text-center relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/40 to-orange-100/20 dark:from-amber-900/20 dark:to-orange-900/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-200/40 to-pink-100/20 dark:from-rose-900/20 dark:to-pink-900/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 mb-6">
              <Heart className="w-7 h-7 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
              Support This Project
            </h2>
            
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              Nameless is built with love and dedication. If you believe in mindful technology and want to help bring this vision to life, consider buying me a coffee.
            </p>
            
            <a
              href="https://buymeacoffee.com/dhuezo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-slate-900 px-8 py-3.5 rounded-full font-medium text-sm transition-all shadow-lg hover:shadow-xl active:scale-95 hover:-translate-y-0.5"
            >
              <Coffee className="w-5 h-5" strokeWidth={2} />
              Buy me a coffee
            </a>
            
            <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
              Every contribution helps keep this project alive ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
