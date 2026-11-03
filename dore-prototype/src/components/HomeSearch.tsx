import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { cn } from '../lib/cn.ts'
import { Button } from './Button.tsx'
import { House, MapPin, Search, Wallet } from './Icons.tsx'
import { SelectField } from './SelectField.tsx'
import type { SelectOption } from './SelectField.tsx'

const LOCATIONS: SelectOption[] = [
  { value: '', label: 'Anywhere' },
  { value: 'harbour-district', label: 'Harbour district' },
  { value: 'old-town', label: 'Old town' },
  { value: 'olive-hills', label: 'Olive hills' },
  { value: 'north-cove', label: 'North cove' },
]

const TYPES: SelectOption[] = [
  { value: '', label: 'Any type' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'villa', label: 'Villa' },
  { value: 'farmhouse', label: 'Farmhouse' },
]

const BUDGETS: SelectOption[] = [
  { value: '', label: 'Any budget' },
  { value: 'to-1m', label: 'Up to €1M' },
  { value: '1m-2m', label: '€1M to €2M' },
  { value: '2m-4m', label: '€2M to €4M' },
  { value: '4m-plus', label: '€4M and above' },
]

/** Hero search: Location, Type and Budget, then Search. Sends the choices to the Homes page as a query. */
export function HomeSearch({ className }: { className?: string }) {
  const navigate = useNavigate()
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    new FormData(e.currentTarget).forEach((value, key) => {
      if (typeof value === 'string' && value) params.set(key, value)
    })
    const query = params.toString()
    navigate(query ? `/buy?${query}` : '/buy')
  }
  return (
    <form
      role="search"
      aria-label="Search homes"
      onSubmit={submit}
      className={cn('flex w-full max-w-[900px] flex-col gap-xs rounded-media bg-linen p-xs text-ink md:flex-row md:items-stretch', className)}
    >
      <div className="flex flex-1 flex-col divide-y divide-ink/15 md:flex-row md:divide-x md:divide-y-0">
        <SelectField name="area" label="Location" icon={<MapPin size={20} />} options={LOCATIONS} />
        <SelectField name="type" label="Type" icon={<House size={20} />} options={TYPES} />
        <SelectField name="budget" label="Budget" icon={<Wallet size={20} />} options={BUDGETS} />
      </div>
      <Button type="submit" icon={<Search size={18} />} className="min-h-14 md:px-8">
        Search
      </Button>
    </form>
  )
}
