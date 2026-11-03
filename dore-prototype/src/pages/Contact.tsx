import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Button } from '../components/Button.tsx'
import { Checkbox } from '../components/Checkbox.tsx'
import { Field, FieldSelect, fieldClass } from '../components/Field.tsx'
import { Clock, MapPin, Mail, Phone } from '../components/Icons.tsx'
import { cn } from '../lib/cn.ts'
import { usePageMeta } from '../lib/usePageMeta.ts'

const INTERESTS = ['Buying a home', 'Selling a home', 'Private search', 'Legal and paperwork', 'Settling in', 'Something else']

const DETAILS: { icon: ReactNode; label: string; value: string; href?: string }[] = [
  { icon: <MapPin size={20} />, label: 'Office', value: 'Calle Ficticia 0, Costa Imaginaria' },
  { icon: <Phone size={20} />, label: 'Phone', value: '+00 000 000 000', href: 'tel:+000000000000' },
  { icon: <Mail size={20} />, label: 'Email', value: 'hello@dore.example', href: 'mailto:hello@dore.example' },
  { icon: <Clock size={20} />, label: 'Hours', value: 'Monday to Saturday, 9:00 to 19:00' },
]

function Message() {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }
  const compact = cn(fieldClass, 'min-h-11 py-xs')
  return (
    <div className="rounded-media bg-linen p-lg text-ink md:p-3xl">
      <h2 className="text-28 md:text-40">Send a message</h2>
      {sent ? (
        <p role="status" className="mt-lg text-14">
          Thank you. This is a concept site, so nothing was sent and nothing was stored.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-lg grid grid-cols-2 gap-sm">
          <Field label="I am interested in" className="col-span-2">
            {(id) => (
              <FieldSelect id={id} name="interest" defaultValue={INTERESTS[0]} className="min-h-11 py-xs">
                {INTERESTS.map((i) => <option key={i}>{i}</option>)}
              </FieldSelect>
            )}
          </Field>
          <Field label="Full name" className="col-span-2">{(id) => <input id={id} name="name" required autoComplete="name" className={compact} />}</Field>
          <Field label="Email" className="col-span-2 sm:col-span-1">{(id) => <input id={id} name="email" type="email" required autoComplete="email" className={compact} />}</Field>
          <Field label="Phone (optional)" className="col-span-2 sm:col-span-1">{(id) => <input id={id} name="phone" type="tel" autoComplete="tel" className={compact} />}</Field>
          <Field label="Message" className="col-span-2">{(id) => <textarea id={id} name="message" rows={4} placeholder="Which home, which dates, anything we should know" className={cn(fieldClass, 'resize-y')} />}</Field>
          <div className="col-span-2 mt-2xs flex flex-col gap-md">
            <Checkbox required label="I accept the Privacy and Terms" />
            <Button type="submit" arrow="right" className="w-full">Send message</Button>
          </div>
        </form>
      )}
    </div>
  )
}

/**
 * Contact. A colored band with the invitation and the ways to reach us on the left and the message
 * form on the right. Stacks on tablet and mobile, form first after the details.
 */
export default function Contact() {
  usePageMeta('Contact', 'Ask about a home, book a viewing or arrange a valuation. We reply within a working day.')
  return (
    <div className="-mt-nav bg-pear-tree px-gutter pt-[calc(var(--spacing-nav)+var(--spacing-4xl))] pb-[96px] md:pt-[calc(var(--spacing-nav)+var(--spacing-5xl))] md:pb-[120px]">
      <div className="mx-auto grid max-w-page items-start gap-4xl lg:grid-cols-[1fr_1.05fr] lg:gap-6xl">
        <div className="flex flex-col gap-lg">
          <h1 className="text-56 md:text-72">Talk to a person</h1>
          <p className="max-w-split text-16">
            Ask about a home, book a viewing or arrange a valuation. We reply within a working day, in Spanish, Catalan, English or French.
          </p>
          <ul className="mt-lg divide-y divide-ink/20 border-y border-ink/20">
            {DETAILS.map((d) => (
              <li key={d.label} className="flex items-center gap-md py-md">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-pill bg-linen">{d.icon}</span>
                <div className="flex flex-col">
                  <span className="text-12">{d.label}</span>
                  {d.href ? (
                    <a href={d.href} className="text-16 hover:text-cerulean">{d.value}</a>
                  ) : (
                    <span className="text-16">{d.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Message />
      </div>
    </div>
  )
}
