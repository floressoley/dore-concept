import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

/**
 * A thin Terracotta line at the very top of the page. It runs across on the first load and on every
 * page change, then fades out. Skipped for visitors who ask their device for reduced motion.
 */
export function TopProgress() {
  const { pathname } = useLocation()
  const [bar, setBar] = useState({ width: 0, opacity: 0, ms: 0 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timers: number[] = []
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms))
    at(0, () => setBar({ width: 0, opacity: 1, ms: 0 }))
    at(30, () => setBar({ width: 72, opacity: 1, ms: 500 }))
    at(560, () => setBar({ width: 100, opacity: 1, ms: 260 }))
    at(900, () => setBar({ width: 100, opacity: 0, ms: 320 }))
    at(1300, () => setBar({ width: 0, opacity: 0, ms: 0 }))
    return () => timers.forEach(window.clearTimeout)
  }, [pathname])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] h-[2px] bg-terracotta"
      style={{
        width: `${bar.width}%`,
        opacity: bar.opacity,
        transition: `width ${bar.ms}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease-out`,
      }}
    />
  )
}
