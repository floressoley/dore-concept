import { useEffect, useState } from 'react'
import { cn } from '../lib/cn.ts'
import { ArrowUp } from './Icons.tsx'

const SHOW_AFTER = 700

/** A small round button, bottom right, that appears after the first screen and scrolls back to the top. */
export function BackToTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const update = () => setShown(window.scrollY > SHOW_AFTER)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const top = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={top}
      tabIndex={shown ? 0 : -1}
      className={cn(
        'fixed right-md bottom-md z-40 flex size-11 items-center justify-center rounded-pill bg-linen text-ink shadow-[0_6px_20px_rgb(26_21_18/0.18)] transition-[opacity,transform,background-color] duration-300 hover:bg-limone md:right-lg md:bottom-lg',
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <ArrowUp size={18} />
    </button>
  )
}
