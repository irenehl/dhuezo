import { Twitter, Instagram } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tighter text-slate-900 dark:text-slate-100">
            Nameless
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">© 2023 Nameless App</span>
        </div>
        
        <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Contact
          </a>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <Twitter className="w-[18px] h-[18px]" />
          </a>
          <a href="#" className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <Instagram className="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  )
}
