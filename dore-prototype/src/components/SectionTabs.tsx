import { useId, useState } from 'react'
import { cn } from '../lib/cn.ts'
import { Checkbox } from './Checkbox.tsx'
import { ChevronDown, ChevronUp } from './Icons.tsx'

type TabItemProps = {
  label: string
  state?: 'Default' | 'Hover' | 'Open'
  controls?: string
  onClick?: () => void
}

/** Tab Item: Default, Hover, Open. Hover and Open add a 1px underline 2px below the label. */
export function TabItem({ label, state = 'Default', controls, onClick }: TabItemProps) {
  const open = state === 'Open'
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      data-state={state === 'Hover' ? 'Hover' : undefined}
      onClick={onClick}
      className={cn(
        'eyebrow inline-flex min-h-11 shrink-0 items-center gap-2xs whitespace-nowrap border-b border-transparent pb-[2px] transition-colors',
        open ? 'border-ink text-ink' : 'text-ink-muted hover:border-ink hover:text-ink',
      )}
    >
      {label}
      {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
    </button>
  )
}

export type TabPanel =
  | { type: 'Checkboxes'; options: { label: string; checked?: boolean }[] }
  | { type: 'Columns'; columns: { label: string; href: string }[][] }

type SectionTabsProps = {
  tabs: { label: string; panel: TabPanel }[]
  /** Index of the tab open on first render. null = Panel Closed. */
  defaultOpen?: number | null
}

/** Figma "Panel": Closed, Checkboxes, Columns. One panel open at a time, the open tab toggles it. */
export function SectionTabs({ tabs, defaultOpen = null }: SectionTabsProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const id = useId()
  const panel = open === null ? null : tabs[open].panel
  return (
    <div className="rounded-control bg-vino-bianco">
      <div className="flex gap-xl overflow-x-auto px-lg py-xs">
        {tabs.map((tab, i) => (
          <TabItem
            key={tab.label}
            label={tab.label}
            state={open === i ? 'Open' : 'Default'}
            controls={`${id}-panel`}
            onClick={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>
      {panel && (
        <div id={`${id}-panel`} className="px-lg pt-xs pb-lg">
          {panel.type === 'Checkboxes' ? (
            <div className="flex flex-col gap-sm">
              {panel.options.map((o) => (
                <Checkbox key={o.label} label={o.label} defaultChecked={o.checked} />
              ))}
            </div>
          ) : (
            <div className="grid gap-lg sm:grid-cols-2">
              {panel.columns.map((col, ci) => (
                <ul key={ci} className="flex flex-col gap-sm">
                  {col.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="eyebrow text-ink-muted hover:text-ink">{l.label}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
