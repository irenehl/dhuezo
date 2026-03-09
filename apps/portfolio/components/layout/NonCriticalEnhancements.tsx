'use client'

import dynamic from 'next/dynamic'

const AnimatedBackground = dynamic(
  () =>
    import('@/components/layout/AnimatedBackground').then(
      (mod) => mod.AnimatedBackground
    ),
  { ssr: false },
)

const CustomCursor = dynamic(
  () =>
    import('@/components/layout/CustomCursor').then((mod) => mod.CustomCursor),
  { ssr: false },
)

const FloatingFlowers = dynamic(
  () =>
    import('@/components/layout/FloatingFlowers').then(
      (mod) => mod.FloatingFlowers
    ),
  { ssr: false },
)

export function NonCriticalEnhancements(): JSX.Element {
  return (
    <>
      <AnimatedBackground />
      <FloatingFlowers />
      <CustomCursor />
    </>
  )
}
