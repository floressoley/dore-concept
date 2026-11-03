import type { ReactNode } from 'react'
import { usePageMeta } from '../lib/usePageMeta.ts'

type LegalPageProps = {
  title: string
  updated: string
  intro: string
  sections: { heading: string; body: ReactNode }[]
}

function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <>
      <div className="-mt-nav bg-azzuro px-gutter pt-[calc(var(--spacing-nav)+var(--spacing-4xl))] pb-4xl md:pt-[calc(var(--spacing-nav)+var(--spacing-5xl))] md:pb-5xl">
        <header className="mx-auto flex max-w-page flex-col gap-md">
          <h1 className="text-56 md:text-72">{title}</h1>
          <p className="text-16">{updated}</p>
        </header>
      </div>
      <article className="px-gutter py-[96px] md:py-[120px]">
        <div className="mx-auto flex max-w-[720px] flex-col gap-3xl">
          <p className="text-16">{intro}</p>
          {sections.map((s) => (
            <section key={s.heading} className="flex flex-col gap-md">
              <h2 className="text-28">{s.heading}</h2>
              <div className="flex flex-col gap-md text-16 text-ink-muted">{s.body}</div>
            </section>
          ))}
        </div>
      </article>
    </>
  )
}

export function Privacy() {
  usePageMeta('Privacy', 'What this concept site does, and does not do, with your information.')
  return (
    <LegalPage
      title="Privacy"
      updated="Last updated 3 November 2026"
      intro="Doré is a concept project and a fictional agency. This page explains, in plain words, what the site does and does not do with your information."
      sections={[
        { heading: 'What we collect', body: <p>Nothing. The forms on this site, including the valuation, contact and join-the-list forms, do not send or store anything. What you type stays in your browser and is gone when you leave the page.</p> },
        { heading: 'Cookies and tracking', body: <p>The site sets no cookies and runs no analytics or advertising tools. Your filters on the Homes page are kept in the web address only, so you can share or bookmark them.</p> },
        { heading: 'Third parties', body: <p>Fonts, photographs and video are served with the site. Nothing is loaded from advertising or tracking networks.</p> },
        { heading: 'Questions', body: <p>Write to hello@dore.example. As this is a concept project, that address is not monitored.</p> },
      ]}
    />
  )
}

export function Terms() {
  usePageMeta('Terms', 'Short terms for a concept project: a fictional agency, not a real business.')
  return (
    <LegalPage
      title="Terms"
      updated="Last updated 3 November 2026"
      intro="Please read these short terms before you use the site. They are written for a concept project, not for a real business."
      sections={[
        { heading: 'About this site', body: <p>Doré is a fictional agency, built as a design and front-end concept. It does not sell, rent or value any property, and nothing on it is an offer.</p> },
        { heading: 'Homes and prices', body: <p>Every home, address, price, specification and person shown is made up. Any resemblance to a real listing or a real person is a coincidence.</p> },
        { heading: 'Photographs and credits', body: <p>Photographs, video and illustrations are credited in the project’s credits file. Please do not reuse them from this site without checking their original licences.</p> },
        { heading: 'Liability', body: <p>The site is provided as it is. Because nothing here is a real service, nothing here creates a contract or a duty of care.</p> },
        { heading: 'Changes', body: <p>We may change or remove any page at any time.</p> },
      ]}
    />
  )
}
