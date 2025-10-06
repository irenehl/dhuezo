'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function OnlineUsers() {
  const [onlineCount, setOnlineCount] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase.channel('online-users')

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        setOnlineCount(Object.keys(state).length)
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
          })
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Badge variant="secondary" className="gap-2">
        <Users className="h-3 w-3" />
        <span>{onlineCount} {onlineCount === 1 ? 'usuario' : 'usuarios'} en línea</span>
      </Badge>
    </motion.div>
  )
}
