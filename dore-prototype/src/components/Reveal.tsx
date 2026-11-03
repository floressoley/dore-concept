import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn.ts'

/** Fades and lifts its content into place the first time it scrolls into view. Skipped for reduced motion. */
export function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const el = ref.current
    if (shown || !el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shown])

  return (
    <div
      ref={ref}
      className={cn('transition-[opacity,transform] duration-[800ms] ease-out', shown ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0', className)}
    >
      {children}
    </div>
  )
}
