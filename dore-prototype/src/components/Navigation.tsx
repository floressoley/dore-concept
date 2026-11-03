import { useEffect, useState } from 'react'
import type { FocusEvent } from 'react'
import { Link } from 'react-router'
import { cn } from '../lib/cn.ts'
import { Drawer } from './Drawer.tsx'
import { Menu, Search } from './Icons.tsx'
import { Wordmark } from './Logo.tsx'
import { useNavThemeValue } from './NavTheme.tsx'
import { NavItem } from './NavItem.tsx'
import { SidePanelOverlay } from './SidePanel.tsx'

export const NAV_LEFT = [
  { label: 'Homes', to: '/buy' },
  { label: 'Areas', to: '/buy#areas' },
  { label: 'Agents', to: '/about#team' },
]

export const NAV_RIGHT = [
  { label: 'Journal', to: '/guides' },
  { label: 'Sell', to: '/sell' },
  { label: 'Contact', to: '/about#contact' },
]

type IconButtonProps = { label: string; onClick: () => void; children: React.ReactNode; onDark: boolean; className?: string }

const IconButton = ({ label, onClick, children, onDark, className }: IconButtonProps) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={cn(
      'flex size-11 items-center justify-center transition-colors duration-300',
      onDark ? 'text-linen hover:text-limone' : 'text-ink hover:text-cerulean active:text-cerulean-deep',
      className,
    )}
  >
    {children}
  </button>
)

/**
 * Figma "Layout": Desktop 1440 and Tablet 1040 show three links on each side of the centred
 * logo. Portrait 768 and Mobile 393 swap them for a menu button that opens the drawer.
 * 80px tall, 40px logo.
 *
 * The bar has no background at rest. It fades to linen when the page is scrolled, or when the
 * pointer or keyboard focus is anywhere on it. Over a photo or video (NavTheme "Photo") the
 * text starts linen and flips to ink with the background.
 */
export function Navigation() {
  const theme = useNavThemeValue()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [engaged, setEngaged] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || engaged || menuOpen || searchOpen
  const onDark = theme === 'Photo' && !solid
  const leave = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setEngaged(false)
  }

  return (
    <header
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={leave}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ease-out',
        solid ? 'bg-linen shadow-[0_1px_0_0_rgb(26_21_18/0.12)]' : 'bg-transparent shadow-[0_1px_0_0_rgb(26_21_18/0)]',
      )}
    >
      <div className="mx-auto grid h-nav max-w-page grid-cols-[1fr_auto_1fr] items-center px-gutter">
        <div className="flex items-center">
          <nav aria-label="Primary" className="hidden items-center gap-4xl lg:flex xl:gap-[72px]">
            {NAV_LEFT.map((l) => (
              <NavItem key={l.to} to={l.to} tone={onDark ? 'Dark' : 'Light'}>{l.label}</NavItem>
            ))}
          </nav>
          <IconButton label="Open menu" onClick={() => setMenuOpen(true)} onDark={onDark} className="-ml-sm lg:hidden">
            <Menu size={24} />
          </IconButton>
        </div>

        <Link to="/" aria-label="Doré, home" className={cn('flex items-center justify-center transition-colors duration-300', onDark ? 'text-linen' : 'text-ink')}>
          <Wordmark className="h-10 w-auto" />
        </Link>

        <div className="flex items-center justify-end gap-4xl xl:gap-[72px]">
          <nav aria-label="Secondary" className="hidden items-center gap-4xl lg:flex xl:gap-[72px]">
            {NAV_RIGHT.map((l) => (
              <NavItem key={l.to} to={l.to} tone={onDark ? 'Dark' : 'Light'}>{l.label}</NavItem>
            ))}
          </nav>
          <NavItem to="/about#contact" tone={onDark ? 'Dark' : 'Light'} className="hidden md:inline-flex lg:hidden">Contact</NavItem>
          <IconButton label="Search" onClick={() => setSearchOpen(true)} onDark={onDark} className="-mr-sm">
            <Search size={24} />
          </IconButton>
        </div>
      </div>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SidePanelOverlay open={searchOpen} onClose={() => setSearchOpen(false)} type="Search" />
    </header>
  )
}
