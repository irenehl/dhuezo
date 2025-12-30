import { AdminAuthGate } from '@/components/admin/AdminAuthGate'

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <AdminAuthGate locale={locale}>
      <div className="min-h-screen bg-zinc-950 dark:bg-zinc-950">
        {children}
      </div>
    </AdminAuthGate>
  )
}

