'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const AnimatedBackground = dynamic(
  () =>
    import('@/components/layout/AnimatedBackground').then((m) => ({
      default: m.AnimatedBackground,
    })),
  { ssr: false },
)

const CustomCursor = dynamic(
  () =>
    import('@/components/layout/CustomCursor').then((m) => ({
      default: m.CustomCursor,
    })),
  { ssr: false },
)

const FloatingFlowers = dynamic(
  () =>
    import('@/components/layout/FloatingFlowers').then((m) => ({
      default: m.FloatingFlowers,
    })),
  { ssr: false },
)

type EffectFlags = {
  showAnimatedBg: boolean
  showCursor: boolean
  showFlowers: boolean
}

/**
 * Defers Framer Motion–heavy chrome until after mount and only on capable viewports
 * (animated blur orbs and flowers are disabled on small screens / reduced motion).
 */
export function SiteChromeEffects(): JSX.Element | null {
  const [flags, setFlags] = useState<EffectFlags | null>(null)

  useEffect(() => {
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqMd = window.matchMedia('(min-width: 768px)')
    const mqLg = window.matchMedia('(min-width: 1024px)')
    const mqFine = window.matchMedia('(pointer: fine)')

    const sync = (): void => {
      const reduced = mqReduced.matches
      setFlags({
        showAnimatedBg: mqMd.matches && !reduced,
        showCursor: mqMd.matches && mqFine.matches,
        showFlowers: mqLg.matches && !reduced,
      })
    }

    sync()
    mqReduced.addEventListener('change', sync)
    mqMd.addEventListener('change', sync)
    mqLg.addEventListener('change', sync)
    mqFine.addEventListener('change', sync)
    return () => {
      mqReduced.removeEventListener('change', sync)
      mqMd.removeEventListener('change', sync)
      mqLg.removeEventListener('change', sync)
      mqFine.removeEventListener('change', sync)
    }
  }, [])

  if (!flags) {
    return null
  }

  return (
    <>
      {flags.showAnimatedBg ? <AnimatedBackground /> : null}
      {flags.showFlowers ? <FloatingFlowers /> : null}
      {flags.showCursor ? <CustomCursor /> : null}
    </>
  )
}
