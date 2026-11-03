import windowToTheSea from '../assets/journal/window-to-the-sea.webp'
import cliffsideVillage from '../assets/journal/cliffside-village.webp'
import bellTowerRooftops from '../assets/journal/bell-tower-rooftops.webp'
import arcadeOliveHills from '../assets/photos/arcade-olive-hills.webp'
import courtyardOldTown from '../assets/photos/courtyard-old-town.webp'
import northCove from '../assets/photos/north-cove.webp'
import oldTown from '../assets/photos/old-town.webp'
import poolHouse from '../assets/photos/pool-house.webp'
import selling from '../assets/photos/selling.webp'
import terraceSeaView from '../assets/photos/terrace-sea-view.webp'

export type Category = 'Buying' | 'Selling' | 'Living'

export type Article = {
  category: Category
  readTime: string
  title: string
  /** One sentence, shown only where an article is featured. */
  excerpt: string
  image: string
  /** Tailwind object-position class, to frame the photo in its slot. */
  position?: string
  alt: string
  to: string
}

export const CATEGORIES: Category[] = ['Buying', 'Selling', 'Living']

/** The first article is the featured one on the Journal page. */
export const ARTICLES: Article[] = [
  { category: 'Buying', readTime: '8 min read', title: 'Buying near the water, step by step', excerpt: 'Salt, light and paperwork: what to check before you fall for a house within sight of the sea.', image: windowToTheSea, position: 'object-[50%_38%]', alt: 'Boats at anchor on blue water, seen through an opening in an old stone wall', to: '/guides/buying-near-the-water' },
  { category: 'Buying', readTime: '7 min read', title: 'What a survey will not tell you about an old house', excerpt: 'A survey lists what is wrong today. These are the questions that tell you what will go wrong in ten years.', image: courtyardOldTown, alt: 'Whitewashed courtyard with a flowering tree and a stone fountain', to: '/guides/old-house-survey' },
  { category: 'Buying', readTime: '5 min read', title: 'Reading a floor plan like a local', excerpt: 'Where the sun enters, where the damp collects and why the kitchen is always at the back.', image: poolHouse, alt: 'Clay-rendered house with a green-tiled pool in front', to: '/guides/floor-plans' },
  { category: 'Buying', readTime: '6 min read', title: 'Off market, explained', excerpt: 'Why some of the best houses never reach a portal, and how to hear about them first.', image: arcadeOliveHills, alt: 'Stone arcade opening onto a lavender and olive garden', to: '/guides/off-market' },
  { category: 'Selling', readTime: '6 min read', title: 'How to price a home that faces west', excerpt: 'A west-facing house sells on its evenings. Price it, photograph it and show it that way.', image: cliffsideVillage, position: 'object-[50%_42%]', alt: 'Whitewashed houses with shutters on a cliff above a deep blue sea', to: '/guides/pricing-west' },
  { category: 'Selling', readTime: '5 min read', title: 'Photographs that sell the light, not the sofa', excerpt: 'Buyers fall for a feeling before a floor plan. How we shoot it, and when.', image: terraceSeaView, position: 'object-[10%_85%]', alt: 'Whitewashed house with a pergola and a stone terrace facing the sea', to: '/guides/photographs' },
  { category: 'Selling', readTime: '4 min read', title: 'What to fix before a viewing, and what to leave', excerpt: 'A short list of small repairs that pay for themselves, and the big ones to leave alone.', image: selling, position: 'object-[50%_64%]', alt: 'Villa tower with a terracotta roof above flowering bougainvillea', to: '/guides/before-a-viewing' },
  { category: 'Living', readTime: '4 min read', title: 'A morning on the harbour road', excerpt: 'Fishing boats, the first coffee and the bakery that opens when it is ready.', image: bellTowerRooftops, position: 'object-[50%_55%]', alt: 'Terracotta rooftops and a small bell tower in front of the sea', to: '/journal/harbour-road' },
  { category: 'Living', readTime: '5 min read', title: 'Where to eat in the old town on a Tuesday', excerpt: 'Most of the old town rests on Tuesdays. These places do not.', image: oldTown, alt: 'Whitewashed houses with shutters and a palm tree stepping down to the sea', to: '/journal/old-town-tuesday' },
  { category: 'Living', readTime: '6 min read', title: 'Winter on the coast: what stays open', excerpt: 'The coast is quieter and the light is better. A guide to the months most visitors never see.', image: northCove, alt: 'Quiet cove with sailboats below a wooded hill and a terracotta terrace', to: '/journal/winter-on-the-coast' },
]

/** The last part of the article path, used in /guides/:slug and /journal/:slug. */
export const articleSlug = (a: Article) => a.to.split('/').pop() ?? ''
export const findArticle = (slug: string | undefined) => ARTICLES.find((a) => articleSlug(a) === slug)
