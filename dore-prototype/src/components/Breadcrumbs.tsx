import { Link } from 'react-router'

export type Crumb = { label: string; to: string }

/** Figma "Items" = 5 | 4 | 3 | 2 is the number of crumbs, including the current page. */
export function Breadcrumbs({ items, current }: { items: Crumb[]; current: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="eyebrow flex flex-wrap items-center justify-center gap-xs">
        {items.map((item) => (
          <li key={item.to} className="flex items-center gap-xs">
            <Link to={item.to} className="text-ink-muted transition-colors hover:text-ink">{item.label}</Link>
            <span aria-hidden="true" className="text-ink-muted">/</span>
          </li>
        ))}
        <li aria-current="page" className="text-ink">{current}</li>
      </ol>
    </nav>
  )
}
