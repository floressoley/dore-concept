import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { cn } from '../lib/cn.ts'

export type NavItemState = 'Default' | 'Hover' | 'Active' | 'Pressed'

type NavItemProps = {
  to: string
  children: ReactNode
  /** Force a state for documentation. Active is otherwise read from the route. */
  state?: NavItemState
  /** Dark = on Ink, for the drawer. */
  tone?: 'Light' | 'Dark'
  size?: 'Small' | 'Large'
  onClick?: () => void
  className?: string
}

/**
 * Nav link states: Default, Hover (faint underline), Active (1px underline, 6px below the
 * text) and Pressed (accent colour with underline).
 */
export function NavItem({ to, children, state = 'Default', tone = 'Light', size = 'Small', onClick, className }: NavItemProps) {
  const { pathname } = useLocation()
  const active = state === 'Active' || (state === 'Default' && (pathname === to || pathname.startsWith(`${to}/`)))
  const dataState = state === 'Hover' || state === 'Pressed' ? state : undefined
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      data-state={dataState}
      className={cn(
        'group/nav inline-flex min-h-11 items-center transition-colors duration-300',
        size === 'Large' ? 'label-xl' : 'label-m',
        tone === 'Dark' ? 'text-linen active:text-limone' : 'text-ink active:text-cerulean',
        className,
      )}
    >
      <span
        className={cn(
          'relative after:absolute after:inset-x-0 after:-bottom-[6px] after:h-px after:bg-current after:opacity-0 after:transition-opacity after:duration-200',
          'group-hover/nav:after:opacity-40 group-data-[state=Hover]/nav:after:opacity-40',
          'group-aria-[current=page]/nav:after:opacity-100',
          'group-active/nav:after:opacity-100 group-data-[state=Pressed]/nav:after:opacity-100',
        )}
      >
        {children}
      </span>
    </Link>
  )
}
