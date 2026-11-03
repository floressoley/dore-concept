import { useParams } from 'react-router'
import { Breadcrumbs } from '../components/Breadcrumbs.tsx'
import { Button } from '../components/Button.tsx'
import { HomeCard } from '../components/HomesCollection.tsx'
import { Area, Bath, Bed } from '../components/Icons.tsx'
import { Media } from '../components/Media.tsx'
import { cn } from '../lib/cn.ts'
import { LISTINGS, findListing } from '../data/homes.ts'
import type { HomeType } from '../data/homes.ts'
import { TEAM } from '../data/team.ts'
import NotFound from './NotFound.tsx'
import { usePageMeta } from '../lib/usePageMeta.ts'

const TYPE_LABEL: Record<HomeType, string> = { apartment: 'Apartment', townhouse: 'Townhouse', villa: 'Villa', farmhouse: 'Farmhouse' }

/** Placeholder description, one opening line per type, until each home has its own text. */
const OPENING: Record<HomeType, string> = {
  apartment: 'A bright apartment where the light moves across the rooms through the day.',
  townhouse: 'A townhouse on a quiet street, with thick walls that keep the heat out in summer.',
  villa: 'A villa built around its view, with terraces that are used for most of the year.',
  farmhouse: 'A farmhouse with a long history, a garden that has been tended for decades and room to spread out.',
}

/** One home: photograph, the essentials and a way to book a viewing, then similar homes. */
export default function Listing() {
  const { slug } = useParams()
  const home = findListing(slug)
  usePageMeta(home?.title ?? 'Page not found', home ? `${home.title} in ${home.location}. ${home.size} m², ${home.beds} bedrooms, ${home.baths} bathrooms, ${home.price}.` : 'That home could not be found.')
  if (!home) return <NotFound />

  const similar = LISTINGS.filter((h) => h.slug !== home.slug && (h.area === home.area || h.type === home.type)).slice(0, 3)
  const agent = TEAM[0]
  const facts: [string, string][] = [
    ['Type', TYPE_LABEL[home.type]],
    ['Area', home.location],
    ['Size', `${home.size} m²`],
    ['Bedrooms', String(home.beds)],
    ['Bathrooms', String(home.baths)],
  ]

  return (
    <>
      <section className="px-gutter pt-4xl pb-[96px] md:pt-5xl md:pb-[120px]">
        <div className="mx-auto flex max-w-page flex-col gap-xl">
          <div className="flex justify-center lg:justify-start">
            <Breadcrumbs items={[{ label: 'Homes', to: '/buy' }]} current={home.title} />
          </div>

          <div className="grid items-start gap-xl lg:grid-cols-[1.7fr_1fr] lg:gap-4xl">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-media">
              <Media src={home.image} alt={home.alt} className={cn('object-center', home.position)} />
            </div>

            <div className="flex flex-col gap-lg lg:sticky lg:top-[calc(var(--spacing-nav)+var(--spacing-md))]">
              <div className="flex flex-col gap-xs">
                <p className="eyebrow text-ink-muted">{home.location}</p>
                <h1 className="text-40">{home.title}</h1>
                <p className="font-display text-28">{home.price}</p>
              </div>
              <ul className="flex items-center gap-lg text-14 text-ink-muted">
                <li className="flex items-center gap-xs"><Area size={18} /><span className="sr-only">Size: </span>{home.size} m²</li>
                <li className="flex items-center gap-xs"><Bed size={18} /><span className="sr-only">Bedrooms: </span>{home.beds}</li>
                <li className="flex items-center gap-xs"><Bath size={18} /><span className="sr-only">Bathrooms: </span>{home.baths}</li>
              </ul>
              <div className="flex flex-col gap-sm">
                <Button to="/contact" arrow="right" className="w-full">Book a viewing</Button>
                <Button href="mailto:hello@dore.example" variant="Secondary" className="w-full">Ask a question</Button>
              </div>
              <p className="text-14 text-ink-muted">Your agent: {agent.name}, {agent.role.toLowerCase()}.</p>
            </div>
          </div>

          <div className="mt-xl grid gap-3xl lg:grid-cols-[1.7fr_1fr] lg:gap-4xl">
            <div className="flex max-w-[680px] flex-col gap-lg text-16">
              <h2 className="text-28">About this home</h2>
              <p>{OPENING[home.type]}</p>
              <p>
                It has {home.beds} bedrooms and {home.baths} bathrooms over {home.size} square metres, in {home.location.toLowerCase()}. Come at two different times of day, and ask us anything you would like to know about the street and the neighbours.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-lg gap-y-md text-14 content-start">
              {facts.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-2xs">
                  <dt className="text-12 text-ink-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-vino-bianco px-gutter py-[96px] md:py-[120px]">
          <div className="mx-auto max-w-page">
            <h2 className="mb-4xl text-40 md:text-56">Similar homes</h2>
            <div className="grid gap-x-xl gap-y-4xl sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((h) => (
                <HomeCard key={h.slug} home={h} ratio="aspect-[4/3]" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
