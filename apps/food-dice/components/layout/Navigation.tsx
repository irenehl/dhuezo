'use client'

import { Dices } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-emerald-500/10 p-2 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
            <Dices className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">
            Food Dice
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
          >
            Stories
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            className="hidden sm:flex"
          >
            Updates
          </Button>
          <Button>Join Waitlist</Button>
        </div>
      </div>
    </nav>
  )
}
