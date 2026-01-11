'use client'

import { Button } from '@/components/ui/button'
import { Wind, Home, Activity, User } from 'lucide-react'

export const HeroSection = () => {
  return (
    <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-4xl mx-auto text-center fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
            Now in Development
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-slate-900 dark:text-slate-100 mb-6 leading-[1.1]">
          Find your calm through <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
            gentle play.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Interactive mindfulness activities designed to help you settle your mind. 
          No pressure. No streaks. Just a quiet space to breathe.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="w-full sm:w-auto bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg hover:shadow-xl active:scale-95">
            Request Early Access
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 text-slate-700 border border-slate-200 px-8 py-3.5 rounded-full font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            View Interactive Demo
          </Button>
        </div>
      </div>

      {/* Hero Visual / App Mockup Abstract */}
      <div className="mt-20 relative max-w-sm mx-auto animate-float">
        {/* Simulated Phone */}
        <div className="relative bg-white dark:bg-slate-800 rounded-[2.5rem] phone-frame h-[580px] w-full overflow-hidden border-8 border-slate-800 dark:border-slate-700 z-20">
          {/* Status Bar */}
          <div className="absolute top-0 w-full h-6 bg-transparent flex justify-between px-6 items-center pt-2 z-30">
            <span className="text-[10px] font-semibold text-slate-400">9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-2 border border-slate-400 rounded-sm"></div>
              <div className="w-4 h-2 border border-slate-400 rounded-sm"></div>
            </div>
          </div>

          {/* App Content Mockup */}
          <div className="h-full w-full bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center relative p-6">
            {/* Background blobs in app */}
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-purple-100 dark:bg-purple-900/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-2xl"></div>

            {/* Interactive Elements Mockup */}
            <div className="relative z-10 w-full text-center mb-8">
              <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 tracking-tight mb-1">
                Breathe
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">Inhale slowly...</p>
            </div>

            {/* Breathing Circle */}
            <div className="relative flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-purple-200 to-blue-200 dark:from-purple-900/40 dark:to-blue-900/40 opacity-30 animate-breathe absolute"></div>
              <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center relative z-10 border border-slate-100 dark:border-slate-700">
                <Wind className="text-slate-300 dark:text-slate-600 w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="absolute bottom-6 w-[85%] bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 flex justify-around shadow-sm border border-white/50 dark:border-slate-700/50">
              <Home className="text-slate-400 dark:text-slate-500 w-5 h-5" />
              <Activity className="text-slate-800 dark:text-slate-200 w-5 h-5" />
              <User className="text-slate-400 dark:text-slate-500 w-5 h-5" />
            </div>
          </div>
        </div>
        
        {/* Decorative shadow below phone */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-10 bg-black/10 dark:bg-black/30 blur-xl rounded-full z-10"></div>
      </div>
    </section>
  )
}
