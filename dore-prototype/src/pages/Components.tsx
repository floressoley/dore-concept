import type { ReactNode } from 'react'
import { ArticleCard } from '../components/ArticleCard.tsx'
import { ArticleMeta } from '../components/ArticleMeta.tsx'
import { Breadcrumbs } from '../components/Breadcrumbs.tsx'
import { Button } from '../components/Button.tsx'
import type { ButtonState, ButtonVariant } from '../components/Button.tsx'
import { Checkbox } from '../components/Checkbox.tsx'
import { DrawerPanel } from '../components/Drawer.tsx'
import { Dropdown, DropdownItem } from '../components/Dropdown.tsx'
import { Footer } from '../components/Footer.tsx'
import { MetricOffer } from '../components/MetricOffer.tsx'
import { Navigation } from '../components/Navigation.tsx'
import { NavItem } from '../components/NavItem.tsx'
import { PropertyCard } from '../components/PropertyCard.tsx'
import { SearchField } from '../components/SearchField.tsx'
import { SectionControl } from '../components/SectionControl.tsx'
import { SectionLabel } from '../components/SectionLabel.tsx'
import type { LabelSize, LabelTone } from '../components/SectionLabel.tsx'
import { SectionTabs, TabItem } from '../components/SectionTabs.tsx'
import { SidePanel } from '../components/SidePanel.tsx'
import { TeamCard } from '../components/TeamCard.tsx'
import { TextLink } from '../components/TextLink.tsx'
import { cn } from '../lib/cn.ts'

function Spec({ name, props, children }: { name: string; props: string; children: ReactNode }) {
  return (
    <section id={name.toLowerCase().replace(/[^a-z]+/g, '-')} className="border-t border-ink/15 px-gutter py-5xl">
      <div className="mx-auto max-w-content">
        <h2 className="text-40">{name}</h2>
        <p className="eyebrow mt-xs mb-3xl text-ink-muted">{props}</p>
        <div className="flex flex-col gap-3xl">{children}</div>
      </div>
    </section>
  )
}

function Cell({ label, children, bg = 'bg-transparent', className }: { label: string; children: ReactNode; bg?: string; className?: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-sm">
      <p className="eyebrow text-ink-muted">{label}</p>
      <div className={cn('p-lg', bg, className)}>{children}</div>
    </div>
  )
}

const Row = ({ children, cols = 'sm:grid-cols-2 lg:grid-cols-3' }: { children: ReactNode; cols?: string }) => (
  <div className={cn('grid gap-lg', cols)}>{children}</div>
)

const BUTTON_VARIANTS: ButtonVariant[] = ['Primary', 'Secondary']
const BUTTON_STATES: ButtonState[] = ['Default', 'Hover', 'Pressed', 'Disabled']
const LABEL_SIZES: LabelSize[] = ['Small', 'Medium', 'Large']
const LABEL_TONES: { tone: LabelTone; bg: string }[] = [
  { tone: 'Primary', bg: 'bg-linen' },
  { tone: 'Orange', bg: 'bg-linen' },
  { tone: 'Muted', bg: 'bg-linen' },
  { tone: 'Stone', bg: 'bg-ink' },
  { tone: 'Chalk', bg: 'bg-cerulean' },
  { tone: 'Inverse', bg: 'bg-ink' },
]

const GUIDE_INDEX = [
  { n: '01', label: 'Before you start', href: '#' },
  { n: '02', label: 'Choosing the stretch of coast', href: '#' },
  { n: '03', label: 'Light, wind and noise', href: '#' },
  { n: '04', label: 'Reading the paperwork', href: '#' },
  { n: '05', label: 'Making an offer', href: '#' },
  { n: '06', label: 'After the keys', href: '#' },
]

const CRUMBS = [
  { label: 'Home', to: '/' },
  { label: 'Guides', to: '/guides' },
  { label: 'Buying', to: '/guides' },
  { label: 'Coastline', to: '/guides' },
]

const TABS = [
  { label: 'Home type', panel: { type: 'Checkboxes' as const, options: [{ label: 'Apartment', checked: true }, { label: 'Townhouse' }, { label: 'Villa' }] } },
  {
    label: 'Topic',
    panel: {
      type: 'Columns' as const,
      columns: [
        [{ label: 'Buying', href: '#' }, { label: 'Selling', href: '#' }, { label: 'Paperwork', href: '#' }, { label: 'Money', href: '#' }],
        [{ label: 'Neighbourhoods', href: '#' }, { label: 'Renovation', href: '#' }, { label: 'Living here', href: '#' }, { label: 'Seasons', href: '#' }],
      ],
    },
  },
  { label: 'Region', panel: { type: 'Checkboxes' as const, options: [{ label: 'North coast' }, { label: 'Old harbour' }, { label: 'Hills' }] } },
  { label: 'Read time', panel: { type: 'Checkboxes' as const, options: [{ label: 'Under 5 minutes' }, { label: '5 to 10 minutes' }] } },
]

const DROPDOWN = [
  { label: 'Buying', links: [{ label: 'First viewing', href: '#' }, { label: 'Making an offer', href: '#' }, { label: 'Paperwork', href: '#' }] },
  { label: 'Selling', links: [{ label: 'Valuation', href: '#' }, { label: 'Preparing the home', href: '#' }] },
  { label: 'Living here', links: [{ label: 'Neighbourhoods', href: '#' }, { label: 'Seasons', href: '#' }, { label: 'Daily life', href: '#' }] },
]

export default function Components() {
  return (
    <>
      <Navigation />
      <div className="h-nav" />
      <main>
        <header className="px-gutter py-5xl">
          <div className="mx-auto max-w-content">
            <p className="eyebrow text-ink-muted">Step 3 · Components</p>
            <h1 className="mt-xs text-40 md:text-56">Component preview</h1>
            <p className="mt-md max-w-split text-16 text-ink-muted">
              All 18 components, each with the Figma variant names. Hover and press them for real, or use the forced states shown.
              Resize the window to 1440, 1040, 768 and 393 to see Navigation and Footer change.
            </p>
          </div>
        </header>

        <Spec name="Button" props="Type: Primary · Secondary     State: Default · Hover · Pressed · Disabled     Arrow: on / off">
          {BUTTON_VARIANTS.map((variant) => (
            <Row key={variant} cols="sm:grid-cols-2 lg:grid-cols-4">
              {BUTTON_STATES.map((state) => (
                <Cell key={state} label={`${variant} / ${state}`}>
                  <Button variant={variant} state={state}>Book a viewing</Button>
                </Cell>
              ))}
            </Row>
          ))}
          <Row>
            <Cell label="Primary with arrow"><Button arrow>Explore homes</Button></Cell>
            <Cell label="Secondary with arrow"><Button variant="Secondary" arrow>Talk to us</Button></Cell>
          </Row>
        </Spec>

        <Spec name="Text Link" props="Size: Small · Medium     State: Default · Hover     Arrow Left / Arrow Right: on / off">
          <Row cols="sm:grid-cols-2 lg:grid-cols-4">
            <Cell label="Small / Default"><TextLink>Read the guide</TextLink></Cell>
            <Cell label="Small / Hover"><TextLink state="Hover">Read the guide</TextLink></Cell>
            <Cell label="Medium / Default"><TextLink size="Medium" arrowRight>View home</TextLink></Cell>
            <Cell label="Medium / Hover"><TextLink size="Medium" state="Hover" arrowLeft>Back to guides</TextLink></Cell>
            <Cell label="On dark" bg="bg-ink"><TextLink inverse arrowRight>Our story</TextLink></Cell>
          </Row>
        </Spec>

        <Spec name="Section Label" props="Size: Small · Medium · Large     Tone: Primary · Orange · Muted · Stone · Chalk · Inverse">
          <Row cols="sm:grid-cols-2 lg:grid-cols-3">
            {LABEL_TONES.map(({ tone, bg }) => (
              <Cell key={tone} label={tone} bg={bg} className="flex flex-col gap-sm">
                {LABEL_SIZES.map((size) => (
                  <SectionLabel key={size} size={size} tone={tone}>{`01 · ${size} label`}</SectionLabel>
                ))}
              </Cell>
            ))}
          </Row>
        </Spec>

        <Spec name="Property Card" props="Type: Simple · Default     Tone: Light · Dark     Device: Desktop · Mobile (follows card width)">
          <Row cols="lg:grid-cols-2">
            <Cell label="Simple / Light / Desktop (680)"><PropertyCard variant="Simple" location="Harbour district" title="" price="From €1.2m" imageAlt="Whitewashed terrace overlooking a calm bay" /></Cell>
            <Cell label="Default / Light / Desktop (520)"><PropertyCard location="Harbour district" title="A terrace facing the evening sun" price="€1.85m" imageAlt="Stone house with a terrace and olive trees" /></Cell>
            <Cell label="Default / Dark / Desktop" bg="bg-ink"><PropertyCard tone="Dark" location="Hillside" title="Four bedrooms above the bay" price="€2.4m" imageAlt="Villa on a hillside above the sea" /></Cell>
            <Cell label="Simple / Dark / Desktop" bg="bg-ink"><PropertyCard variant="Simple" tone="Dark" location="Old town" title="" price="From €890k" imageAlt="Narrow street with blue shutters" /></Cell>
            <Cell label="Default / Light / Mobile (393)" className="max-w-[393px] !p-0"><PropertyCard location="Old town" title="Blue shutters, quiet street" price="€1.1m" imageAlt="Row of houses with blue shutters" /></Cell>
            <Cell label="Simple / Light / Mobile (393)" className="max-w-[393px] !p-0"><PropertyCard variant="Simple" location="Harbour district" title="" price="From €1.2m" imageAlt="Harbour with small boats at dawn" /></Cell>
          </Row>
        </Spec>

        <Spec name="Navigation" props="Layout: Desktop 1440 · Tablet 1040 · Portrait 768 · Mobile 393     Nav link states: Default · Hover · Active · Pressed">
          <p className="max-w-split text-14 text-ink-muted">
            The live navigation is at the top of this page: 80px tall, 40px logo, no background until you hover it or scroll. Below 1040 the links collapse into the menu button, which opens the drawer. The search icon opens the search panel.
          </p>
          <Row cols="sm:grid-cols-2 lg:grid-cols-4">
            <Cell label="Nav link / Default"><NavItem to="/buy">Buy</NavItem></Cell>
            <Cell label="Nav link / Hover"><NavItem to="/buy" state="Hover">Buy</NavItem></Cell>
            <Cell label="Nav link / Active"><NavItem to="/buy" state="Active">Buy</NavItem></Cell>
            <Cell label="Nav link / Pressed"><NavItem to="/buy" state="Pressed">Buy</NavItem></Cell>
            <Cell label="Drawer link / Default" bg="bg-ink"><NavItem to="/buy" tone="Dark" size="Large">Buy</NavItem></Cell>
            <Cell label="Drawer link / Hover" bg="bg-ink"><NavItem to="/buy" tone="Dark" size="Large" state="Hover">Buy</NavItem></Cell>
            <Cell label="Drawer link / Active" bg="bg-ink"><NavItem to="/buy" tone="Dark" size="Large" state="Active">Buy</NavItem></Cell>
            <Cell label="Drawer link / Pressed" bg="bg-ink"><NavItem to="/buy" tone="Dark" size="Large" state="Pressed">Buy</NavItem></Cell>
          </Row>
        </Spec>

        <Spec name="Footer" props="Layout: Desktop · Tablet · Mobile (4 / 2 / 1 columns)">
          <p className="max-w-split text-14 text-ink-muted">The live footer closes this page.</p>
        </Spec>

        <Spec name="Article Meta" props="Layout: Desktop · Tablet · Mobile (one row wide, two rows narrow)">
          <Row cols="lg:grid-cols-2">
            <Cell label="Desktop / Tablet (wide)"><ArticleMeta category="Buying" readTime="8 min read" updated="Updated 12 Oct 2026" /></Cell>
            <Cell label="Mobile (393)" className="max-w-[393px]"><ArticleMeta category="Buying" readTime="8 min read" updated="Updated 12 Oct 2026" /></Cell>
          </Row>
        </Spec>

        <Spec name="Breadcrumbs" props="Items: 5 · 4 · 3 · 2">
          <Row cols="lg:grid-cols-2">
            <Cell label="Items 5"><Breadcrumbs items={CRUMBS} current="Light, wind and noise" /></Cell>
            <Cell label="Items 4"><Breadcrumbs items={CRUMBS.slice(0, 3)} current="Coastline" /></Cell>
            <Cell label="Items 3"><Breadcrumbs items={CRUMBS.slice(0, 2)} current="Buying" /></Cell>
            <Cell label="Items 2"><Breadcrumbs items={CRUMBS.slice(0, 1)} current="Guides" /></Cell>
          </Row>
        </Spec>

        <Spec name="Checkbox" props="State: Unchecked · Checked">
          <Row cols="sm:grid-cols-2 lg:grid-cols-4">
            <Cell label="Unchecked"><Checkbox label="Seafront" /></Cell>
            <Cell label="Checked"><Checkbox label="Seafront" defaultChecked /></Cell>
            <Cell label="Unchecked / on dark" bg="bg-ink"><Checkbox label="Seafront" inverse /></Cell>
            <Cell label="Checked / on dark" bg="bg-ink"><Checkbox label="Seafront" inverse defaultChecked /></Cell>
          </Row>
        </Spec>

        <Spec name="Section Tabs" props="Panel: Closed · Checkboxes · Columns     Tab Item: Default · Hover · Open">
          <Row cols="sm:grid-cols-3">
            <Cell label="Tab Item / Default"><TabItem label="Topic" /></Cell>
            <Cell label="Tab Item / Hover"><TabItem label="Topic" state="Hover" /></Cell>
            <Cell label="Tab Item / Open"><TabItem label="Topic" state="Open" /></Cell>
          </Row>
          <Cell label="Panel / Closed"><SectionTabs tabs={TABS} /></Cell>
          <Cell label="Panel / Checkboxes"><SectionTabs tabs={TABS} defaultOpen={0} /></Cell>
          <Cell label="Panel / Columns"><SectionTabs tabs={TABS} defaultOpen={1} /></Cell>
        </Spec>

        <Spec name="Dropdown" props="Dropdown State: Closed · Open     Dropdown Item Type: Parent · Link     Item State: Default · Hover · Open">
          <Row cols="sm:grid-cols-2 lg:grid-cols-5">
            <Cell label="Parent / Default"><DropdownItem label="Buying" /></Cell>
            <Cell label="Parent / Hover"><DropdownItem label="Buying" state="Hover" /></Cell>
            <Cell label="Parent / Open"><DropdownItem label="Buying" state="Open" /></Cell>
            <Cell label="Link / Default"><DropdownItem label="Journal" type="Link" /></Cell>
            <Cell label="Link / Hover"><DropdownItem label="Journal" type="Link" state="Hover" /></Cell>
          </Row>
          <Row cols="sm:grid-cols-2">
            <Cell label="Dropdown / Closed"><Dropdown items={DROPDOWN} /></Cell>
            <Cell label="Dropdown / Open"><Dropdown items={DROPDOWN} defaultOpen={2} /></Cell>
          </Row>
        </Spec>

        <Spec name="Section Control" props="Size: Wide 680 · Compact 352 (follows container)     State: Default · Hover · Pressed · Open">
          <Row cols="lg:grid-cols-2">
            {(['Default', 'Hover', 'Pressed'] as const).map((state) => (
              <Cell key={state} label={`Wide / ${state}`} className="max-w-[680px]">
                <SectionControl index="03" title="Light, wind and noise" items={GUIDE_INDEX} current="03" state={state} />
              </Cell>
            ))}
            <Cell label="Wide / Open" className="max-w-[680px]"><SectionControl index="03" title="Light, wind and noise" items={GUIDE_INDEX} current="03" state="Open" /></Cell>
            <Cell label="Compact / Default" className="max-w-[352px]"><SectionControl index="03" title="Light, wind and noise" items={GUIDE_INDEX} current="03" /></Cell>
            <Cell label="Compact / Open" className="max-w-[352px]"><SectionControl index="03" title="Light, wind and noise" items={GUIDE_INDEX} current="03" state="Open" /></Cell>
          </Row>
        </Spec>

        <Spec name="Search Field" props="Size: Medium · Large     State: Default · Active (focus or value)">
          <Row cols="lg:grid-cols-2">
            <Cell label="Medium / Default"><SearchField size="Medium" /></Cell>
            <Cell label="Medium / Active (type to see it)"><SearchField size="Medium" defaultValue="sea view" /></Cell>
            <Cell label="Large / Default"><SearchField size="Large" /></Cell>
            <Cell label="Large / Active"><SearchField size="Large" defaultValue="old town" /></Cell>
          </Row>
        </Spec>

        <Spec name="Drawer" props="Layout: Mobile 393 · Portrait 768">
          <Row cols="lg:grid-cols-[393px_1fr]">
            <Cell label="Mobile" className="h-[852px] !p-0"><DrawerPanel layout="Mobile" /></Cell>
            <Cell label="Portrait" className="h-[920px] !p-0"><DrawerPanel layout="Portrait" /></Cell>
          </Row>
        </Spec>

        <Spec name="Side Panel" props="Type: Search · Article · Filters (393 wide)">
          <Row cols="lg:grid-cols-3">
            {(['Search', 'Article', 'Filters'] as const).map((type) => (
              <Cell key={type} label={type} className="h-[852px] max-w-[393px] !p-0"><SidePanel type={type} /></Cell>
            ))}
          </Row>
        </Spec>

        <Spec name="Article Card" props="Device: Desktop 440 · Mobile 345     State: Default · Hover">
          <Row cols="lg:grid-cols-3">
            <Cell label="Desktop / Default" className="max-w-[440px]"><ArticleCard category="Buying" readTime="8 min read" title="Buying near the water, step by step" imageAlt="Stone steps leading down to a quiet cove" to="/guides/buying-near-the-water" /></Cell>
            <Cell label="Desktop / Hover" className="max-w-[440px]"><ArticleCard state="Hover" category="Selling" readTime="6 min read" title="How to price a home that faces west" imageAlt="Terrace table set for dinner at sunset" to="/guides/pricing-west" /></Cell>
            <Cell label="Mobile / Default" className="max-w-[345px]"><ArticleCard category="Living" readTime="4 min read" title="A morning on the harbour road" imageAlt="Fishing boats along a harbour wall" to="/journal/harbour-road" /></Cell>
          </Row>
        </Spec>

        <Spec name="Team Card" props="State: Default · Hover (hover, focus or touch shows Email and Call)">
          <Row cols="sm:grid-cols-2">
            <Cell label="Default"><TeamCard name="Marta Vellis" role="Founding partner" imageAlt="Portrait placeholder of a team member" /></Cell>
            <Cell label="Hover"><TeamCard state="Hover" name="Joan Arrenti" role="Head of sales" imageAlt="Portrait placeholder of a team member" /></Cell>
          </Row>
        </Spec>

        <Spec name="Metric / Offer" props="Tone: Paper · Sand · Olive · Orange · Cobalt">
          <Row cols="sm:grid-cols-2 lg:grid-cols-3">
            <MetricOffer tone="Paper" value="14" label="Years on the coast" description="A small team that has walked most of these streets more than once." />
            <MetricOffer tone="Sand" value="1 in 3" label="Homes we decline" description="We would rather say no early than sell you the wrong house." />
            <MetricOffer tone="Olive" value="48h" label="First answer" description="Every enquiry gets a person, not an autoresponder." />
            <MetricOffer tone="Orange" value="0" label="Pressure" description="No countdown clocks, no invented rival buyers." />
            <MetricOffer tone="Cobalt" value="6" label="Neighbourhoods" description="We cover fewer places so we can know them properly." />
          </Row>
        </Spec>
      </main>
      <Footer />
    </>
  )
}
