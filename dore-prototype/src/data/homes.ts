import type { CollectionHome } from '../components/HomesCollection.tsx'
import harbourDistrict from '../assets/photos/harbour-district.webp'
import northCove from '../assets/photos/north-cove.webp'
import oldTown from '../assets/photos/old-town.webp'
import arcadeOliveHills from '../assets/photos/arcade-olive-hills.webp'
import courtyardOldTown from '../assets/photos/courtyard-old-town.webp'
import poolHouse from '../assets/photos/pool-house.webp'
import terraceSeaView from '../assets/photos/terrace-sea-view.webp'
import cliffsideVillage from '../assets/journal/cliffside-village.webp'

export type Area = { slug: string; label: string }
export type HomeType = 'apartment' | 'townhouse' | 'villa' | 'farmhouse'

/** A home with the extra fields the Homes page filters and sorts on. */
export type Listing = CollectionHome & {
  slug: string
  area: string
  type: HomeType
  /** Asking price in euros, for budget filters and sorting. */
  priceEur: number
}

export const AREAS: Area[] = [
  { slug: 'harbour-district', label: 'Harbour district' },
  { slug: 'old-town', label: 'Old town' },
  { slug: 'olive-hills', label: 'Olive hills' },
  { slug: 'north-cove', label: 'North cove' },
]

/** Listed in the order they are recommended. The first four are the Selected homes on the Homepage. */
export const LISTINGS: Listing[] = [
  { title: 'House above the sea', slug: 'house-above-the-sea', area: 'harbour-district', location: 'Harbour district', type: 'villa', price: '€4.95M', priceEur: 4_950_000, size: 420, beds: 5, baths: 4, to: '/buy/house-above-the-sea', image: terraceSeaView, position: 'object-[10%_85%]', alt: 'Whitewashed house with a pergola, olive trees in terracotta jars and a stone terrace facing the sea' },
  { title: 'Courtyard house', slug: 'courtyard-house', area: 'old-town', location: 'Old town', type: 'townhouse', price: '€2.1M', priceEur: 2_100_000, size: 310, beds: 4, baths: 3, to: '/buy/courtyard-house', image: courtyardOldTown, alt: 'Whitewashed courtyard with a flowering tree, a stone fountain and arched wooden doors' },
  { title: 'Villa with a pool', slug: 'villa-with-a-pool', area: 'olive-hills', location: 'Olive hills', type: 'villa', price: '€6.8M', priceEur: 6_800_000, size: 540, beds: 6, baths: 5, to: '/buy/villa-with-a-pool', image: poolHouse, alt: 'Clay-rendered house with a bedroom behind glass doors and a pool of green tiles in front' },
  { title: 'Arcaded farmhouse', slug: 'arcaded-farmhouse', area: 'north-cove', location: 'North cove', type: 'farmhouse', price: '€1.65M', priceEur: 1_650_000, size: 240, beds: 4, baths: 3, to: '/buy/arcaded-farmhouse', image: arcadeOliveHills, alt: 'Stone arcade with a terracotta floor opening onto a lavender and olive garden' },
  { title: 'Villa on the point', slug: 'villa-on-the-point', area: 'harbour-district', location: 'Harbour district', type: 'villa', price: '€3.2M', priceEur: 3_200_000, size: 360, beds: 5, baths: 4, to: '/buy/villa-on-the-point', image: harbourDistrict, alt: 'Orange villa on a rocky point above blue water, with yachts anchored nearby' },
  { title: 'Terrace by the cove', slug: 'terrace-by-the-cove', area: 'north-cove', location: 'North cove', type: 'apartment', price: '€780K', priceEur: 780_000, size: 96, beds: 2, baths: 1, to: '/buy/terrace-by-the-cove', image: northCove, alt: 'Quiet cove with sailboats below a wooded hill and a terracotta terrace' },
  { title: 'Old town townhouse', slug: 'old-town-townhouse', area: 'old-town', location: 'Old town', type: 'townhouse', price: '€1.2M', priceEur: 1_200_000, size: 190, beds: 3, baths: 2, to: '/buy/old-town-townhouse', image: oldTown, alt: 'Whitewashed houses with shutters and a palm tree stepping down to the sea' },
  { title: 'Cliffside apartment', slug: 'cliffside-apartment', area: 'olive-hills', location: 'Olive hills', type: 'apartment', price: '€1.05M', priceEur: 1_050_000, size: 140, beds: 3, baths: 2, to: '/buy/cliffside-apartment', image: cliffsideVillage, position: 'object-[50%_45%]', alt: 'Whitewashed houses with shutters on a cliff above a deep blue sea' },
]

export const findListing = (slug: string | undefined) => LISTINGS.find((h) => h.slug === slug)
