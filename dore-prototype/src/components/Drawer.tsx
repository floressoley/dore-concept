import { cn } from '../lib/cn.ts'
import { Close } from './Icons.tsx'
import { Wordmark } from './Logo.tsx'
import { NavItem } from './NavItem.tsx'
import { Overlay } from './Overlay.tsx'

export const NAV_LINKS = [
  { label: 'Homes', to: '/buy' },
  { label: 'Services', to: '/services' },
  { label: 'Agents', to: '/about#team' },
  { label: 'Journal', to: '/guides' },
  { label: 'Sell', to: '/sell' },
  { label: 'Contact', to: '/contact' },
]

type DrawerPanelProps = {
  /** Figma "Layout": Mobile 393 wide, Portrait 768 wide. */
  layout?: 'Mobile' | 'Portrait'
  onClose?: () => void
  className?: string
}

/** Drawer content on its own, for the preview page. Use <Drawer> in the app. */
export function DrawerPanel({ layout = 'Mobile', onClose, className }: DrawerPanelProps) {
  return (
    <div className={cn('flex h-full flex-col justify-between bg-ink px-lg pt-lg pb-2xl text-linen', layout === 'Portrait' && 'md:px-3xl', className)}>
      <div className="flex flex-col gap-3xl">
        <div className="flex items-center justify-between">
          <Wordmark className="h-10 w-auto text-linen" />
          <button type="button" aria-label="Close menu" onClick={onClose} className="flex size-11 items-center justify-center text-linen transition-colors hover:text-limone">
            <Close size={20} />
          </button>
        </div>
        <nav aria-label="Menu" className="flex flex-col items-start gap-md">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} to={link.to} tone="Dark" size="Large" onClick={onClose}>
              {link.label}
            </NavItem>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-lg">
        <div className="flex flex-col gap-xs">
          <p className="eyebrow text-azzuro">Contact</p>
          <a href="mailto:hello@dore.example" className="eyebrow text-linen hover:text-limone">hello@dore.example</a>
          <a href="tel:+000000000000" className="eyebrow text-linen hover:text-limone">+00 000 000 000</a>
        </div>
        <ul className="eyebrow flex gap-md text-azzuro">
          <li><a href="#" className="hover:text-linen">Privacy</a></li>
          <li><a href="#" className="hover:text-linen">Terms</a></li>
          <li><a href="#" className="hover:text-linen">Cookies</a></li>
        </ul>
        <p className="eyebrow text-azzuro">Concept project. Fictional agency, not a real business.</p>
      </div>
    </div>
  )
}

export function Drawer({ open, onClose, layout }: { open: boolean; onClose: () => void; layout?: 'Mobile' | 'Portrait' }) {
  return (
    <Overlay open={open} onClose={onClose} label="Menu" side="left">
      <DrawerPanel layout={layout} onClose={onClose} />
    </Overlay>
  )
}
