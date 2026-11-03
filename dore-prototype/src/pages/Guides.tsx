import { Fragment } from 'react'
import { Link } from 'react-router'
import { ArticleCard } from '../components/ArticleCard.tsx'
import { Button } from '../components/Button.tsx'
import { Logomark } from '../components/Logo.tsx'
import { Media } from '../components/Media.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { SectionLabel } from '../components/SectionLabel.tsx'
import { cn } from '../lib/cn.ts'
import terraceTables from '../assets/journal/terrace-tables.webp'
import { ARTICLES, CATEGORIES } from '../data/articles.ts'

const [featured, ...rest] = ARTICLES

/** A pause between categories: a photo on one side, a quote on a Hillside panel on the other. */
function Quote() {
  return (
    <section className="mt-[96px] grid md:mt-[120px] md:grid-cols-2">
      <div className="relative h-[360px] md:h-auto md:min-h-[560px]">
        <div className="absolute inset-0">
          <Media src={terraceTables} alt="Sunlit terrace tables with wicker chairs and green cushions, a small vase of wild flowers on each" className="object-[50%_42%]" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-xl bg-hillside px-gutter py-[72px] text-center text-linen md:py-[96px]">
        <Logomark aria-hidden="true" className="size-[44px] text-limone md:size-[56px]" />
        <blockquote className="max-w-[520px] font-display text-40">
          “The best houses are the ones where you want to stay for one more coffee.”
        </blockquote>
        <p className="eyebrow text-vino-bianco">Marta Sorrel, Head of sales</p>
      </div>
    </section>
  )
}

/**
 * Journal. A colored title band, one featured story, then a section per category with its stories.
 * The featured story is left out of its own category so nothing appears twice.
 */
export default function Guides() {
  return (
    <>
      <div className="-mt-nav bg-citrine px-gutter pt-[calc(var(--spacing-nav)+var(--spacing-4xl))] pb-4xl md:pt-[calc(var(--spacing-nav)+var(--spacing-5xl))] md:pb-5xl">
        <header className="mx-auto flex max-w-page flex-col gap-md">
          <h1 className="text-56 md:text-72">Journal</h1>
          <p className="text-16">Guides for buying and selling, and notes on living here.</p>
        </header>
      </div>

      <section className="px-gutter pt-[96px] md:pt-[120px]">
        <Reveal className="mx-auto grid max-w-page items-center gap-xl lg:grid-cols-[1.35fr_1fr] lg:gap-5xl">
          <Link to={featured.to} className="group block overflow-hidden">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Media src={featured.image} alt={featured.alt} className={cn('transition-transform duration-700 ease-out group-hover:scale-[1.02]', featured.position)} />
            </div>
          </Link>
          <div className="flex flex-col items-start gap-lg">
            <SectionLabel tone="Muted">{featured.category} · {featured.readTime}</SectionLabel>
            <h2 className="text-40 md:text-56">{featured.title}</h2>
            <p className="max-w-split text-16">{featured.excerpt}</p>
            <Button to={featured.to} arrow="right">Read the guide</Button>
          </div>
        </Reveal>
      </section>

      {CATEGORIES.map((category) => {
        const items = rest.filter((a) => a.category === category)
        return (
          <Fragment key={category}>
            <section id={category.toLowerCase()} className="px-gutter pt-[96px] last:pb-[96px] md:pt-[120px] md:last:pb-[120px]">
              <div className="mx-auto max-w-page">
                <h2 className="mb-4xl text-40 md:text-56">{category}</h2>
                <div className="grid gap-3xl md:grid-cols-3">
                  {items.map((a) => (
                    <ArticleCard key={a.to} category={a.category} readTime={a.readTime} title={a.title} image={a.image} position={a.position} imageAlt={a.alt} to={a.to} />
                  ))}
                </div>
              </div>
            </section>
            {category === 'Selling' && <Quote />}
          </Fragment>
        )
      })}
    </>
  )
}
