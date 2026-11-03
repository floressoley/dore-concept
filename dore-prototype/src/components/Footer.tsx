import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from './Icons.tsx'
import { Checkbox } from './Checkbox.tsx'
import { Logomark } from './Logo.tsx'
import { SectionLabel } from './SectionLabel.tsx'
import { TextLink } from './TextLink.tsx'

const LEFT = [
  { label: 'Homes', to: '/buy' },
  { label: 'Services', to: '/services' },
  { label: 'Sell', to: '/sell' },
  { label: 'Journal', to: '/guides' },
]

const RIGHT = [
  { label: 'About', to: '/about' },
  { label: 'Agents', to: '/about#team' },
  { label: 'Contact', to: '/contact' },
]

function JoinList() {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }
  return (
    <div className="mx-auto flex max-w-intro flex-col items-center gap-3xl text-center">
      <div className="flex flex-col items-center gap-lg">
        <SectionLabel tone="Chalk">Off market</SectionLabel>
        <h2 className="text-40 md:text-56">Join the list</h2>
        <p className="max-w-split text-16">A few homes each season, shown to a few people first. No noise in between.</p>
      </div>
      {sent ? (
        <p role="status" className="text-14">
          Thank you. This is a concept site, so nothing was sent and nothing was stored.
        </p>
      ) : (
        <form onSubmit={submit} className="flex w-full max-w-[560px] flex-col gap-md text-left">
          <div className="flex items-center gap-sm border-b border-linen">
            <label htmlFor="join-email" className="sr-only">Email address</label>
            <input
              id="join-email"
              type="email"
              required
              placeholder="Email address"
              className="min-h-12 flex-1 bg-transparent text-16 text-linen placeholder:text-vino-bianco focus-visible:outline-none"
            />
            <button
              type="submit"
              aria-label="Join the list"
              className="flex size-11 items-center justify-center text-linen transition-colors hover:text-limone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              <ArrowRight size={20} />
            </button>
          </div>
          <Checkbox inverse required label="I accept the Privacy and Terms" />
        </form>
      )}
    </div>
  )
}

/**
 * The final call to action and the footer are one Cerulean block. The join form sits on top,
 * then a single row: links left, logomark with the legal lines centred, links right. Below 768 it stacks.
 */
export function Footer() {
  return (
    <footer className="bg-cerulean text-linen">
      <div className="mx-auto max-w-page px-gutter pt-[96px] pb-4xl md:pt-[120px]">
        <JoinList />

        <div className="mt-[96px] grid items-center gap-4xl md:mt-[120px] md:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col items-center gap-md text-center md:col-start-2 md:row-start-1">
            <Logomark className="h-[88px] w-auto text-limone" />
            <ul className="eyebrow flex flex-wrap justify-center gap-md text-vino-bianco">
              <li><Link to="/about#privacy" className="hover:text-linen">Privacy</Link></li>
              <li><Link to="/about#terms" className="hover:text-linen">Terms</Link></li>
            </ul>
            <p className="eyebrow text-vino-bianco">© 2026 Doré, a concept project</p>
          </div>
          <nav aria-label="Explore" className="md:col-start-1 md:row-start-1">
            <ul className="flex flex-wrap justify-center gap-x-xl gap-y-sm md:justify-start">
              {LEFT.map((l) => (
                <li key={l.to}><TextLink to={l.to} size="Medium" inverse>{l.label}</TextLink></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Agency" className="md:col-start-3 md:row-start-1">
            <ul className="flex flex-wrap justify-center gap-x-xl gap-y-sm md:justify-end">
              {RIGHT.map((l) => (
                <li key={l.to}><TextLink to={l.to} size="Medium" inverse>{l.label}</TextLink></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
