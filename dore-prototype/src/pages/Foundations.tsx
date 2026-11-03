import { Logomark, Wordmark } from '../components/Logo.tsx'

const COLORS = [
  { name: "Linen", token: "linen", hex: "#EFE8E0", role: "Base surface, text on dark" },
  { name: "Vino Bianco", token: "vino-bianco", hex: "#FFE4C4", role: "Soft tint" },
  { name: "Limone", token: "limone", hex: "#FFF19D", role: "Highlight surface" },
  { name: "Azzuro", token: "azzuro", hex: "#B1D2DD", role: "Soft sea tint" },
  { name: "Citrine", token: "citrine", hex: "#E6B862", role: "Feature sections, ink text" },
  { name: "Pear Tree", token: "pear-tree", hex: "#C7B97A", role: "Quiet feature surface, ink text" },
  { name: "Clay", token: "clay", hex: "#CF8D60", role: "Warm mid surface, ink text" },
  { name: "Terracotta", token: "terracotta", hex: "#D35B2F", role: "Accent, buttons, bold section" },
  { name: "Terracotta text", token: "terracotta-text", hex: "#A84318", role: "Accent text on light" },
  { name: "Cerulean", token: "cerulean", hex: "#3364A9", role: "Dark section, linen text" },
  { name: "Hillside", token: "hillside", hex: "#456940", role: "Dark section, linen text" },
  { name: "Ink", token: "ink", hex: "#1A1512", role: "Primary text, darkest sections" },
  { name: "Ink muted", token: "ink-muted", hex: "#534E4A", role: "Muted text" },
]

const SWATCH: Record<string, string> = {
  linen: "bg-linen",
  "vino-bianco": "bg-vino-bianco",
  limone: "bg-limone",
  azzuro: "bg-azzuro",
  citrine: "bg-citrine",
  "pear-tree": "bg-pear-tree",
  clay: "bg-clay",
  terracotta: "bg-terracotta",
  "terracotta-text": "bg-terracotta-text",
  cerulean: "bg-cerulean",
  hillside: "bg-hillside",
  ink: "bg-ink",
  "ink-muted": "bg-ink-muted",
}

// Ratios use the WCAG 2.1 formula. AA = 4.5 small text, 3 large text.
const PAIRS = [
  { bg: "bg-linen", fg: "text-ink", label: "Ink on Linen", ratio: 17.4 },
  { bg: "bg-linen", fg: "text-ink-muted", label: "Ink muted on Linen", ratio: 7.89 },
  { bg: "bg-linen", fg: "text-terracotta-text", label: "Terracotta text on Linen", ratio: 5.8 },
  { bg: "bg-linen", fg: "text-cerulean", label: "Cerulean on Linen", ratio: 5.71 },
  { bg: "bg-vino-bianco", fg: "text-ink", label: "Ink on Vino Bianco", ratio: 14.78 },
  { bg: "bg-vino-bianco", fg: "text-ink-muted", label: "Ink muted on Vino Bianco", ratio: 6.71 },
  { bg: "bg-limone", fg: "text-ink", label: "Ink on Limone", ratio: 15.79 },
  { bg: "bg-azzuro", fg: "text-ink", label: "Ink on Azzuro", ratio: 11.32 },
  { bg: "bg-citrine", fg: "text-ink", label: "Ink on Citrine", ratio: 9.83 },
  { bg: "bg-pear-tree", fg: "text-ink", label: "Ink on Pear Tree", ratio: 9.18 },
  { bg: "bg-clay", fg: "text-ink", label: "Ink on Clay", ratio: 6.58 },
  { bg: "bg-terracotta", fg: "text-ink", label: "Ink on Terracotta", ratio: 4.58 },
  { bg: "bg-cerulean", fg: "text-linen", label: "Linen on Cerulean", ratio: 5.71 },
  { bg: "bg-cerulean", fg: "text-limone", label: "Limone on Cerulean", ratio: 5.18 },
  { bg: "bg-hillside", fg: "text-linen", label: "Linen on Hillside", ratio: 6.03 },
  { bg: "bg-ink", fg: "text-linen", label: "Linen on Ink", ratio: 17.4 },
  { bg: "bg-ink", fg: "text-citrine", label: "Citrine on Ink", ratio: 9.83 },
]

const FAILS = [
  { label: "Linen on Terracotta", ratio: 3.8, fix: "Ink text on Terracotta" },
  { label: "Terracotta #D35B2F as text on Linen", ratio: 3.8, fix: "Use Terracotta text #A84318" },
  { label: "Ink on Cerulean or Hillside", ratio: 3.05, fix: "Linen text on these two" },
  { label: "Azzuro on Cerulean", ratio: 3.71, fix: "Large text only" },
  { label: "Ink muted on Pear Tree", ratio: 4.17, fix: "Ink only on Pear Tree, Citrine, Clay" },
]

const TYPE = [
  { cls: "font-display text-72", name: "72 Display", use: "Hero, Metric value", sample: "Homes by the sea" },
  { cls: "font-display text-56", name: "56 H1", use: "Page titles", sample: "Selling, done slowly" },
  { cls: "font-display text-40", name: "40 H2", use: "Section headings, card titles", sample: "Where the light lands" },
  { cls: "font-display italic text-28 max-w-quote", name: "28 Quote", use: "Pull quotes, max 560", sample: "“We would rather tell you to wait than sell you the wrong house.”" },
  { cls: "text-16", name: "16 Body L", use: "Lead text, intros, drawer links", sample: "A small team that knows the coast street by street, and says so when a house is not right." },
  { cls: "text-14", name: "14 Body M", use: "Body default, buttons, nav, form fields", sample: "Every viewing starts with a conversation about how you want to live, not only about the number of bedrooms. Line height 1.65." },
  { cls: "text-12", name: "12 Body S", use: "Fine print, captions", sample: "Prices are indicative and shown for concept purposes only. Fictional agency, not a real business." },
  { cls: "eyebrow", name: "11 Eyebrow", use: "Eyebrows, labels, meta", sample: "Mediterranean homes" },
]

const SPACE = [
  ['2xs', 4], ['xs', 8], ['sm', 12], ['md', 16], ['lg', 24], ['xl', 28], ['2xl', 32],
  ['3xl', 40], ['4xl', 48], ['5xl', 64], ['6xl', 80], ['7xl', 120], ['8xl', 160],
] as const

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="px-gutter py-section border-t border-ink/15">
      <div className="mx-auto max-w-content">
        <p className="eyebrow text-ink-muted">{eyebrow}</p>
        <h2 className="mt-xs mb-3xl text-40">{title}</h2>
        {children}
      </div>
    </section>
  )
}

export default function Foundations() {
  return (
    <main>
      <header className="px-gutter py-section">
        <div className="mx-auto max-w-content">
          <p className="eyebrow text-ink-muted">Step 2 · Foundations</p>
          <h1 className="mt-xs text-40 md:text-56">Doré design tokens</h1>
          <p className="mt-md max-w-split text-16 text-ink-muted">
            Palette, type scale, spacing and logo. Every value here is a Tailwind theme variable in
            src/styles/index.css.
          </p>
        </div>
      </header>

      <Section eyebrow="01 · Logo" title="Wordmark and logomark">
        <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4">
          {[
            ['bg-linen text-ink border border-ink/15', 'Ink on Linen'],
            ['bg-cerulean text-linen', 'Linen on Cerulean'],
            ['bg-citrine text-ink', 'Ink on Citrine'],
            ['bg-terracotta text-ink', 'Ink on Terracotta'],
          ].map(([cls, label]) => (
            <figure key={label} className={`${cls} flex flex-col items-center gap-lg p-3xl`}>
              <Wordmark className="h-10 w-auto" />
              <Logomark className="h-10 w-auto" />
              <figcaption className="eyebrow">{label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-lg text-ink-muted">
          Nav size: wordmark at 40px height. Favicon: logomark, Ink on light tabs and Linen on dark tabs
          (SVG), plus 32px PNG and 180px Apple touch icon.
        </p>
      </Section>

      <Section eyebrow="02 · Color" title="Sun and Sea">
        <div className="grid grid-cols-2 gap-lg md:grid-cols-3 lg:grid-cols-5">
          {COLORS.map((c) => (
            <div key={c.token}>
              <div className={`${SWATCH[c.token]} aspect-[4/3] border border-ink/15`} />
              <p className="mt-sm font-medium">{c.name}</p>
              <p className="text-ink-muted">
                {c.hex} · {c.token}
              </p>
              <p className="text-ink-muted">{c.role}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-5xl mb-lg text-28">Text pairs that pass AA</h3>
        <div className="grid gap-md md:grid-cols-2">
          {PAIRS.map((p) => (
            <div key={p.label} className={`${p.bg} ${p.fg} flex items-baseline justify-between gap-md p-lg`}>
              <span>{p.label}</span>
              <span className="eyebrow">{p.ratio.toFixed(2)} : 1</span>
            </div>
          ))}
        </div>

        <h3 className="mt-5xl mb-lg text-28">Pairs that fail, and the fix</h3>
        <ul className="border-t border-ink/15">
          {FAILS.map((f) => (
            <li key={f.label} className="grid gap-xs border-b border-ink/15 py-md md:grid-cols-3">
              <span>{f.label}</span>
              <span className="text-ink-muted">{f.ratio.toFixed(2)} : 1</span>
              <span>{f.fix}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="03 · Type" title="One scale, eight sizes">
        <p className="mb-3xl max-w-split text-ink-muted">
          Sedan Regular and Italic for headings, Nata Sans for everything else.
        </p>
        <ul className="border-t border-ink/15">
          {TYPE.map((t) => (
            <li key={t.name} className="grid gap-md border-b border-ink/15 py-lg lg:grid-cols-[200px_1fr]">
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-ink-muted">{t.use}</p>
              </div>
              <p className={t.cls}>{t.sample}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="04 · Space" title="Spacing tokens">
        <ul className="border-t border-ink/15">
          {SPACE.map(([name, px]) => (
            <li key={name} className="grid grid-cols-[64px_64px_1fr] items-center gap-md border-b border-ink/15 py-sm">
              <span className="font-medium">{name}</span>
              <span className="text-ink-muted">{px}px</span>
              <span className="h-sm bg-cerulean" style={{ width: px }} />
            </li>
          ))}
        </ul>
        <p className="mt-lg text-ink-muted">
          Page gutter: 24 / 40 / 56 / 120 and section padding 64 / 80 / 96 / 120 at 393 / 768 / 1040 / 1440.
        </p>
      </Section>

      <footer className="bg-ink px-gutter py-3xl text-linen">
        <p className="mx-auto max-w-content eyebrow">Concept project. Fictional agency, not a real business.</p>
      </footer>
    </main>
  )
}
