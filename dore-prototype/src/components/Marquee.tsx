import { cn } from '../lib/cn.ts'

type MarqueeProps = {
  items: string[]
  /** Cerulean and Hillside bands take linen text, light bands take ink. */
  tone?: 'Cerulean' | 'Hillside' | 'Vino'
  className?: string
}

const TONE = {
  Cerulean: 'bg-cerulean text-linen',
  Hillside: 'bg-hillside text-linen',
  Vino: 'bg-vino-bianco text-ink',
}

/** Decorative scrolling band. Hidden from screen readers, and still under reduced motion. */
export function Marquee({ items, tone = 'Cerulean', className }: MarqueeProps) {
  const group = (
    <div className="flex shrink-0 items-center">
      {[0, 1, 2].flatMap((rep) =>
        items.map((item) => (
          <span key={`${rep}-${item}`} className="eyebrow flex items-center whitespace-nowrap">
            <span className="px-3xl">{item}</span>
            <span aria-hidden="true" className="h-3 w-px bg-current opacity-60" />
          </span>
        )),
      )}
    </div>
  )
  return (
    <div aria-hidden="true" className={cn('overflow-hidden py-sm', TONE[tone], className)}>
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {group}
        {group}
      </div>
    </div>
  )
}
