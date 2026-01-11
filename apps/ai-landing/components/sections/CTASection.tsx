'use client'

import { Button } from '@/components/ui/button'
import { FormEvent } from 'react'

export const CTASection = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement waitlist signup logic
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-blue-100 to-rose-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-rose-900/30 rounded-3xl blur-xl opacity-50"></div>
        <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-3xl p-10 md:p-16 text-center shadow-2xl shadow-purple-900/5">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Ready to find your calm?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-lg mx-auto">
            Join the waitlist to be notified when Nameless launches. We promise to respect your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="enter@email.com" 
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
              required 
            />
            <Button 
              type="submit" 
              className="bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg active:scale-95"
            >
              Join Waitlist
            </Button>
          </form>
          
          <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
            Interested in investing?{' '}
            <a href="#" className="underline hover:text-slate-600 dark:hover:text-slate-400">
              Contact our team.
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
