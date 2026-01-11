import { Clock, Users, RefreshCw, CheckCircle } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    iconColor: 'text-red-500',
    title: 'Analysis Paralysis',
    description:
      'Too many options, reviews, and apps leading to decision fatigue.',
  },
  {
    icon: Users,
    iconColor: 'text-amber-500',
    title: 'Group Indecision',
    description:
      '"I don\'t care, you pick." The sentence that ruins date nights.',
  },
  {
    icon: RefreshCw,
    iconColor: 'text-indigo-500',
    title: 'The Comfort Loop',
    description: 'Going to the same 3 places because it\'s safe and easy.',
  },
  {
    icon: CheckCircle,
    iconColor: 'text-emerald-400',
    title: 'Missed Gems',
    description: 'Living next to amazing food spots you never knew existed.',
  },
]

export const ProblemSection = () => {
  return (
    <section className="py-20 bg-slate-900/30 border-y border-slate-800/50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
          How many times have you spent 30 minutes deciding where to eat?
        </h2>
        <p className="text-slate-400 text-lg mb-12">
          We&apos;ve all been there. The hunger is real, but the indecision is
          paralyzing.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-colors text-left group"
            >
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 transition-colors">
                <problem.icon
                  className={`w-5 h-5 ${problem.iconColor}`}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-white font-semibold mb-2">{problem.title}</h3>
              <p className="text-sm text-slate-400">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
