import { useId, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { Button } from '../components/Button.tsx'
import { HomeCard } from '../components/HomesCollection.tsx'
import { Bed, ChevronDown, House, Sort, Wallet } from '../components/Icons.tsx'
import { SearchField } from '../components/SearchField.tsx'
import { cn } from '../lib/cn.ts'
import { AREAS, LISTINGS } from '../data/homes.ts'

type Option = { value: string; label: string }

const TYPES: Option[] = [
  { value: '', label: 'Any type' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'villa', label: 'Villa' },
  { value: 'farmhouse', label: 'Farmhouse' },
]

// Same budget keys the Homepage search sends.
const BUDGETS: (Option & { min: number; max: number })[] = [
  { value: '', label: 'Any budget', min: 0, max: Infinity },
  { value: 'to-1m', label: 'Up to €1M', min: 0, max: 1_000_000 },
  { value: '1m-2m', label: '€1M to €2M', min: 1_000_000, max: 2_000_000 },
  { value: '2m-4m', label: '€2M to €4M', min: 2_000_000, max: 4_000_000 },
  { value: '4m-plus', label: '€4M and above', min: 4_000_000, max: Infinity },
]

const BEDS: Option[] = [
  { value: '', label: 'Any bedrooms' },
  { value: '2', label: '2+ bedrooms' },
  { value: '3', label: '3+ bedrooms' },
  { value: '4', label: '4+ bedrooms' },
  { value: '5', label: '5+ bedrooms' },
]

const SORTS: Option[] = [
  { value: '', label: 'Recommended' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price, high to low' },
  { value: 'size-desc', label: 'Size, largest first' },
]

const PAGE = 6

/** Native select, styled to sit beside SearchField. Keeps the device's own picker on phones. */
function Select({ label, icon, value, options, onChange, className }: { label: string; icon: ReactNode; value: string; options: Option[]; onChange: (v: string) => void; className?: string }) {
  const id = useId()
  return (
    <div className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">{label}</label>
      <span className="pointer-events-none absolute top-1/2 left-md -translate-y-1/2 text-ink-muted">{icon}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'min-h-12 w-full cursor-pointer appearance-none rounded-control border bg-linen py-sm pr-xl pl-[44px] text-14 text-ink transition-colors hover:border-ink focus-visible:border-cerulean focus-visible:outline-none',
          value ? 'border-cerulean' : 'border-ink/40',
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute top-1/2 right-md -translate-y-1/2 text-ink-muted" />
    </div>
  )
}

/**
 * Homes. Area is the main choice, so it leads as a row of tabs. Search and the three filters sit in
 * one bar under it, and sorting sits beside the result count. Everything applies as you change it and
 * lives in the URL (?area=&type=&budget=&beds=&q=&sort=), which is what the Homepage search sends.
 */
export default function Buy() {
  const [params, setParams] = useSearchParams()
  const area = params.get('area') ?? ''
  const type = params.get('type') ?? ''
  const budget = params.get('budget') ?? ''
  const beds = params.get('beds') ?? ''
  const q = params.get('q') ?? ''
  const sort = params.get('sort') ?? ''

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const range = BUDGETS.find((b) => b.value === budget) ?? BUDGETS[0]
    const needle = q.trim().toLowerCase()
    const list = LISTINGS.filter(
      (h) =>
        (!area || h.area === area) &&
        (!type || h.type === type) &&
        h.priceEur >= range.min &&
        h.priceEur < range.max &&
        (!beds || h.beds >= Number(beds)) &&
        (!needle || `${h.title} ${h.location} ${h.type}`.toLowerCase().includes(needle)),
    )
    if (sort === 'price-asc') list.sort((a, b) => a.priceEur - b.priceEur)
    if (sort === 'price-desc') list.sort((a, b) => b.priceEur - a.priceEur)
    if (sort === 'size-desc') list.sort((a, b) => b.size - a.size)
    return list
  }, [area, type, budget, beds, q, sort])

  // "Show more" only applies to the filters it was pressed under.
  const filterKey = [area, type, budget, beds, q, sort].join('|')
  const [expandedFor, setExpandedFor] = useState('')
  const visible = expandedFor === filterKey ? filtered : filtered.slice(0, PAGE)

  const active = Boolean(area || type || budget || beds || q)
  const clear = () => setParams({}, { replace: true })

  return (
    <>
      <div className="-mt-nav bg-azzuro px-gutter pt-[calc(var(--spacing-nav)+var(--spacing-4xl))] pb-4xl md:pt-[calc(var(--spacing-nav)+var(--spacing-5xl))]">
        <div className="mx-auto max-w-page">
          <header className="flex flex-col gap-md">
            <h1 className="text-56 md:text-72">Homes</h1>
            <p className="text-16">Homes we have walked through, by the part of the coast they belong to.</p>
          </header>
  
          <nav id="areas" aria-label="Areas" className="-mx-[var(--gutter)] mt-4xl flex gap-xl overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[{ slug: '', label: 'All areas' }, ...AREAS].map((a) => {
              const on = area === a.slug
              const count = LISTINGS.filter((h) => !a.slug || h.area === a.slug).length
              return (
                <button
                  key={a.slug || 'all'}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set('area', a.slug)}
                  className={cn(
                    'eyebrow inline-flex min-h-11 shrink-0 items-center gap-xs whitespace-nowrap border-b pb-[2px] transition-colors',
                    on ? 'border-ink text-ink' : 'border-transparent text-ink/70 hover:border-ink hover:text-ink',
                  )}
                >
                  {a.label}
                  <span className="font-normal">{count}</span>
                </button>
              )
            })}
          </nav>
  
          <form role="search" aria-label="Search homes" onSubmit={(e) => e.preventDefault()} className="mt-lg grid grid-cols-2 gap-sm sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <SearchField label="Search homes" placeholder="Search by name, area or type" value={q} onChange={(v) => set('q', v)} className="col-span-2 bg-linen sm:col-span-3 lg:col-span-1" />
            <Select label="Type" icon={<House size={18} />} value={type} options={TYPES} onChange={(v) => set('type', v)} />
            <Select label="Budget" icon={<Wallet size={18} />} value={budget} options={BUDGETS} onChange={(v) => set('budget', v)} />
            <Select label="Bedrooms" icon={<Bed size={18} />} value={beds} options={BEDS} onChange={(v) => set('beds', v)} className="col-span-2 sm:col-span-1 lg:col-span-1" />
          </form>
        </div>
      </div>

      <div className="px-gutter pt-xl pb-[96px] md:pb-[120px]">
      <div className="mx-auto max-w-page">
          <div className="flex flex-wrap items-center justify-between gap-md">
            <p role="status" className="flex items-center gap-md text-14 text-ink-muted">
              {filtered.length} {filtered.length === 1 ? 'home' : 'homes'}
              {active && (
                <button type="button" onClick={clear} className="eyebrow text-ink underline underline-offset-4 hover:text-cerulean">Clear all</button>
              )}
            </p>
            <Select label="Sort by" icon={<Sort size={18} />} value={sort} options={SORTS} onChange={(v) => set('sort', v)} className="w-[190px] sm:w-[240px]" />
          </div>
  
          {filtered.length > 0 ? (
            <>
              <div className="mt-3xl grid gap-x-xl gap-y-4xl sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((home) => (
                  <HomeCard key={home.title} home={home} ratio="aspect-[4/3]" />
                ))}
              </div>
              {visible.length < filtered.length && (
                <div className="mt-5xl flex justify-center">
                  <Button variant="Secondary" onClick={() => setExpandedFor(filterKey)}>Show more homes</Button>
                </div>
              )}
            </>
          ) : (
            <div className="mt-5xl flex flex-col items-center gap-md py-4xl text-center">
              <h2 className="text-28">No homes match these choices</h2>
              <p className="max-w-split text-16 text-ink-muted">Try another area, or widen the budget or bedrooms.</p>
              <Button variant="Secondary" onClick={clear}>Clear all</Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
