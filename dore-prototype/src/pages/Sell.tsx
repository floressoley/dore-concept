import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../components/Button.tsx'
import { Field, FieldSelect, fieldClass } from '../components/Field.tsx'
import { Check, Minus, Plus } from '../components/Icons.tsx'
import { Logomark } from '../components/Logo.tsx'
import { useNavTheme } from '../components/NavTheme.tsx'
import { Media } from '../components/Media.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { SectionLabel } from '../components/SectionLabel.tsx'
import { VideoBackdrop } from '../components/VideoBackdrop.tsx'
import { cn } from '../lib/cn.ts'
import panoramicView from '../assets/photos/panoramic-view.webp'

const TYPES = ['Apartment', 'Townhouse', 'Villa', 'Farmhouse']
const BEDROOMS = ['1', '2', '3', '4', '5', '6 or more']

const STEPS = [
  { title: 'Valuation', text: 'Your agent walks the house and prices it against what has sold nearby, not what is listed.' },
  { title: 'Photography', text: 'A photographer comes on a clear morning. You keep the photographs and a short film.' },
  { title: 'Preparation', text: 'Costs, taxes and paperwork are gathered up front, so buyers arrive knowing the figures.' },
  { title: 'First viewings', text: 'Your home goes to our buyer list first, then public. Viewings are booked in slots.' },
]

const OTHERS = [
  'A quick visit and a rough price',
  'Phone photos, taken in an hour',
  'Fees explained after the offer',
  'Listed everywhere on day one',
  'Whoever is free shows the house',
  'A long contract, hard to leave',
]

const DORE = [
  'A full morning with your agent before pricing',
  'Professional photography and a short film',
  'Fees and costs in writing from the start',
  'Our buyer list first, portals second',
  'One agent from first visit to keys',
  'Leave at any time with a month’s notice',
]

const FAQ = [
  { q: 'What does it cost to sell with Doré?', a: 'One fee, a percentage of the sale price, agreed in writing before we start. Photography, preparation and marketing are included.' },
  { q: 'How long does it take to sell?', a: 'Most homes have a first offer within six weeks of launch. The price decides the rest, so we are honest about it from the start.' },
  { q: 'Do I need to leave the house for the photographs?', a: 'No. We ask for a morning and a tidy house, and we work around you.' },
  { q: 'Which documents do I need?', a: 'The title deed, the energy certificate and the latest property tax receipt. We help you gather the rest.' },
  { q: 'Can I change my mind?', a: 'Yes. You can leave with a month’s notice and no penalty.' },
]

function Valuation() {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }
  const compact = cn(fieldClass, 'min-h-11 py-xs')
  return (
    <div className="rounded-media bg-linen p-lg text-ink">
      <h2 className="text-28">Request a valuation</h2>
      {sent ? (
        <p role="status" className="mt-md text-14">
          Thank you. This is a concept site, so nothing was sent and nothing was stored.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-md grid grid-cols-2 gap-sm">
          <Field label="Street and town" className="col-span-2">{(id) => <input id={id} name="address" required autoComplete="street-address" className={compact} />}</Field>
          <Field label="Type">
            {(id) => (
              <FieldSelect id={id} name="type" defaultValue="Villa" className="min-h-11 py-xs">
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </FieldSelect>
            )}
          </Field>
          <Field label="Bedrooms">
            {(id) => (
              <FieldSelect id={id} name="bedrooms" defaultValue="3" className="min-h-11 py-xs">
                {BEDROOMS.map((b) => <option key={b}>{b}</option>)}
              </FieldSelect>
            )}
          </Field>
          <Field label="Full name" className="col-span-2 sm:col-span-1">{(id) => <input id={id} name="name" required autoComplete="name" className={compact} />}</Field>
          <Field label="Phone" className="col-span-2 sm:col-span-1">{(id) => <input id={id} name="phone" type="tel" autoComplete="tel" className={compact} />}</Field>
          <Field label="Email" className="col-span-2">{(id) => <input id={id} name="email" type="email" required autoComplete="email" className={compact} />}</Field>
          <Button type="submit" arrow="right" className="col-span-2 mt-2xs w-full">Request valuation</Button>
        </form>
      )}
    </div>
  )
}

function Faq() {
  return (
    <div className="divide-y divide-ink/20 border-y border-ink/20">
      {FAQ.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-md py-md text-16 marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="flex size-9 shrink-0 items-center justify-center rounded-pill border border-ink/30 transition-colors group-hover:border-ink">
              <Plus size={14} className="group-open:hidden" />
              <Minus size={14} className="hidden group-open:block" />
            </span>
          </summary>
          <p className="max-w-split pb-lg text-14 text-ink-muted">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

/**
 * Sell. A looping video with the pitch and the valuation form over it, four steps, a side-by-side comparison,
 * one seller's quote and the questions sellers ask.
 */
export default function Sell() {
  useNavTheme('Photo')
  return (
    <>
      <section className="relative isolate px-gutter pt-[calc(var(--spacing-nav)+var(--spacing-4xl))] pb-[96px] text-linen md:pt-[calc(var(--spacing-nav)+var(--spacing-5xl))] md:pb-[120px]">
        <VideoBackdrop src="/video/waves.mp4" overlay="from-ink/60 via-ink/40 to-ink/60" blur />
        <div className="mx-auto grid max-w-page items-start gap-4xl lg:grid-cols-[1.1fr_1fr] lg:gap-6xl">
          <header className="flex flex-col gap-lg lg:pt-3xl">
            <h1 className="text-56 text-limone md:text-72">Sell with a plan, not a sign</h1>
            <p className="max-w-split text-16">
              We take on a small number of homes each season. Each one gets a proper price, a patient photographer and a few weeks of preparation before the first viewing.
            </p>
          </header>
          <Valuation />
        </div>
      </section>

      <section className="bg-vino-bianco px-gutter py-[96px] md:py-[120px]">
        <div className="mx-auto max-w-page">
          <h2 className="max-w-[720px] text-40 md:text-56">Four weeks from first visit to first viewing</h2>
          <ol className="mt-4xl grid gap-x-xl gap-y-3xl sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Reveal className="h-full">
                  <div className="flex h-full flex-col gap-md border-b border-terracotta pb-lg text-terracotta-text">
                    <span className="font-display text-40">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display text-28 leading-[1.15]">{s.title}</h3>
                    <p className="text-14">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="h-[260px] w-full md:h-[380px]">
        <Media src={panoramicView} alt="White beach umbrellas in rows on a pebble shore, facing a deep blue sea" className="object-[50%_72%]" />
      </div>

      <section className="px-gutter py-[96px] md:py-[120px]">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="text-center text-40 md:text-56">What changes when you sell with Doré</h2>
          <div className="mt-4xl grid gap-md md:grid-cols-2">
            <div className="rounded-media border border-ink/30 bg-linen p-lg md:p-3xl">
              <h3 className="font-display text-28 text-ink-muted">Most agencies</h3>
              <ul className="mt-lg flex flex-col gap-md text-16 text-ink-muted">
                {OTHERS.map((t) => (
                  <li key={t} className="flex items-start gap-sm">
                    <Minus size={16} className="mt-[4px] shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-media bg-cerulean p-lg text-linen md:p-3xl">
              <h3 className="font-display text-28">Doré</h3>
              <ul className="mt-lg flex flex-col gap-md text-16">
                {DORE.map((t) => (
                  <li key={t} className="flex items-start gap-sm">
                    <Check size={16} className="mt-[4px] shrink-0 text-limone" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pear-tree px-gutter py-[96px] md:py-[120px]">
        <figure className="mx-auto flex max-w-wide flex-col items-center gap-xl text-center">
          <Logomark aria-hidden="true" className="size-[44px] text-ink md:size-[56px]" />
          <blockquote className="font-display text-40">
            “Our farmhouse sat on the portals for a year. After one morning with Doré’s photographer, the first buyer came through the door within a week.”
          </blockquote>
          <figcaption>
            <SectionLabel tone="Primary">Clara and Miquel Roca, sold a farmhouse in North cove</SectionLabel>
          </figcaption>
        </figure>
      </section>

      <section className="px-gutter py-[96px] md:py-[120px]">
        <div className="mx-auto max-w-[800px]">
          <h2 className="mb-4xl text-center text-40 md:text-56">Questions sellers ask</h2>
          <Faq />
        </div>
      </section>
    </>
  )
}
