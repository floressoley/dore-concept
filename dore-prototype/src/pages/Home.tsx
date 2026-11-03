import type { ReactNode } from 'react'
import { AreaShowcase } from '../components/AreaShowcase.tsx'
import type { Area } from '../components/AreaShowcase.tsx'
import { ArticleCard } from '../components/ArticleCard.tsx'
import { Carousel, CarouselItem } from '../components/Carousel.tsx'
import { LISTINGS } from '../data/homes.ts'
import { Logomark } from '../components/Logo.tsx'
import { HomesCollection } from '../components/HomesCollection.tsx'
import type { CollectionHome } from '../components/HomesCollection.tsx'
import { HomeSearch } from '../components/HomeSearch.tsx'
import { Marquee } from '../components/Marquee.tsx'
import { SectionLabel } from '../components/SectionLabel.tsx'
import { TeamCard } from '../components/TeamCard.tsx'
import { useNavTheme } from '../components/NavTheme.tsx'
import { VideoBackdrop } from '../components/VideoBackdrop.tsx'
import { TextLink } from '../components/TextLink.tsx'
import { cn } from '../lib/cn.ts'
import harbourDistrict from '../assets/photos/harbour-district.webp'
import managingPartner from '../assets/team/managing-partner.webp'
import headOfSales from '../assets/team/head-of-sales.webp'
import buyersAgent from '../assets/team/buyers-agent.webp'
import privateClientsAdvisor from '../assets/team/private-clients-advisor.webp'
import windowToTheSea from '../assets/journal/window-to-the-sea.webp'
import cliffsideVillage from '../assets/journal/cliffside-village.webp'
import bellTowerRooftops from '../assets/journal/bell-tower-rooftops.webp'
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

const HOMES: CollectionHome[] = LISTINGS.slice(0, 4)

const TEAM = [
  { name: 'Pau Vellis', role: 'Managing partner', image: managingPartner },
  { name: 'Marta Sorrel', role: 'Head of sales', image: headOfSales },
  { name: 'Joan Arrenti', role: 'Buyer’s agent', image: buyersAgent },
  { name: 'Elia Marin', role: 'Private clients advisor', image: privateClientsAdvisor },
]

const GUIDES = [
  { category: 'Buying', readTime: '8 min read', title: 'Buying near the water, step by step', image: windowToTheSea, position: 'object-[50%_38%]', alt: 'Boats at anchor on blue water, seen through an opening in an old stone wall', to: '/guides/buying-near-the-water' },
  { category: 'Selling', readTime: '6 min read', title: 'How to price a home that faces west', image: cliffsideVillage, position: 'object-[50%_42%]', alt: 'Whitewashed houses with shutters on a cliff above a deep blue sea', to: '/guides/pricing-west' },
  { category: 'Living', readTime: '4 min read', title: 'A morning on the harbour road', image: bellTowerRooftops, position: 'object-[50%_55%]', alt: 'Terracotta rooftops and a small bell tower in front of the sea', to: '/journal/harbour-road' },
]

function Hero() {
  useNavTheme('Photo')

  return (
    <section className="relative isolate flex min-h-[640px] items-center justify-center bg-ink px-gutter pt-[calc(var(--spacing-nav)+var(--spacing-5xl))] pb-5xl text-linen md:min-h-[720px] lg:h-svh lg:max-h-[900px]">
      <VideoBackdrop src="/video/drone-view-property.mp4" />

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
    <Section className="bg-citrine">
      <div className="mx-auto flex max-w-wide flex-col items-center gap-xl text-center">
        <Logomark aria-hidden="true" className="size-[44px] animate-spin-slow text-ink motion-reduce:animate-none md:size-[56px]" />
        <blockquote className="font-display text-40">
          “Doré is the colour of late light on stone. We look for homes that wear it at five o’clock, not only at noon.”
        </blockquote>
        <TextLink to="/about" arrowRight>Our story</TextLink>
      </div>
    </Section>
  )
}

function Team() {
  return (
    <section className="py-section">
      <div className="mx-auto mb-4xl flex max-w-page flex-col gap-lg px-gutter md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-lg">
          <SectionLabel tone="Orange">Meet the team</SectionLabel>
          <h2 className="max-w-[620px] text-40 md:text-56">The people behind every home</h2>
        </div>
        <TextLink to="/about#team" arrowRight>The whole team</TextLink>
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
  )
}

function Journal() {
  return (
    <Section className="bg-pear-tree">
      <div className="mb-4xl flex flex-col gap-lg md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-lg">
          <SectionLabel tone="Primary">Guides and journal</SectionLabel>
          <h2 className="max-w-[620px] text-40 md:text-56">Read before you decide</h2>
        </div>
        <TextLink to="/guides" arrowRight>All guides</TextLink>
      </div>
      <div className="grid gap-3xl md:grid-cols-3">
        {GUIDES.map((g) => (
          <ArticleCard key={g.to} category={g.category} readTime={g.readTime} title={g.title} image={g.image} position={g.position} imageAlt={g.alt} to={g.to} />
        ))}
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
    </>
  )
}
