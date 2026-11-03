import { Link } from 'react-router'
import { Wordmark } from './Logo.tsx'
import { SectionLabel } from './SectionLabel.tsx'
import { TextLink } from './TextLink.tsx'

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Homes', to: '/buy' },
      { label: 'Areas', to: '/buy#areas' },
      { label: 'Sell', to: '/sell' },
      { label: 'Journal', to: '/guides' },
    ],
  },
  {
    title: 'Agency',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Agents', to: '/about#team' },
      { label: 'Contact', to: '/about#contact' },
    ],
  },
]

/**
 * Figma "Layout": Desktop, Tablet, Mobile. One markup, the grid collapses:
 * 4 columns from 1040, 2 columns from 768, 1 column below.
 */
export function Footer() {
  return (
    <footer className="bg-ink text-linen">
      <div className="mx-auto max-w-page px-gutter pt-5xl pb-2xl lg:pt-6xl">
        <div className="grid gap-4xl md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-lg md:col-span-2 lg:col-span-1">
            <Wordmark className="h-10 w-auto self-start text-linen" />
            <p className="font-display text-28 max-w-quote text-linen">Doré, Mediterranean homes</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-md">
              <SectionLabel tone="Stone">{col.title}</SectionLabel>
              <ul className="flex flex-col gap-xs">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <TextLink to={l.to} inverse>{l.label}</TextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-md">
            <SectionLabel tone="Stone">Contact</SectionLabel>
            <address className="flex flex-col gap-xs not-italic">
              <a href="mailto:hello@dore.example" className="text-14 text-linen hover:text-limone">hello@dore.example</a>
              <a href="tel:+000000000000" className="text-14 text-linen hover:text-limone">+00 000 000 000</a>
              <span className="text-14 text-azzuro">Calle Ficticia 0, Costa Imaginaria</span>
            </address>
          </div>
        </div>

        <div className="mt-5xl flex flex-col gap-md border-t border-linen/25 pt-lg lg:flex-row lg:items-center lg:justify-between">
          <p className="eyebrow text-azzuro">Concept project. Fictional agency, not a real business.</p>
          <ul className="eyebrow flex flex-wrap gap-lg text-azzuro">
            <li><Link to="/about#privacy" className="hover:text-linen">Privacy</Link></li>
            <li><Link to="/about#terms" className="hover:text-linen">Terms</Link></li>
            <li><span>© 2026 Doré</span></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
