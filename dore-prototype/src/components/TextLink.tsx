import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../lib/cn.ts'
import { ArrowLeft, ArrowRight } from './Icons.tsx'

type TextLinkProps = {
  size?: 'Small' | 'Medium'
  state?: 'Default' | 'Hover'
  arrowLeft?: boolean
  arrowRight?: boolean
  /** Set on dark surfaces (Ink, Cerulean, Hillside). */
  inverse?: boolean
  /** Set on Terracotta or Pear Tree, where the usual hover colours fail contrast: hover underlines instead. */
  onAccent?: boolean
  to?: string
  href?: string
  className?: string
  children: ReactNode
}

export function TextLink({ size = 'Small', state = 'Default', arrowLeft, arrowRight, inverse, onAccent, to, href, className, children }: TextLinkProps) {
  const classes = cn(
    'inline-flex items-center gap-xs transition-colors duration-200',
    size === 'Small' ? 'eyebrow' : 'label-m',
    onAccent ? 'text-ink underline-offset-4 hover:underline' : inverse ? 'text-linen hover:text-limone' : 'text-ink hover:text-cerulean',
    className,
  )
  const content = (
    <>
      {arrowLeft && <ArrowLeft size={14} />}
      <span>{children}</span>
      {arrowRight && <ArrowRight size={14} />}
    </>
  )
  const dataState = state === 'Hover' ? 'Hover' : undefined
  return to ? (
    <Link to={to} className={classes} data-state={dataState}>{content}</Link>
  ) : (
    <a href={href ?? '#'} className={classes} data-state={dataState}>{content}</a>
  )
}
