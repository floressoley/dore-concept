import { useId } from 'react'
import type { ReactNode, SelectHTMLAttributes } from 'react'
import { cn } from '../lib/cn.ts'
import { ChevronDown } from './Icons.tsx'

/** Shared look for text inputs, selects and textareas in forms. Add `cursor-pointer` on selects. */
export const fieldClass =
  'min-h-12 w-full rounded-control border border-ink/55 bg-linen px-md py-sm text-14 text-ink transition-colors placeholder:text-ink-muted hover:border-ink focus-visible:border-cerulean focus-visible:outline-none'

/** A label over a control. The control is a render prop so it can take the generated id. */
export function Field({ label, className, children }: { label: string; className?: string; children: (id: string) => ReactNode }) {
  const id = useId()
  return (
    <div className={cn('flex flex-col gap-2xs', className)}>
      <label htmlFor={id} className="text-12 text-ink-muted">{label}</label>
      {children(id)}
    </div>
  )
}

/** A select with our own chevron, set 16px in from the right edge. Pass the same class as the other fields. */
export function FieldSelect({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...rest} className={cn(fieldClass, 'cursor-pointer appearance-none pr-[44px]', className)}>
        {children}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute top-1/2 right-md -translate-y-1/2 text-ink-muted" />
    </div>
  )
}
