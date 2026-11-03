import { cn } from '../lib/cn.ts'

type MediaProps = {
  src?: string
  alt: string
  className?: string
  tone?: 'sea' | 'sun' | 'olive' | 'clay'
}

const TONES = {
  sea: 'bg-gradient-to-br from-azzuro to-vino-bianco',
  sun: 'bg-gradient-to-br from-citrine to-vino-bianco',
  olive: 'bg-gradient-to-br from-pear-tree to-limone',
  clay: 'bg-gradient-to-br from-clay to-vino-bianco',
}

/** Image slot. Without a src it renders a tinted placeholder that still carries the alt text. */
export function Media({ src, alt, className, tone = 'sea' }: MediaProps) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={cn('block h-full w-full object-cover', className)} />
  }
  return <div role="img" aria-label={alt} className={cn('h-full w-full', TONES[tone], className)} />
}
