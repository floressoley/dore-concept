import { useId, useState } from 'react'
import { cn } from '../lib/cn.ts'
import { Close, Search } from './Icons.tsx'

type SearchFieldProps = {
  size?: 'Medium' | 'Large'
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (value: string) => void
  label?: string
  className?: string
  autoFocus?: boolean
}

/** State=Default | Active: Active is the focused field, or any field that has a value. */
export function SearchField({ size = 'Medium', value, defaultValue = '', placeholder = 'Search guides and homes', onChange, label = 'Search', className, autoFocus }: SearchFieldProps) {
  const id = useId()
  const [inner, setInner] = useState(defaultValue)
  const current = value ?? inner
  const set = (v: string) => {
    setInner(v)
    onChange?.(v)
  }
  return (
    <div
      className={cn(
        'group flex min-h-12 items-center gap-sm rounded-control border border-ink/55 px-md py-sm transition-colors focus-within:border-cerulean',
        current && 'border-cerulean',
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">{label}</label>
      <Search size={18} className="shrink-0 text-ink-muted group-focus-within:text-ink" />
      <input
        id={id}
        type="search"
        value={current}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onChange={(e) => set(e.target.value)}
        className={cn(
          'min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-muted [&::-webkit-search-cancel-button]:hidden',
          size === 'Large' ? 'text-16' : 'text-14',
        )}
      />
      {current && (
        <button type="button" aria-label="Clear search" onClick={() => set('')} className="shrink-0 text-ink">
          <Close size={14} />
        </button>
      )}
    </div>
  )
}
