import { cn } from '../lib/cn.ts'

export type MetricTone = 'Paper' | 'Sand' | 'Olive' | 'Orange' | 'Cobalt'

// Figma tone names are kept. Mapped to Doré: Sand = Vino Bianco, Olive = Hillside, Cobalt = Cerulean.
const TONE: Record<MetricTone, string> = {
  Paper: 'text-ink',
  Sand: 'bg-vino-bianco text-ink',
  Olive: 'bg-hillside text-linen',
  Orange: 'bg-terracotta text-ink',
  Cobalt: 'bg-cerulean text-linen',
}

type MetricOfferProps = {
  tone?: MetricTone
  value: string
  label: string
  description: string
}

export function MetricOffer({ tone = 'Paper', value, label, description }: MetricOfferProps) {
  return (
    <div className={cn('flex w-full max-w-[420px] flex-col gap-md rounded-media p-3xl', TONE[tone], tone === 'Paper' && 'border border-ink/25')}>
      <p className="font-display text-56 leading-none lg:text-72">{value}</p>
      <div className="flex flex-col gap-sm">
        <p className="eyebrow">{label}</p>
        <p className="text-14">{description}</p>
      </div>
    </div>
  )
}
