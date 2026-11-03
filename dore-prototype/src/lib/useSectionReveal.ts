import { useLayoutEffect } from 'react'

const MAX_STAGGER = 3

/**
 * Fades and lifts the content of every section on the page into place as it scrolls into view.
 * It animates the direct children of each section's content wrapper, one after another, so a heading
 * lands before the blocks under it. Anything that already animates itself (marked `.js-reveal`, or
 * containing something that is) is left alone. Does nothing for reduced motion.
 *
 * Call from the page frame with the current path, so it runs again on each page change.
 */
export function useSectionReveal(key: string) {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const main = document.getElementById('main')
    if (!main) return

    const targets: HTMLElement[] = []
    const timers: number[] = []
    const regions = main.querySelectorAll<HTMLElement>(':scope > section, :scope > div, :scope > article')
    regions.forEach((region) => {
      const content = Array.from(region.children).filter(
        (c): c is HTMLElement => c instanceof HTMLElement && !c.className.includes('absolute') && !c.hasAttribute('aria-hidden'),
      )
      if (content.length === 0) return
      // One wrapper with several children is a content column: animate its children. Otherwise animate
      // what is there, so an article's header, photo and text each arrive in turn.
      const wrapper = content[0]
      const items = content.length === 1 && wrapper.children.length > 1 ? Array.from(wrapper.children) : content
      items.forEach((el, i) => {
        if (!(el instanceof HTMLElement)) return
        if (el.classList.contains('js-reveal') || el.querySelector('.js-reveal') || el.hasAttribute('aria-hidden')) return
        el.classList.add('reveal-item')
        el.style.setProperty('--reveal-delay', `${Math.min(i, MAX_STAGGER) * 90}ms`)
        targets.push(el)
      })
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          el.classList.add('reveal-in')
          observer.unobserve(el)
          // Once it has landed, hand the element's own transitions back to it.
          timers.push(
            window.setTimeout(() => {
              el.classList.remove('reveal-item', 'reveal-in')
              el.style.removeProperty('--reveal-delay')
            }, 1300),
          )
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    )
    targets.forEach((t) => observer.observe(t))

    return () => {
      observer.disconnect()
      timers.forEach(window.clearTimeout)
      targets.forEach((t) => {
        t.classList.remove('reveal-item', 'reveal-in')
        t.style.removeProperty('--reveal-delay')
      })
    }
  }, [key])
}
