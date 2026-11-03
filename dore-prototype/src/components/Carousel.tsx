import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { cn } from '../lib/cn.ts'
import { ChevronLeft, ChevronRight } from './Icons.tsx'

type CarouselProps = {
  label: string
  children: ReactNode
  /** Dark = on Cerulean, Hillside or Ink. */
  tone?: 'Light' | 'Dark'
}

/**
 * Horizontal scroller with snap and a prev / next pill. Works with touch, wheel, mouse drag, the buttons,
 * and the arrow keys once the track is focused. The pill hides when everything already fits.
 * Wrap each card in <CarouselItem>.
 */
export function Carousel({ label, children, tone = 'Light' }: CarouselProps) {
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const [overflow, setOverflow] = useState(true)
  const [dragging, setDragging] = useState(false)
  const drag = useRef({ x: 0, left: 0, moved: false })

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
    setOverflow(el.scrollWidth > el.clientWidth + 4)
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

  // Mouse drag. Touch already scrolls natively, so only the mouse is handled here.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !track.current) return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
    setDragging(true)
    track.current.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging || !track.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 5) drag.current.moved = true
    track.current.scrollLeft = drag.current.left - dx
  }
  const endDrag = () => setDragging(false)

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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = false
          }
        }}
        className={cn(
          'flex scroll-pl-[var(--gutter)] gap-lg overflow-x-auto overscroll-x-contain px-gutter pb-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          dragging ? 'cursor-grabbing select-none' : 'cursor-grab snap-x snap-mandatory',
        )}
      >
        {children}
      </div>
      <div className={cn('mt-2xl flex px-gutter', !overflow && 'hidden')}>
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
