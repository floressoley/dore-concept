import { useState } from 'react'
import { Link } from 'react-router'
import { cn } from '../lib/cn.ts'
import { Button } from './Button.tsx'
import { Checkbox } from './Checkbox.tsx'
import { Close } from './Icons.tsx'
import { SearchField } from './SearchField.tsx'
import { SectionLabel } from './SectionLabel.tsx'
import { Overlay } from './Overlay.tsx'

type SidePanelProps = {
  type?: 'Search' | 'Article' | 'Filters'
  onClose?: () => void
  className?: string
}

const RESULTS = [
  { group: 'Guides', title: 'Buying near the water, step by step', time: '8 min read', to: '/guides/buying-near-the-water' },
  { group: 'Guides', title: 'How to read a sea-view claim', time: '5 min read', to: '/guides/sea-view-claims' },
  { group: 'Guides', title: 'Old town or new build', time: '6 min read', to: '/guides/old-town-or-new-build' },
  { group: 'Journal', title: 'A morning on the harbour road', time: '4 min read', to: '/journal/harbour-road' },
  { group: 'Journal', title: 'Why we say no to one in three homes', time: '7 min read', to: '/journal/saying-no' },
]

const OUTLINE = ['Before you start', 'Choosing the stretch of coast', 'Light, wind and noise', 'Reading the paperwork', 'Making an offer', 'After the keys']

const FILTERS = [
  { title: 'Home type', options: ['Apartment', 'Townhouse', 'Villa', 'Land'] },
  { title: 'Setting', options: ['Seafront', 'Old town', 'Hillside'] },
  { title: 'Bedrooms', options: ['1 to 2', '3 to 4', '5 or more'] },
]

const Title = ({ children }: { children: string }) => <SectionLabel tone="Muted">{children}</SectionLabel>

function SearchBody({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const hits = q ? RESULTS.filter((r) => r.title.toLowerCase().includes(q)) : RESULTS.slice(0, 3)
  const groups = Array.from(new Set(hits.map((h) => h.group)))
  return (
    <>
      <div className="flex items-center justify-between">
        <Title>Search</Title>
        <button type="button" aria-label="Close search" onClick={onClose} className="flex size-11 items-center justify-center text-ink">
          <Close size={16} />
        </button>
      </div>
      <SearchField size="Medium" value={query} onChange={setQuery} autoFocus placeholder="Search guides and journal" />
      <p className="eyebrow text-ink-muted" aria-live="polite">
        {!q ? 'Popular reads' : hits.length ? `${hits.length} result${hits.length > 1 ? 's' : ''}` : `No results for “${query.trim()}”`}
      </p>
      <div className="flex flex-col gap-lg">
        {groups.map((group) => (
          <div key={group} className="flex flex-col gap-md">
            <Title>{group}</Title>
            {hits.filter((h) => h.group === group).map((h) => (
              <Link key={h.to} to={h.to} onClick={onClose} className="group flex flex-col gap-2xs">
                <span className="font-display text-28 leading-[1.1] text-ink group-hover:text-cerulean">{h.title}</span>
                <span className="eyebrow text-ink-muted">{h.time}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

/** Figma "Type": Search (chalk), Article, Filters. 393 wide on mobile. */
export function SidePanel({ type = 'Search', onClose, className }: SidePanelProps) {
  return (
    <div className={cn('flex h-full w-full flex-col justify-between gap-2xl overflow-y-auto p-lg', type === 'Search' ? 'bg-vino-bianco' : 'bg-linen', className)}>
      <div className="flex flex-col gap-lg">
        {type === 'Search' && <SearchBody onClose={onClose} />}
        {type === 'Article' && (
          <>
            <Title>In this article</Title>
            <ol className="flex flex-col gap-md">
              {OUTLINE.map((item, i) => (
                <li key={item} className="eyebrow flex gap-sm">
                  <span className="text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                  <a href={`#section-${i + 1}`} onClick={onClose} className="text-ink hover:text-cerulean">{item}</a>
                </li>
              ))}
            </ol>
          </>
        )}
        {type === 'Filters' && (
          <>
            <Title>Filters</Title>
            {FILTERS.map((group, gi) => (
              <fieldset key={group.title} className="flex flex-col gap-sm">
                <legend className="eyebrow mb-sm text-ink-muted">{group.title}</legend>
                {group.options.map((o, oi) => (
                  <Checkbox key={o} label={o} defaultChecked={gi === 0 && oi === 0} />
                ))}
              </fieldset>
            ))}
          </>
        )}
      </div>
      {type !== 'Search' && (
        <Button variant="Primary" className="w-full" onClick={onClose}>Close</Button>
      )}
    </div>
  )
}

export function SidePanelOverlay({ open, onClose, type = 'Search' }: { open: boolean; onClose: () => void; type?: SidePanelProps['type'] }) {
  return (
    <Overlay open={open} onClose={onClose} label={type} side="right">
      <SidePanel type={type} onClose={onClose} />
    </Overlay>
  )
}
