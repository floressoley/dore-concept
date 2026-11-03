import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { AreaShowcase } from '../components/AreaShowcase.tsx'
import type { Area } from '../components/AreaShowcase.tsx'
import { ArticleCard } from '../components/ArticleCard.tsx'
import { Button } from '../components/Button.tsx'
import { HomesCollection } from '../components/HomesCollection.tsx'
import type { CollectionHome } from '../components/HomesCollection.tsx'
import { HomeSearch } from '../components/HomeSearch.tsx'
import { Marquee } from '../components/Marquee.tsx'
import { SectionLabel } from '../components/SectionLabel.tsx'
import { TeamCard } from '../components/TeamCard.tsx'
import { useNavTheme } from '../components/NavTheme.tsx'
import { TextLink } from '../components/TextLink.tsx'
import { cn } from '../lib/cn.ts'
import harbourDistrict from '../assets/photos/harbour-district.webp'
import northCove from '../assets/photos/north-cove.webp'
import oldTown from '../assets/photos/old-town.webp'
import findAHome from '../assets/illustrations/find-a-home.svg'
import readFirst from '../assets/illustrations/read-first.svg'
import sellingWithCare from '../assets/illustrations/selling-with-care.svg'

const Section = ({ className, children }: { className?: string; children: ReactNode }) => (
  <section className={cn('px-gutter py-section', className)}>
    <div className="mx-auto max-w-content">{children}</div>
  </section>
)

const PILLARS = [
  { image: findAHome, alt: 'Illustration of an arched wooden door framed by climbing plants in pots', title: 'Finding a home', to: '/buy', link: 'How buying works' },
  { image: sellingWithCare, alt: 'Illustration of an arched window with open shutters above a flower box', title: 'Selling with care', to: '/sell', link: 'How selling works' },
  { image: readFirst, alt: 'Illustration of two hands clinking glasses of red wine', title: 'Reading first', to: '/guides', link: 'Read the guides' },
]

const AREAS: Area[] = [
  { name: 'Harbour district', to: '/buy?area=harbour-district', image: harbourDistrict, alt: 'Orange villa on a rocky point above blue water, with yachts anchored nearby' },
  { name: 'North cove', to: '/buy?area=north-cove', image: northCove, alt: 'Quiet cove with sailboats below a wooded hill and a terracotta terrace' },
  { name: 'Old town', to: '/buy?area=old-town', image: oldTown, alt: 'Whitewashed houses with shutters and a palm tree stepping down to the sea' },
]

const HOMES: CollectionHome[] = [
  { title: 'Terrace house above the harbour', location: 'Harbour district', price: '€4.95M', to: '/buy', alt: 'Whitewashed terrace house above a small harbour', tone: 'sea' },
  { title: 'Courtyard house with blue shutters', location: 'Old town', price: '€2.1M', to: '/buy', alt: 'Courtyard with an arched door and blue shutters', tone: 'clay' },
  { title: 'Villa with a long pool', location: 'Olive hills', price: '€6.8M', to: '/buy', alt: 'Villa with a long pool facing the sea', tone: 'olive' },
  { title: 'Stone cottage by the cove', location: 'North cove', price: '€1.65M', to: '/buy', alt: 'Stone cottage beside a quiet cove', tone: 'sun' },
]

const TEAM = [
  { name: 'Marta Vellis', role: 'Founding partner' },
  { name: 'Joan Arrenti', role: 'Head of sales' },
  { name: 'Elia Sorrel', role: 'Buyer advisor' },
]

const GUIDES = [
  { category: 'Buying', readTime: '8 min read', title: 'Buying near the water, step by step', alt: 'Stone steps leading down to a quiet cove', to: '/guides/buying-near-the-water' },
  { category: 'Selling', readTime: '6 min read', title: 'How to price a home that faces west', alt: 'Terrace table set for dinner at sunset', to: '/guides/pricing-west' },
  { category: 'Living', readTime: '4 min read', title: 'A morning on the harbour road', alt: 'Fishing boats along a harbour wall', to: '/journal/harbour-road' },
]

function Hero() {
  useNavTheme('Photo')
  const video = useRef<HTMLVideoElement>(null)

  // Visitors who ask their device for reduced motion get the first frame, not a moving background.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.pause()
  }, [])

  return (
    <section className="relative isolate flex min-h-[640px] items-center justify-center bg-ink px-gutter pt-[calc(var(--spacing-nav)+var(--spacing-5xl))] pb-5xl text-linen md:min-h-[720px] lg:h-svh lg:max-h-[900px]">
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <video
          ref={video}
          className="h-full w-full object-cover"
          src="/video/drone-view-property.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/60" />

      <div className="flex w-full flex-col items-center gap-lg text-center">
        <SectionLabel tone="Inverse">Doré, Mediterranean homes</SectionLabel>
        <h1 className="max-w-[760px] text-40 text-limone md:text-56 lg:text-72">Find the house that keeps the light</h1>
        <HomeSearch className="mt-lg" />
      </div>
    </section>
  )
}

function Pillars() {
  return (
    <Section className="bg-vino-bianco">
      <div className="grid gap-4xl md:grid-cols-3">
        {PILLARS.map(({ image, alt, title, to, link }) => (
          <div key={title} className="flex flex-col items-center gap-lg text-center">
            <img src={image} alt={alt} loading="lazy" className="h-[220px] w-full object-contain" />
            <h2 className="font-display text-16 whitespace-nowrap text-terracotta-text lg:text-28">{title}</h2>
            <TextLink to={to} arrowRight>{link}</TextLink>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Quote() {
  return (
    <Section className="bg-pear-tree">
      <div className="mx-auto flex max-w-quote flex-col items-center gap-xl text-center">
        <SectionLabel tone="Primary">About Doré</SectionLabel>
        <blockquote className="font-display text-28">
          “Doré is the colour of late light on stone. We look for homes that wear it at five o’clock, not only at noon.”
        </blockquote>
        <TextLink to="/about" arrowRight>Our story</TextLink>
      </div>
    </Section>
  )
}

function Team() {
  return (
    <Section>
      <div className="mb-4xl flex flex-col gap-lg md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-lg">
          <SectionLabel tone="Orange">Meet the team</SectionLabel>
          <h2 className="max-w-[620px] text-40 md:text-56">Three people who answer the phone</h2>
        </div>
        <TextLink to="/about#team" arrowRight>The whole team</TextLink>
      </div>
      <div className="grid justify-items-center gap-3xl sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((p) => (
          <TeamCard key={p.name} name={p.name} role={p.role} imageAlt={`Portrait placeholder of ${p.name}`} />
        ))}
      </div>
    </Section>
  )
}

function Journal() {
  return (
    <Section className="bg-vino-bianco">
      <div className="mb-4xl flex flex-col gap-lg md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-lg">
          <SectionLabel tone="Orange">Guides and journal</SectionLabel>
          <h2 className="max-w-[620px] text-40 md:text-56">Read before you decide</h2>
        </div>
        <TextLink to="/guides" arrowRight>All guides</TextLink>
      </div>
      <div className="grid gap-3xl md:grid-cols-3">
        {GUIDES.map((g) => (
          <ArticleCard key={g.to} category={g.category} readTime={g.readTime} title={g.title} imageAlt={g.alt} to={g.to} />
        ))}
      </div>
    </Section>
  )
}

function JoinList() {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }
  return (
    <Section className="bg-terracotta text-ink">
      <div className="mx-auto flex max-w-intro flex-col items-center gap-3xl text-center">
        <div className="flex flex-col items-center gap-lg">
          <SectionLabel tone="Primary">Off market</SectionLabel>
          <h2 className="text-40 md:text-56">Join the list</h2>
          <p className="max-w-split text-16">A few homes each season, shown to a few people first. No noise in between.</p>
        </div>
        {sent ? (
          <p role="status" className="text-14">
            Thank you. This is a concept site, so nothing was sent and nothing was stored.
          </p>
        ) : (
          <form onSubmit={submit} className="flex w-full max-w-[560px] flex-col gap-sm sm:flex-row">
            <label htmlFor="join-email" className="sr-only">Email address</label>
            <input
              id="join-email"
              type="email"
              required
              placeholder="Enter your email"
              className="min-h-11 flex-1 rounded-control border border-ink bg-linen px-md text-14 text-ink placeholder:text-ink-muted"
            />
            <Button type="submit">Request access</Button>
          </form>
        )}
      </div>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={['Mediterranean homes', 'Chosen slowly']} />
      <Pillars />
      <AreaShowcase
        eyebrow="Areas"
        areas={AREAS}
        linkLabel="Explore all homes"
        linkTo="/buy"
      />
      <HomesCollection
        heading="Selected homes"
        introLabel="Featured homes"
        introText="A few of the houses we have walked through this season, shown in no particular order."
        homes={HOMES}
        linkLabel="View all homes"
        linkTo="/buy"
      />
      <Quote />
      <Team />
      <Journal />
      <JoinList />
    </>
  )
}
