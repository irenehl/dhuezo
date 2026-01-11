import { Dices, MapPin } from 'lucide-react'

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-emerald-400 font-semibold tracking-wide uppercase text-xs">
            The Process
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mt-2">
            Three Simple Steps to Your Next Meal
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="glass-card border border-slate-800 rounded-[2rem] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-white font-bold border border-slate-700 shadow-inner">
              1
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Set Preferences
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Enter what you&apos;re craving (Pizza, Sushi, etc.) and set your
              search radius. You&apos;re in control of the basics.
            </p>
            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-1 rounded border border-slate-700">
                  Pizza
                </span>
                <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-1 rounded border border-slate-700">
                  Sushi
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-1 rounded border border-slate-700">
                  Burgers
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-card border border-slate-800 rounded-[2rem] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 text-white font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              2
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Roll the Dice
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Hit the button and let our algorithm select the perfect spot from
              highly-rated places nearby.
            </p>
            <div className="flex justify-center items-center h-[66px]">
              <Dices
                className="w-12 h-12 text-emerald-400 animate-bounce"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-card border border-slate-800 rounded-[2rem] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-white font-bold border border-slate-700 shadow-inner">
              3
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Discover & Go
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Get a randomly selected restaurant with ratings, distance, and
              one-tap directions.
            </p>
            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 flex items-center gap-3">
              <div className="bg-slate-800 p-2 rounded-lg">
                <MapPin className="w-4 h-4 text-emerald-400" strokeWidth={2} />
              </div>
              <div>
                <div className="h-2 w-20 bg-slate-700 rounded mb-1" />
                <div className="h-2 w-12 bg-slate-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
