import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn.ts'
import { ChevronLeft, ChevronRight } from './Icons.tsx'

type CarouselProps = {
  label: string
  children: ReactNode
  /** Dark = on Cerulean, Hillside or Ink. */
  tone?: 'Light' | 'Dark'
}

/**
 * Horizontal scroller with snap and a prev / next pill. Works with touch, wheel, the buttons,
 * and the arrow keys once the track is focused. Wrap each card in <CarouselItem>.
 */
export function Carousel({ label, children, tone = 'Light' }: CarouselProps) {
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })
  }

  const dark = tone === 'Dark'
  const button = cn(
    'flex size-9 items-center justify-center rounded-pill transition-opacity disabled:opacity-40',
    dark ? 'text-linen enabled:hover:bg-linen/15' : 'text-ink enabled:hover:bg-ink/10',
  )

  return (
    <div>
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={update}
        className="flex snap-x snap-mandatory scroll-pl-[var(--gutter)] gap-lg overflow-x-auto px-gutter pb-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-2xl flex px-gutter">
        <div className={cn('inline-flex items-center gap-2xs rounded-pill border px-xs py-2xs', dark ? 'border-linen/60' : 'border-ink/40')}>
          <button type="button" aria-label="Previous" disabled={edge.start} onClick={() => go(-1)} className={button}>
            <ChevronLeft size={16} />
          </button>
          <button type="button" aria-label="Next" disabled={edge.end} onClick={() => go(1)} className={button}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function CarouselItem({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('shrink-0 snap-start', className)}>{children}</div>
}
