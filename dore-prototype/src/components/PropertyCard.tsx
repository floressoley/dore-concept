import { Link } from 'react-router'
import { cn } from '../lib/cn.ts'
import { Media } from './Media.tsx'
import { TextLink } from './TextLink.tsx'

type PropertyCardProps = {
  /** Figma "Type" */
  variant?: 'Simple' | 'Default'
  tone?: 'Light' | 'Dark'
  location: string
  title: string
  price: string
  image?: string
  imageAlt: string
  to?: string
}

/**
 * Figma "Device" (Desktop / Mobile) follows the card's own width: under 500px it goes
 * full bleed with 24px text padding and the smaller title.
 */
export function PropertyCard({ variant = 'Default', tone = 'Light', location, title, price, image, imageAlt, to = '/buy' }: PropertyCardProps) {
  const dark = tone === 'Dark'
  const text = dark ? 'text-linen' : 'text-ink'
  return (
    <article className={cn('@container relative w-full', text)}>
      <div className="aspect-[13/9] w-full overflow-hidden rounded-media">
        <Media src={image} alt={imageAlt} tone="sea" />
      </div>

      {variant === 'Simple' ? (
        <div className="mt-md flex items-baseline justify-between gap-md px-lg @min-[500px]:px-0">
          <h3 className="eyebrow font-sans">
            <Link to={to} className="after:absolute after:inset-0">{location}</Link>
          </h3>
          <p className="eyebrow">{price}</p>
        </div>
      ) : (
        <div className="mt-[18px] flex flex-col gap-xs px-lg @min-[500px]:px-0">
          <p className="eyebrow">{location}</p>
          <h3 className="font-display text-28 leading-[1.1] @min-[500px]:text-40">
            <Link to={to} className="after:absolute after:inset-0">{title}</Link>
          </h3>
          <div className="mt-xs flex items-center justify-between gap-md">
            <p className="label-m">{price}</p>
            <TextLink size="Medium" arrowRight inverse={dark} to={to}>View home</TextLink>
          </div>
        </div>
      )}
    </article>
  )
}
