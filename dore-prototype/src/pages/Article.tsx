import { useParams } from 'react-router'
import { ArticleCard } from '../components/ArticleCard.tsx'
import { ArticleMeta } from '../components/ArticleMeta.tsx'
import { Breadcrumbs } from '../components/Breadcrumbs.tsx'
import { Button } from '../components/Button.tsx'
import { Logomark } from '../components/Logo.tsx'
import { Media } from '../components/Media.tsx'
import { cn } from '../lib/cn.ts'
import { ARTICLES, articleSlug, findArticle } from '../data/articles.ts'
import NotFound from './NotFound.tsx'
import { usePageMeta } from '../lib/usePageMeta.ts'

/** Placeholder body shared by every guide until each one has its own text. */
const BODY: string[] = [
  'The coast changes by the hour, and so does a house. The first visit tells you whether you like it. The second, at a different time of day, tells you whether you will still like it in a year.',
  'Before anything else, ask who has owned it and for how long. A house that has stayed in one family tends to have been looked after, and the neighbours will tell you the rest if you ask them politely.',
]

const BODY_AFTER: string[] = [
  'Take your time with the paperwork. A good notary will explain every page, and a good agent will tell you which questions to ask before you sign, not after.',
  'When you are ready, we will walk through it with you, one step at a time.',
]

/**
 * One guide or journal story. A centred header, the photograph, a readable column of text with a
 * pull quote, then more from the same category.
 */
export default function Article() {
  const { slug } = useParams()
  const article = findArticle(slug)
  usePageMeta(article?.title ?? 'Page not found', article?.excerpt || 'A guide from the Doré journal.')
  if (!article) return <NotFound />

  const more = ARTICLES.filter((a) => a.category === article.category && articleSlug(a) !== slug).slice(0, 3)
  const crumbs = [{ label: 'Journal', to: '/guides' }]

  return (
    <>
      <article className="px-gutter pt-4xl pb-[96px] md:pt-5xl md:pb-[120px]">
        <header className="mx-auto flex max-w-[860px] flex-col items-center gap-md text-center">
          <Breadcrumbs items={crumbs} current={article.title} />
          <ArticleMeta className="w-full" category={article.category} readTime={article.readTime} updated="Updated October 2026" />
          <h1 className="mt-sm text-40 md:text-56">{article.title}</h1>
          <p className="max-w-split text-16 text-ink-muted">{article.excerpt}</p>
        </header>

        <div className="mx-auto mt-4xl aspect-[16/10] max-w-page overflow-hidden md:aspect-[2/1]">
          <Media src={article.image} alt={article.alt} className={cn('object-center', article.position)} />
        </div>

        <div className="mx-auto mt-4xl flex max-w-[680px] flex-col gap-lg text-16">
          {BODY.map((t) => <p key={t}>{t}</p>)}
          <blockquote className="my-lg flex flex-col items-start gap-md border-l border-terracotta pl-lg font-display text-28">
            <Logomark aria-hidden="true" className="size-[28px] text-terracotta" />
            “A house is easy to admire and hard to know. Give it two visits.”
          </blockquote>
          {BODY_AFTER.map((t) => <p key={t}>{t}</p>)}
          <div className="mt-lg">
            <Button to="/contact" variant="Secondary" arrow="right">Ask us a question</Button>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-pear-tree px-gutter py-[96px] md:py-[120px]">
          <div className="mx-auto max-w-page">
            <h2 className="mb-4xl text-40 md:text-56">More in {article.category.toLowerCase()}</h2>
            <div className="grid gap-3xl md:grid-cols-3">
              {more.map((a) => (
                <ArticleCard key={a.to} category={a.category} readTime={a.readTime} title={a.title} image={a.image} position={a.position} imageAlt={a.alt} to={a.to} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
