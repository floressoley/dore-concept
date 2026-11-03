import {
  ArrowLeft as PhArrowLeft,
  ArrowRight as PhArrowRight,
  ArrowUpRight as PhArrowUpRight,
  ArrowsDownUp as PhArrowsDownUp,
  Bathtub as PhBathtub,
  Bed as PhBed,
  CaretDown as PhCaretDown,
  CaretLeft as PhCaretLeft,
  CaretRight as PhCaretRight,
  CaretUp as PhCaretUp,
  Check as PhCheck,
  Clock as PhClock,
  EnvelopeSimple as PhEnvelopeSimple,
  House as PhHouse,
  List as PhList,
  MagnifyingGlass as PhMagnifyingGlass,
  MapPin as PhMapPin,
  Minus as PhMinus,
  Phone as PhPhone,
  Plus as PhPlus,
  Ruler as PhRuler,
  Sun as PhSun,
  Wallet as PhWallet,
  X as PhX,
} from '@phosphor-icons/react'
import type { Icon as PhosphorIcon, IconProps as PhosphorProps } from '@phosphor-icons/react'

// One place that maps our icon names to Phosphor. Swap the weight here to restyle every icon.
export type IconProps = Omit<PhosphorProps, 'weight'> & { size?: number }

const WEIGHT = 'regular'

const make =
  (Component: PhosphorIcon) =>
  ({ size = 16, ...props }: IconProps) => <Component size={size} weight={WEIGHT} aria-hidden="true" focusable="false" {...props} />

export const ArrowUpRight = make(PhArrowUpRight)
export const ArrowLeft = make(PhArrowLeft)
export const ArrowRight = make(PhArrowRight)
export const ChevronDown = make(PhCaretDown)
export const ChevronUp = make(PhCaretUp)
export const ChevronLeft = make(PhCaretLeft)
export const ChevronRight = make(PhCaretRight)
export const Plus = make(PhPlus)
export const Minus = make(PhMinus)
export const Close = make(PhX)
export const Search = make(PhMagnifyingGlass)
export const Menu = make(PhList)
export const Check = make(PhCheck)
export const MapPin = make(PhMapPin)
export const House = make(PhHouse)
export const Wallet = make(PhWallet)
export const Sun = make(PhSun)
export const Bed = make(PhBed)
export const Bath = make(PhBathtub)
export const Area = make(PhRuler)
export const Sort = make(PhArrowsDownUp)
export const Phone = make(PhPhone)
export const Mail = make(PhEnvelopeSimple)
export const Clock = make(PhClock)
