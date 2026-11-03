import type { ReactNode } from 'react'
import { cn } from '../lib/cn.ts'

export type LabelSize = 'Small' | 'Medium' | 'Large'
export type LabelTone = 'Primary' | 'Orange' | 'Muted' | 'Stone' | 'Chalk' | 'Inverse'

const SIZE: Record<LabelSize, string> = {
  Small: 'eyebrow font-normal',
  Medium: 'eyebrow',
  Large: 'label-m',
}

// Orange = terracotta text (5.8:1 on linen). Stone and Chalk are for dark surfaces. Inverse is linen.
const TONE: Record<LabelTone, string> = {
  Primary: 'text-ink',
  Orange: 'text-terracotta-text',
  Muted: 'text-ink-muted',
  Stone: 'text-azzuro',
  Chalk: 'text-vino-bianco',
  Inverse: 'text-linen',
}

export function SectionLabel({ size = 'Medium', tone = 'Primary', className, children }: { size?: LabelSize; tone?: LabelTone; className?: string; children: ReactNode }) {
  return <p className={cn(SIZE[size], TONE[tone], className)}>{children}</p>
}
