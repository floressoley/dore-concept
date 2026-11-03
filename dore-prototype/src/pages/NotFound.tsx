import { Button } from '../components/Button.tsx'
import { usePageMeta } from '../lib/usePageMeta.ts'

/** Shown for any address that does not exist, and for a guide or home that cannot be found. */
export default function NotFound() {
  usePageMeta('Page not found', 'That page has moved, or never existed.')
  return (
    <section className="px-gutter py-[120px] md:py-[160px]">
      <div className="mx-auto flex max-w-wide flex-col items-center gap-lg text-center">
        <p className="eyebrow text-terracotta-text">Page not found</p>
        <h1 className="text-40 md:text-56">That page has moved, or never existed</h1>
        <p className="max-w-split text-16 text-ink-muted">Try the homes, or tell us what you were looking for.</p>
        <div className="mt-md flex flex-wrap justify-center gap-sm">
          <Button to="/buy" arrow="right">See the homes</Button>
          <Button to="/contact" variant="Secondary">Contact us</Button>
        </div>
      </div>
    </section>
  )
}
