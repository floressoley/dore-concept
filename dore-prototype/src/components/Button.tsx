import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../lib/cn.ts'
import { ArrowUpRight } from './Icons.tsx'

export type ButtonVariant = 'Primary' | 'Secondary'
export type ButtonState = 'Default' | 'Hover' | 'Pressed' | 'Disabled'

type ButtonProps = {
  /** Figma "Type" */
  variant?: ButtonVariant
  /** Force a state for documentation. Real hover and press work without it. */
  state?: ButtonState
  /** On dark photos or video: linen button instead of ink. */
  inverse?: boolean
  /** Figma "Arrow" */
  arrow?: boolean
  /** Icon shown before the label, side by side with it. */
  icon?: ReactNode
  to?: string
  href?: string
  children: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

const VARIANTS: Record<ButtonVariant, string> = {
  Primary: 'bg-ink text-linen hover:bg-cerulean active:bg-cerulean-deep',
  Secondary: 'border border-ink text-ink hover:border-cerulean hover:text-cerulean active:bg-ink/5',
}

const INVERSE: Record<ButtonVariant, string> = {
  Primary: 'bg-linen text-ink hover:bg-limone active:bg-vino-bianco',
  Secondary: 'border border-linen text-linen hover:border-limone hover:text-limone active:bg-linen/10',
}

const DISABLED: Record<ButtonVariant, string> = {
  Primary: 'bg-ink/12 text-ink/45',
  Secondary: 'border border-ink/20 text-ink/45',
}

export function Button({ variant = 'Primary', state = 'Default', arrow = false, icon, inverse = false, to, href, children, className, ...rest }: ButtonProps) {
  const disabled = state === 'Disabled' || rest.disabled
  const classes = cn(
    'label-m inline-flex min-h-11 items-center justify-center gap-sm rounded-control px-6 py-3 text-center transition-colors duration-200',
    disabled ? cn('pointer-events-none cursor-not-allowed', DISABLED[variant]) : (inverse ? INVERSE : VARIANTS)[variant],
    className,
  )
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <ArrowUpRight size={20} />}
    </>
  )
  const dataState = state === 'Hover' || state === 'Pressed' ? state : undefined

  if (to && !disabled) return <Link to={to} className={classes} data-state={dataState}>{content}</Link>
  if (href && !disabled) return <a href={href} className={classes} data-state={dataState}>{content}</a>
  return (
    <button type="button" {...rest} disabled={disabled} className={classes} data-state={dataState}>
      {content}
    </button>
  )
}
