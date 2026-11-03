import { cn } from '../lib/cn.ts'
import { ArrowUpRight } from './Icons.tsx'

type ArticleMetaProps = {
  category: string
  readTime: string
  updated: string
  onShare?: () => void
  className?: string
}

const Divider = ({ className }: { className?: string }) => (
  <span aria-hidden="true" className={cn('h-[11px] w-px bg-ink/30', className)} />
)

/** Layout=Desktop | Tablet | Mobile. Wide containers show one row, narrow ones two. */
export function ArticleMeta({ category, readTime, updated, onShare, className }: ArticleMetaProps) {
  const share = () => {
    if (onShare) return onShare()
    if (navigator.share) void navigator.share({ title: document.title, url: location.href }).catch(() => {})
  }
  return (
    <div className={cn('@container', className)}>
      <div className="eyebrow flex flex-col items-center gap-xs @min-[480px]:flex-row @min-[480px]:justify-center">
        <div className="flex items-center gap-xs">
          <span className="text-terracotta-text">{category}</span>
          <Divider />
          <span className="text-ink-muted">{readTime}</span>
        </div>
        <Divider className="hidden @min-[480px]:block" />
        <div className="flex items-center gap-xs">
          <span className="text-ink-muted">{updated}</span>
          <Divider />
          <button type="button" onClick={share} className="inline-flex items-center gap-2xs text-ink transition-colors hover:text-cerulean">
            Share <ArrowUpRight size={10} />
          </button>
        </div>
      </div>
    </div>
  )
}
