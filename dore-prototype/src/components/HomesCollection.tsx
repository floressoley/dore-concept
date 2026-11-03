import { Link } from 'react-router'
import { cn } from '../lib/cn.ts'
import { Button } from './Button.tsx'
import { Sun } from './Icons.tsx'
import { Media } from './Media.tsx'
import { Reveal } from './Reveal.tsx'

export type CollectionHome = {
  title: string
  location: string
  price: string
  to: string
  image?: string
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

function Card({ home, ratio }: { home: CollectionHome; ratio: string }) {
  return (
    <Reveal>
      <Link to={home.to} className="group flex flex-col gap-sm">
        <div className={cn('w-full overflow-hidden rounded-media', ratio)}>
          <Media src={home.image} alt={home.alt} tone={home.tone} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        </div>
        <h3 className="font-display text-28 leading-[1.15] text-linen">{home.title}</h3>
        <p className="eyebrow flex justify-between gap-md text-vino-bianco">
          <span>{home.location}</span>
          <span>{home.price}</span>
        </p>
      </Link>
    </Reveal>
  )
}

function Intro({ label, text }: { label: string; text: string }) {
  return (
    <Reveal>
      <div className="flex flex-col gap-md">
        <p className="eyebrow flex items-center gap-sm text-vino-bianco">
          <Sun size={18} />
          {label}
        </p>
        <p className="font-display text-28 text-vino-bianco">{text}</p>
      </div>
    </Reveal>
  )
}

/**
 * Selected homes as an interlocking two-column composition on Cerulean.
 * From 1040 up: a wider left column (large card, then a smaller one) and a right column aligned to
 * the right edge (intro, a small card, a large card). The columns start differently and use
 * different card widths, so they interlock without leaving gaps. Under 1040: one column, reading order.
 */
export function HomesCollection({ heading, introLabel, introText, homes, linkLabel, linkTo }: HomesCollectionProps) {
  const [a, b, c, d] = homes
  return (
    <section className="bg-cerulean px-gutter pt-[96px] pb-section text-linen md:pt-[120px]">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-4xl md:gap-5xl">
        <h2 className="text-40 text-limone">{heading}</h2>

        <div className="hidden gap-x-xl lg:grid lg:grid-cols-[1.07fr_1fr]">
          <div className="flex flex-col">
            <Card home={a} ratio={RATIOS[0]} />
            <div className="mt-4xl w-[79%]">
              <Card home={c} ratio={RATIOS[2]} />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-[85%]">
              <Intro label={introLabel} text={introText} />
            </div>
            <div className="mt-4xl w-[85%]">
              <Card home={b} ratio={RATIOS[1]} />
            </div>
            <div className="mt-4xl w-full">
              <Card home={d} ratio={RATIOS[3]} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4xl lg:hidden">
          <Intro label={introLabel} text={introText} />
          {[a, b, c, d].map((home, i) => (
            <Card key={home.title} home={home} ratio={RATIOS[i]} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button to={linkTo} inverse arrow>{linkLabel}</Button>
        </div>
      </div>
    </section>
  )
}
