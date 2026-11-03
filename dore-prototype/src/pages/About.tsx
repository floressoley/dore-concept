import { Button } from '../components/Button.tsx'
import { Carousel, CarouselItem } from '../components/Carousel.tsx'
import { Media } from '../components/Media.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { SectionLabel } from '../components/SectionLabel.tsx'
import { TeamCard } from '../components/TeamCard.tsx'
import { TEAM } from '../data/team.ts'
import aboutArchway from '../assets/photos/about-archway.webp'
import { usePageMeta } from '../lib/usePageMeta.ts'

const PRINCIPLES = [
  { title: 'Chosen slowly', text: 'We take on a small number of homes each season, so each one gets the time it needs.' },
  { title: 'Priced honestly', text: 'Prices follow what has sold nearby. We say so early, even when it is not what you hoped.' },
  { title: 'One person throughout', text: 'The agent who shows you the house is the agent who hands over the keys.' },
]

/**
 * About. A colored title band, the story beside a photo, three principles, then the whole team.
 * The team block has id="team", which the Agents links point to. It is a swipeable carousel, the same
 * as on the Homepage, and shows all four across from the large breakpoint up.
 */
export default function About() {
  usePageMeta('About', 'A small agency for houses on the Mediterranean coast, and the people who look after them.')
  return (
    <>
      <div className="-mt-nav bg-limone px-gutter pt-[calc(var(--spacing-nav)+var(--spacing-4xl))] pb-4xl md:pt-[calc(var(--spacing-nav)+var(--spacing-5xl))] md:pb-5xl">
        <header className="mx-auto flex max-w-page flex-col gap-md">
          <h1 className="text-56 md:text-72">About Doré</h1>
          <p className="text-16">A small agency for houses on the Mediterranean coast, and the people who look after them.</p>
        </header>
      </div>

      <section className="px-gutter py-[96px] md:py-[120px]">
        <Reveal className="mx-auto grid max-w-page items-center gap-xl lg:grid-cols-[1fr_1.1fr] lg:gap-5xl">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-media">
            <Media src={aboutArchway} alt="A stone archway and an open woven iron gate leading into a sunlit village lane" className="object-[50%_55%]" />
          </div>
          <div className="flex flex-col items-start gap-lg">
            <SectionLabel tone="Muted">Our story</SectionLabel>
            <h2 className="text-40 md:text-56">Doré is the colour of late light on stone</h2>
            <p className="max-w-split text-16">
              We started Doré because the houses we loved were being sold the way every other house is sold: quickly, loudly and in bulk. We wanted to do it the slow way, with one person on each home and time to walk it at different hours of the day.
            </p>
            <p className="max-w-split text-16">
              Today we are four people between the harbour and the olive hills. We know the streets, the notaries and the neighbours, and we would rather tell you a house is not right than sell you one that is.
            </p>
            <Button to="/contact" variant="Secondary" arrow="right">Talk to us</Button>
          </div>
        </Reveal>
      </section>

      <section className="bg-vino-bianco px-gutter py-[96px] md:py-[120px]">
        <div className="mx-auto max-w-page">
          <h2 className="max-w-[720px] text-40 md:text-56">How we work</h2>
          <ul className="mt-4xl grid gap-x-xl gap-y-3xl md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title}>
                <Reveal className="h-full">
                  <div className="flex h-full flex-col gap-md border-b border-terracotta pb-lg text-terracotta-text">
                    <span className="font-display text-40">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display text-28 leading-[1.15]">{p.title}</h3>
                    <p className="text-14">{p.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="team" className="py-[96px] md:py-[120px]">
        <div className="mx-auto mb-4xl flex max-w-page flex-col gap-lg px-gutter">
          <SectionLabel tone="Orange">Meet the team</SectionLabel>
          <h2 className="max-w-[620px] text-40 md:text-56">The people behind every home</h2>
        </div>
        <div className="mx-auto max-w-page">
          <Carousel label="Our team">
            {TEAM.map((p) => (
              <CarouselItem key={p.name} className="w-[72vw] max-w-[300px] sm:w-[300px] lg:w-[calc((min(100vw,1440px)-2*var(--gutter)-3*var(--spacing-lg))/4)] lg:max-w-none">
                <TeamCard name={p.name} role={p.role} image={p.image} imageAlt={`Portrait of ${p.name}, ${p.role}`} />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </section>
    </>
  )
}
