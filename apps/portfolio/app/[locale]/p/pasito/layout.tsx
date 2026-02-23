import { SiteHeader } from '@/components/layout/SiteHeader'

export default function PasitoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}
