import { Coffee } from 'lucide-react'

export const SupportSection = () => {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass-card rounded-[2rem] border border-slate-800 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800/50 to-slate-900 z-0" />
          <div className="relative z-10">
            <div className="inline-flex p-3 rounded-full bg-slate-800 mb-6">
              <Coffee className="w-6 h-6 text-amber-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Love Food Dice? Support the Project!
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">
              Food Dice is built with passion to solve a real problem. If you
              enjoy using the app and want to support future development,
              consider buying me a coffee. Every contribution helps improve the
              app!
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-semibold transition-colors"
            >
              <span>☕ Buy Me a Coffee</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
