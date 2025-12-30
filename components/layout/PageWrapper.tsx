import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-body antialiased overflow-x-hidden dark:bg-black dark:text-zinc-300">
      <Header />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  )
}
