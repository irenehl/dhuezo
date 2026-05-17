import { SiteHeader } from '@/components/layout/site-header'

export default function PasitoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}
