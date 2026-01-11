import { Hash, PenTool, Anchor, CheckCircle2 } from 'lucide-react'

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-32">
        
        {/* Feature 1: Counting Calm */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-[2rem] transform -rotate-2"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden aspect-square flex flex-col p-8">
              <div className="flex-1 grid grid-cols-3 gap-3 content-center">
                {/* Simulated Number Pad */}
                <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-500 font-medium text-lg">1</div>
                <div className="aspect-square rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-500 dark:text-indigo-400 font-medium text-lg shadow-sm">2</div>
                <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-500 font-medium text-lg">3</div>
                <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-500 font-medium text-lg">4</div>
                <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-500 font-medium text-lg">5</div>
                <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-500 font-medium text-lg">6</div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 mb-6">
              <Hash className="text-indigo-500 dark:text-indigo-400 w-5 h-5" strokeWidth={1.5} />
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">Focus</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight mb-6">
              Counting Calm
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              A sequential tapping activity designed to anchor your attention. Find numbers, evens, or odds in order. The repetitive, rhythmic nature quiets the noise in your mind.
            </p>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                Multiple difficulty levels
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                Gentle haptic feedback
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                Visual progress without pressure
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 2: Connect the Dots */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <PenTool className="text-purple-500 dark:text-purple-400 w-5 h-5" strokeWidth={1.5} />
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-500 dark:text-purple-400">Flow</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight mb-6">
              Connect the Dots
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Drag lines between dots to reveal calming geometric patterns. Smooth interactions and soft sounds create a meditative state of flow as you complete each shape.
            </p>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                Seamless drag gestures
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                Beautiful geometric reveals
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-100 to-rose-50 dark:from-purple-900/30 dark:to-rose-900/30 rounded-[2rem] transform rotate-2"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden aspect-square flex items-center justify-center p-8">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="40" r="4" className="fill-purple-400 dark:fill-purple-500"/>
                <circle cx="160" cy="100" r="4" className="fill-purple-200 dark:fill-purple-700"/>
                <circle cx="100" cy="160" r="4" className="fill-purple-200 dark:fill-purple-700"/>
                <circle cx="40" cy="100" r="4" className="fill-purple-200 dark:fill-purple-700"/>
                {/* Connecting Line */}
                <path d="M100 40 L160 100" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 8"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Feature 3: Grounding */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-[2rem] transform -rotate-2"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden aspect-square flex flex-col items-center justify-center p-8">
              <div className="grid grid-cols-5 gap-2 w-full max-w-[280px]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">5</span>
                </div>
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a1.5 1.5 0 003 0m0-6V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11m0 1.5v1a1.5 1.5 0 01-3 0v-1m0 0h-3m3 0h3" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium text-slate-300 dark:text-slate-600">4</span>
                </div>
                <div className="flex flex-col items-center gap-2 opacity-30">
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium text-slate-200 dark:text-slate-700">3</span>
                </div>
                <div className="flex flex-col items-center gap-2 opacity-20">
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-200 dark:text-slate-700">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium text-slate-200 dark:text-slate-700">2</span>
                </div>
                <div className="flex flex-col items-center gap-2 opacity-10">
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-200 dark:text-slate-700">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium text-slate-200 dark:text-slate-700">1</span>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="font-medium text-slate-700 dark:text-slate-300">What are 5 things you can see?</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 mb-6">
              <Anchor className="text-emerald-500 dark:text-emerald-400 w-5 h-5" strokeWidth={1.5} />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">Ground</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight mb-6">
              5-4-3-2-1 Grounding
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Reconnect with the present moment during anxiety or overwhelm. This guided activity walks you through your senses to help steady your thoughts and return to the now.
            </p>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                Guided sensory exploration
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 w-4 h-4" />
                Helpful for anxiety attacks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
