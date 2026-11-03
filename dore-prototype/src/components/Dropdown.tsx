import { useId, useState } from 'react'
import { cn } from '../lib/cn.ts'
import { ChevronDown, ChevronRight } from './Icons.tsx'

type DropdownItemProps = {
  label: string
  /** Figma "Type": Parent opens a list, Link goes to a page. */
  type?: 'Parent' | 'Link'
  state?: 'Default' | 'Hover' | 'Open'
  controls?: string
  href?: string
  onClick?: () => void
}

/** Dropdown Item. Open adds a 2px left border and turns the chevron down. */
export function DropdownItem({ label, type = 'Parent', state = 'Default', controls, href = '#', onClick }: DropdownItemProps) {
  const open = state === 'Open'
  const classes = cn(
    'eyebrow flex min-h-11 w-full items-center justify-between gap-sm rounded-r-control border-l-2 px-sm py-xs text-left transition-colors',
    open ? 'border-ink text-ink' : 'border-transparent text-ink-muted hover:text-ink',
  )
  const dataState = state === 'Hover' ? 'Hover' : undefined
  if (type === 'Link') {
    return <a href={href} data-state={dataState} className={classes}>{label}</a>
  }
  return (
    <button type="button" aria-expanded={open} aria-controls={controls} data-state={dataState} onClick={onClick} className={classes}>
      {label}
      {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
    </button>
  )
}

export type DropdownEntry = { label: string; links: { label: string; href: string }[] }

/** Figma "State": Closed or Open. Open reveals the sub-items under the chosen parent. */
export function Dropdown({ items, defaultOpen = null }: { items: DropdownEntry[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const id = useId()
  return (
    <div className="flex w-full max-w-[220px] flex-col gap-2xs">
      {items.map((item, i) => (
        <div key={item.label}>
          <DropdownItem
            label={item.label}
            state={open === i ? 'Open' : 'Default'}
            controls={`${id}-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
          />
          {open === i && (
            <ul id={`${id}-${i}`} className="flex flex-col gap-sm py-xs pl-[28px]">
              {item.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="eyebrow text-ink-muted hover:text-ink">{l.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
