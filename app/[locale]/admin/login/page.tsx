'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Card } from '@/components/ui/card'

export default function AdminLoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send magic link')
      }

      toast({
        title: 'Magic link sent',
        description: 'Check your email for the login link.',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send magic link',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-zinc-950">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-foreground dark:text-zinc-100">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground dark:text-zinc-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="bg-background border-border text-foreground dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending...' : 'Send Magic Link'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

