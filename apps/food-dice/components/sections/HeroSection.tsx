'use client'

import {
  ArrowRight,
  PlayCircle,
  Dices,
  Menu,
  Star,
  RefreshCw,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Hero Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Coming Soon to iOS & Android
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
            Stop Debating.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              Start Dining.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Food Dice eliminates the endless &quot;where should we eat?&quot;
            conversation. Discover your next favorite restaurant with a random
            roll based on your cravings.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            <Button
              size="lg"
              className="btn-glow w-full sm:w-auto transform hover:scale-[1.02]"
            >
              <span>JOIN THE WAITLIST</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto group"
            >
              <PlayCircle className="w-5 h-5 mr-2 text-emerald-400 group-hover:scale-110 transition-transform" />
              See How It Works
            </Button>
          </div>

          <div className="pt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-bold">
                JD
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-bold">
                SM
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-bold">
                AK
              </div>
            </div>
            <p>
              Join <span className="text-slate-300 font-medium">2,000+</span>{' '}
              people on the waitlist
            </p>
          </div>
        </div>

        {/* Hero Visual (Phone Mockup) */}
        <div className="relative flex justify-center lg:justify-end animate-float">
          <div className="relative w-[320px] h-[640px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden z-10">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" />

            {/* App Interface */}
            <div className="w-full h-full bg-slate-950 flex flex-col relative">
              {/* Map BG pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(#334155 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Header */}
              <div className="pt-12 px-6 flex justify-between items-center z-10">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                  <Menu className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold tracking-tight">
                  Food Dice
                </span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-xs text-emerald-400 font-bold">JD</span>
                </div>
              </div>

              {/* Card Stack */}
              <div className="flex-1 flex items-center justify-center p-6 z-10">
                <div className="w-full bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-3xl p-5 shadow-xl transform rotate-3 scale-95 opacity-50 absolute bottom-24" />
                <div className="w-full bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-3xl p-5 shadow-xl transform -rotate-2 scale-95 opacity-50 absolute bottom-28" />

                {/* Main Card */}
                <div className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-0 overflow-hidden shadow-2xl relative">
                  <div className="h-32 bg-slate-800 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        OPEN NOW
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Burger & Co.
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400 mb-3">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-sm font-medium text-slate-300">
                        4.8 (1.2k)
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        • 0.8 mi
                      </span>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-md border border-slate-700">
                        Burgers
                      </span>
                      <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-md border border-slate-700">
                        $$
                      </span>
                    </div>
                    <button className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold text-sm shadow-lg shadow-emerald-500/20">
                      Let&apos;s Go Here
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Action Button */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <button className="w-16 h-16 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <RefreshCw className="w-7 h-7 text-slate-400" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements around phone */}
          <div className="absolute top-20 -right-4 bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-2xl shadow-xl animate-pulse-slow">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Match Found!</p>
                <p className="text-sm font-semibold text-white">Sushi Master</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
