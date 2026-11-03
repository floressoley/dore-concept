import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { cn } from '../lib/cn.ts'
import { SectionLabel } from './SectionLabel.tsx'
import { TextLink } from './TextLink.tsx'

export type Area = { name: string; to: string; image: string; alt: string }

type AreaShowcaseProps = {
  eyebrow: string
  areas: Area[]
  linkLabel: string
  linkTo: string
  /** Time each photo stays before the next one fades in. */
  interval?: number
}

/**
 * Split section: a Pear Tree panel with the area names on the left, photos fading into each other on
 * the right. The photo follows the list, so the active name is underlined. Pointing at or tabbing
 * to a name picks its photo and holds it. Reduced-motion visitors get no automatic changes.
 */
export function AreaShowcase({ eyebrow, areas, linkLabel, linkTo, interval = 5500 }: AreaShowcaseProps) {
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (held || reduceMotion) return
    const timer = window.setInterval(() => setActive((a) => (a + 1) % areas.length), interval)
    return () => window.clearInterval(timer)
  }, [held, reduceMotion, interval, areas.length])

  return (
    <section className="grid lg:min-h-[720px] lg:grid-cols-2">
      <div
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onFocusCapture={() => setHeld(true)}
        onBlurCapture={() => setHeld(false)}
        className="flex flex-col justify-between gap-5xl bg-pear-tree px-gutter py-section text-ink lg:pr-5xl"
      >
        <SectionLabel tone="Primary">{eyebrow}</SectionLabel>
        <div className="flex flex-col gap-3xl">
          <ul className="flex flex-col gap-xs">
            {areas.map((area, i) => (
              <li key={area.name}>
                <Link
                  to={area.to}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    'relative inline-block font-display text-40 leading-[1.1] lg:text-56',
                    'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-out',
                    i === active ? 'after:scale-x-100' : 'after:scale-x-0',
                  )}
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
          <TextLink to={linkTo} size="Medium" arrowRight onAccent>{linkLabel}</TextLink>
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-ink lg:aspect-auto">
        {areas.map((area, i) => (
          <img
            key={area.name}
            src={area.image}
            alt={area.alt}
            aria-hidden={i !== active}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={cn(
              'absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[1800ms] ease-out',
              i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0',
            )}
          />
        ))}
      </div>
    </section>
  )
}
