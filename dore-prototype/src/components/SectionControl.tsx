import { useId, useState } from 'react'
import { cn } from '../lib/cn.ts'
import { Minus, Plus } from './Icons.tsx'

type SectionControlProps = {
  /** Section number shown first, e.g. "03". */
  index: string
  title: string
  items: { n: string; label: string; href: string }[]
  /** Number of the section being read, marked in the index. */
  current?: string
  /** Force a state for documentation. Open starts expanded. */
  state?: 'Default' | 'Hover' | 'Pressed' | 'Open'
}

/**
 * Section Control v2. Figma "Size": Wide (680) and Compact (352) follow the container width.
 * Default, Hover, Pressed and Open: Hover fills vino bianco, Pressed and Open darken the border.
 */
export function SectionControl({ index, title, items, current, state = 'Default' }: SectionControlProps) {
  const [open, setOpen] = useState(state === 'Open')
  const id = useId()
  const dataState = state === 'Hover' || state === 'Pressed' ? state : undefined
  return (
    <div className="@container w-full">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-index`}
        data-state={dataState}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full items-center gap-sm rounded-control border px-sm py-xs text-left transition-colors @min-[560px]:gap-sm @min-[560px]:px-5 @min-[560px]:py-sm',
          open ? 'border-ink' : 'border-ink/55',
          'hover:bg-vino-bianco active:border-ink active:bg-vino-bianco',
          state === 'Pressed' && 'border-ink',
        )}
      >
        <span className="eyebrow font-normal text-ink-muted">{index}</span>
        <span className="eyebrow flex-1 text-ink">{title}</span>
        {open ? <Minus size={12} /> : <Plus size={12} />}
      </button>

      {open && (
        <div id={`${id}-index`} className="pt-xl">
          <div className="eyebrow flex items-center justify-between border-b border-ink/25 pb-md font-normal text-ink-muted">
            <span>In this guide</span>
            <span>{items.length} sections</span>
          </div>
          <ol className="grid grid-cols-1 gap-x-2xl gap-y-md pt-lg @min-[560px]:grid-cols-2">
            {items.map((item) => {
              const isCurrent = item.n === current
              return (
                <li key={item.n} className="eyebrow flex gap-sm font-normal">
                  <span className={isCurrent ? 'text-ink' : 'text-ink-muted'}>{item.n}</span>
                  <a href={item.href} aria-current={isCurrent ? 'location' : undefined} className={cn('hover:text-cerulean', isCurrent ? 'font-medium text-ink' : 'text-ink')}>
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </div>
  )
}
