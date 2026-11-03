import { useEffect } from 'react'

const SITE = 'Doré'

/** Sets the tab title and the meta description for the current page. Call once per page. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title === SITE ? `${SITE}, Mediterranean homes` : `${title} · ${SITE}`
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description
  }, [title, description])
}
