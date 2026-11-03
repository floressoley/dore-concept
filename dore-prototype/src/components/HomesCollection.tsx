import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../lib/cn.ts'
import { Button } from './Button.tsx'
import { Area, Bath, Bed, Sun } from './Icons.tsx'
import { Media } from './Media.tsx'
import { Reveal } from './Reveal.tsx'

export type CollectionHome = {
  title: string
  location: string
  price: string
  /** Interior size in m². */
  size: number
  beds: number
  baths: number
  to: string
  image?: string
  /** Tailwind object-position class, to keep the subject in frame when the crop differs from the photo. */
  position?: string
  alt: string
  tone?: 'sea' | 'sun' | 'olive' | 'clay'
}

type HomesCollectionProps = {
  heading: string
  introLabel: string
  introText: string
  /** The first four are used, in this order: large, small, small, large. */
  homes: CollectionHome[]
  linkLabel: string
  linkTo: string
}

// Listing-photo ratios: 4:3 for the large cards, 3:2 for the small ones.
const RATIOS = ['aspect-[4/3]', 'aspect-[3/2]', 'aspect-[3/2]', 'aspect-[4/3]']

function Spec({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-xs">
      {icon}
      <span className="sr-only">{label}: </span>
      {children}
    </li>
  )
}

export function HomeCard({ home, ratio }: { home: CollectionHome; ratio: string }) {
  return (
    <Reveal>
      <Link to={home.to} className="group flex flex-col gap-sm">
        <div className={cn('w-full overflow-hidden rounded-media', ratio)}>
          <Media src={home.image} alt={home.alt} tone={home.tone} className={cn('transition-transform duration-700 ease-out group-hover:scale-[1.03]', home.position)} />
        </div>
        <div className="flex items-baseline justify-between gap-md">
          <h3 className="font-display text-28 leading-[1.15]">{home.title}</h3>
          <p className="shrink-0 text-16 font-medium">{home.price}</p>
        </div>
        <div className="flex items-center justify-between gap-md">
          <p className="eyebrow text-ink-muted">{home.location}</p>
          <ul className="flex items-center gap-md text-14 text-ink-muted">
            <Spec icon={<Area size={16} />} label="Size">{home.size} m²</Spec>
            <Spec icon={<Bed size={16} />} label="Bedrooms">{home.beds}</Spec>
            <Spec icon={<Bath size={16} />} label="Bathrooms">{home.baths}</Spec>
          </ul>
        </div>
      </Link>
    </Reveal>
  )
}

function Intro({ label, text }: { label: string; text: string }) {
  return (
    <Reveal>
      <div className="flex flex-col gap-md">
        <p className="eyebrow flex items-center gap-sm text-ink-muted">
          <Sun size={18} />
          {label}
        </p>
        <p className="font-display text-28">{text}</p>
      </div>
    </Reveal>
  )
}

/**
 * Selected homes as an interlocking two-column composition on Linen.
 * From 1040 up: a wider left column (large card, then a smaller one) and a right column aligned to
 * the right edge (intro, a small card, a large card). The columns start differently and use
 * different card widths, so they interlock without leaving gaps. Under 1040: one column, reading order.
 */
export function HomesCollection({ heading, introLabel, introText, homes, linkLabel, linkTo }: HomesCollectionProps) {
  const [a, b, c, d] = homes
  return (
    <section className="bg-linen px-gutter pt-[96px] pb-[96px] text-ink md:pt-[120px] md:pb-[120px]">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-4xl md:gap-5xl">
        <h2 className="text-40">{heading}</h2>

        <div className="hidden gap-x-xl lg:grid lg:grid-cols-[1.07fr_1fr]">
          <div className="flex flex-col">
            <HomeCard home={a} ratio={RATIOS[0]} />
            <div className="mt-4xl w-[79%]">
              <HomeCard home={c} ratio={RATIOS[2]} />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-[85%]">
              <Intro label={introLabel} text={introText} />
            </div>
            <div className="mt-4xl w-[85%]">
              <HomeCard home={b} ratio={RATIOS[1]} />
            </div>
            <div className="mt-4xl w-full">
              <HomeCard home={d} ratio={RATIOS[3]} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4xl lg:hidden">
          <Intro label={introLabel} text={introText} />
          {[a, b, c, d].map((home, i) => (
            <HomeCard key={home.title} home={home} ratio={RATIOS[i]} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button to={linkTo} variant="Secondary" arrow="right">{linkLabel}</Button>
        </div>
      </div>
    </section>
  )
}
