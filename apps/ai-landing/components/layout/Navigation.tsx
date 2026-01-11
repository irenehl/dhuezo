'use client'

import { Button } from '@/components/ui/button'

export const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-semibold tracking-tighter text-slate-800 dark:text-slate-100 flex items-center gap-2">
          Nameless
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
          <a href="#features" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Features
          </a>
          <a href="#philosophy" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Philosophy
          </a>
          <a href="#benefits" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Benefits
          </a>
        </div>

        <Button className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md active:scale-95">
          Join Waitlist
        </Button>
      </div>
    </nav>
  )
}
