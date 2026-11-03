import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { Button } from '../components/Button.tsx'
import { Checkbox } from '../components/Checkbox.tsx'
import { Field, FieldSelect, fieldClass as field } from '../components/Field.tsx'
import { ArrowUpRight } from '../components/Icons.tsx'
import { Media } from '../components/Media.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { SectionLabel } from '../components/SectionLabel.tsx'
import { cn } from '../lib/cn.ts'
import buying from '../assets/photos/buying.webp'
import selling from '../assets/photos/selling.webp'
import poolHouse from '../assets/photos/pool-house.webp'
import windowToTheSea from '../assets/journal/window-to-the-sea.webp'
import bellTowerRooftops from '../assets/journal/bell-tower-rooftops.webp'
import { usePageMeta } from '../lib/usePageMeta.ts'

const SERVICES = [
  { title: 'Buying', to: '/buy', image: buying, position: 'object-[50%_68%]', alt: 'Pale stone columns and a terracotta urn looking over a turquoise cove with a small boat' },
  { title: 'Selling', to: '/sell', image: selling, position: 'object-[50%_64%]', alt: 'Villa tower with a terracotta roof and white balustrades above flowering bougainvillea' },
  { title: 'Private search', to: '/services#contact', image: poolHouse, position: undefined, alt: 'Clay-rendered house with a green-tiled pool in front' },
  { title: 'Legal and paperwork', to: '/services#contact', image: windowToTheSea, position: 'object-[50%_38%]', alt: 'Boats at anchor seen through an opening in an old stone wall' },
  { title: 'Settling in', to: '/services#contact', image: bellTowerRooftops, position: 'object-[50%_55%]', alt: 'Terracotta rooftops and a small bell tower in front of the sea' },
]

const INTERESTS = ['Buying', 'Selling', 'Private search', 'Legal and paperwork', 'Settling in', 'Something else']

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }
  return (
    <section id="contact" className="bg-vino-bianco px-gutter py-[96px] md:py-[120px]">
      <div className="mx-auto grid max-w-page gap-4xl lg:grid-cols-[1fr_1.2fr] lg:gap-6xl">
        <div className="flex flex-col gap-lg">
          <SectionLabel tone="Primary">Contact</SectionLabel>
          <h2 className="text-40 md:text-56">Tell us what you are looking for</h2>
          <p className="max-w-split text-16">One of the team will reply within a working day. No lists, no pressure.</p>
        </div>
        {sent ? (
          <p role="status" className="self-start text-14">
            Thank you. This is a concept site, so nothing was sent and nothing was stored.
          </p>
        ) : (
          <form onSubmit={submit} className="grid gap-md sm:grid-cols-2">
            <Field label="Name">{(id) => <input id={id} name="name" required autoComplete="name" className={field} />}</Field>
            <Field label="Email">{(id) => <input id={id} name="email" type="email" required autoComplete="email" className={field} />}</Field>
            <Field label="Phone (optional)">{(id) => <input id={id} name="phone" type="tel" autoComplete="tel" className={field} />}</Field>
            <Field label="I am interested in">
              {(id) => (
                <FieldSelect id={id} name="interest" defaultValue="">
                  <option value="" disabled>Choose a service</option>
                  {INTERESTS.map((i) => <option key={i}>{i}</option>)}
                </FieldSelect>
              )}
            </Field>
            <Field label="Message" className="sm:col-span-2">{(id) => <textarea id={id} name="message" rows={4} className={cn(field, 'resize-y')} />}</Field>
            <div className="flex flex-col items-start gap-md sm:col-span-2">
              <Checkbox required label="I accept the Privacy and Terms" />
              <Button type="submit">Send message</Button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

/**
 * Services. A short text intro, one photo per service with its name as a label on the image, then the
 * contact form. Each photo is one link. Buying and Selling go to their pages, the rest go to the form.
 */
export default function Services() {
  usePageMeta('Services', 'Buying, selling, private search, legal paperwork and settling in, with one small team.')
  return (
    <>
      <div className="-mt-nav bg-pear-tree px-gutter pt-[calc(var(--spacing-nav)+var(--spacing-4xl))] pb-4xl md:pt-[calc(var(--spacing-nav)+var(--spacing-5xl))] md:pb-5xl">
        <header className="mx-auto flex max-w-page flex-col gap-md">
          <h1 className="text-56 md:text-72">Services</h1>
          <p className="text-16">From the first viewing to the first morning in the house, one small team stays with you.</p>
        </header>
      </div>

      <section className="px-gutter py-[96px] md:py-[120px]">
        <ul className="mx-auto grid max-w-page gap-x-xl gap-y-4xl sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s, i) => (
            <li key={s.title} className={cn('lg:col-span-2', i === 3 && 'lg:col-span-3', i === 4 && 'sm:col-span-2 lg:col-span-3')}>
              <Reveal>
                <Link to={s.to} className="group relative block overflow-hidden rounded-media">
                  <div className={cn('w-full overflow-hidden lg:aspect-auto lg:h-[320px]', i === 4 ? 'aspect-[4/3] sm:aspect-[21/10]' : 'aspect-[4/3]')}>
                    <Media src={s.image} alt={s.alt} className={cn('transition-transform duration-700 ease-out group-hover:scale-[1.03]', s.position)} />
                  </div>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent" />
                  <span className="label-m absolute bottom-md left-md inline-flex min-h-11 items-center gap-sm rounded-control border border-linen px-md text-linen transition-colors group-hover:border-limone group-hover:text-limone">
                    {s.title}
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <Contact />
    </>
  )
}
