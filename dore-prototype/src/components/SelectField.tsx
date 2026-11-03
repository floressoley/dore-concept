import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cn } from '../lib/cn.ts'
import { Check, ChevronDown } from './Icons.tsx'

export type SelectOption = { value: string; label: string }

type SelectFieldProps = {
  name: string
  label: string
  icon: ReactNode
  options: SelectOption[]
  defaultValue?: string
  className?: string
}

const OPTION_HEIGHT = 44

/**
 * Styled select for the search bar. Same behaviour as a native select (arrow keys, Home, End,
 * Enter, Space, Escape, click outside) but with our own list. Posts its value through a hidden input.
 * States are shown with a soft fill, not a stroke. Keyboard focus adds a short underline bar.
 */
export function SelectField({ name, label, icon, options, defaultValue = '', className }: SelectFieldProps) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [up, setUp] = useState(false)

  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value))
  const current = options[selectedIndex]

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const show = () => {
    const rect = root.current?.getBoundingClientRect()
    if (rect) {
      const needed = options.length * OPTION_HEIGHT + 24
      setUp(rect.bottom + needed > window.innerHeight && rect.top > needed)
    }
    setActive(selectedIndex)
    setOpen(true)
  }

  const choose = (i: number) => {
    setValue(options[i].value)
    setOpen(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (open) setActive((a) => Math.min(a + 1, options.length - 1))
        else show()
        break
      case 'ArrowUp':
        e.preventDefault()
        if (open) setActive((a) => Math.max(a - 1, 0))
        else show()
        break
      case 'Home':
        if (open) {
          e.preventDefault()
          setActive(0)
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          setActive(options.length - 1)
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (open) choose(active)
        else show()
        break
      case 'Escape':
        if (open) {
          e.preventDefault()
          setOpen(false)
        }
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  return (
    <div ref={root} className={cn('relative flex-1', className)}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={cn(
          'flex w-full cursor-pointer items-center gap-md rounded-control px-lg py-md text-left outline-none transition-colors duration-200',
          'hover:bg-vino-bianco/70 active:bg-vino-bianco focus-visible:shadow-[inset_0_-2px_0_0_var(--color-ink)]',
          open && 'bg-vino-bianco',
        )}
      >
        <span className="shrink-0 text-ink-muted">{icon}</span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span id={`${id}-label`} className="text-12 text-ink-muted">{label}</span>
          <span id={`${id}-value`} className="truncate text-14 font-medium text-ink">{current.label}</span>
        </span>
        <ChevronDown size={14} className={cn('shrink-0 text-ink-muted transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            'absolute left-0 z-30 w-full min-w-[220px] animate-fade-in rounded-media bg-linen p-2xs text-ink shadow-[0_16px_40px_rgb(26_21_18/0.22)]',
            up ? 'bottom-full mb-xs' : 'top-full mt-xs',
          )}
        >
          {options.map((o, i) => (
            <li
              key={o.value || o.label}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === selectedIndex}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={cn(
                'flex min-h-11 cursor-pointer items-center justify-between gap-md rounded-control px-md text-14 transition-colors',
                i === active && 'bg-vino-bianco',
                i === selectedIndex ? 'font-medium' : 'text-ink',
              )}
            >
              {o.label}
              {i === selectedIndex && <Check size={14} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
