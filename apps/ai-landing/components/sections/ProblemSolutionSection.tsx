import { Smile, Gamepad2, Leaf } from 'lucide-react'

export const ProblemSolutionSection = () => {
  return (
    <section id="benefits" className="py-24 px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight mb-6">
          Mindfulness without the pressure.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
          Traditional meditation apps often feel like another to-do list item. Streaks, levels, and notifications can create anxiety instead of relieving it. Nameless is different.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="glass-card dark:bg-slate-800/40 p-8 rounded-3xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center mb-6 text-rose-500 dark:text-rose-400">
            <Smile className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-3">No Scoring</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            We removed points, levels, and streaks. Explore activities at your own pace without fear of losing progress.
          </p>
        </div>
        
        <div className="glass-card dark:bg-slate-800/40 p-8 rounded-3xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-500 dark:text-blue-400">
            <Gamepad2 className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-3">Playful Focus</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Engage your mind with gentle, interactive games that naturally guide you into a state of flow and calm.
          </p>
        </div>

        <div className="glass-card dark:bg-slate-800/40 p-8 rounded-3xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-6 text-emerald-500 dark:text-emerald-400">
            <Leaf className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-3">Science-Backed</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Based on proven grounding and breathing techniques used to regulate the nervous system and reduce anxiety.
          </p>
        </div>
      </div>
    </section>
  )
}
