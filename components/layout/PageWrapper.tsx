import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  )
}
