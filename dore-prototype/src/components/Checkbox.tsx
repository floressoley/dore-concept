import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../lib/cn.ts'
import { Check } from './Icons.tsx'

type CheckboxProps = { label: string; inverse?: boolean } & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

/** State=Unchecked | Checked follows the native checked value. */
export function Checkbox({ label, inverse, className, id, ...rest }: CheckboxProps) {
  const auto = useId()
  const inputId = id ?? auto
  return (
    <label htmlFor={inputId} className={cn('inline-flex cursor-pointer items-center gap-sm', inverse ? 'text-linen' : 'text-ink', className)}>
      <input id={inputId} type="checkbox" className="peer sr-only" {...rest} />
      <span
        aria-hidden="true"
        className={cn(
          'flex size-4 shrink-0 items-center justify-center rounded-check border transition-colors',
          inverse ? 'border-linen peer-checked:bg-linen peer-checked:text-ink' : 'border-ink peer-checked:bg-vino-bianco',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-current',
          '[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100',
        )}
      >
        <Check size={12} />
      </span>
      <span className="eyebrow">{label}</span>
    </label>
  )
}
