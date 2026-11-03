import { Link } from 'react-router'
import { cn } from '../lib/cn.ts'
import { Media } from './Media.tsx'

type ArticleCardProps = {
  category: string
  readTime: string
  title: string
  image?: string
  imageAlt: string
  to: string
  /** Force Hover for documentation. Real hover works without it. */
  state?: 'Default' | 'Hover'
}

/**
 * Figma "Device": Desktop is 440 wide, Mobile 345. The card fills its column, so both come
 * from the grid. Hover turns the bottom line cerulean.
 */
export function ArticleCard({ category, readTime, title, image, imageAlt, to, state = 'Default' }: ArticleCardProps) {
  return (
    <article
      data-state={state === 'Hover' ? 'Hover' : undefined}
      className={cn('group relative flex w-full flex-col gap-sm border-b border-ink/25 pb-md transition-colors', 'hover:border-cerulean')}
    >
      <div className="aspect-[11/7] w-full overflow-hidden rounded-media">
        <Media src={image} alt={imageAlt} tone="sun" className="transition-transform duration-500 group-hover:scale-[1.02]" />
      </div>
      <p className="eyebrow flex items-center gap-xs text-ink-muted">
        <span>{category}</span>
        <span aria-hidden="true" className="h-[11px] w-px bg-ink/30" />
        <span>{readTime}</span>
      </p>
      <h3 className="font-display text-28 leading-[1.15] text-ink">
        <Link to={to} className="after:absolute after:inset-0">{title}</Link>
      </h3>
    </article>
  )
}
