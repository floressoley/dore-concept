import { cn } from '../lib/cn.ts'
import { Button } from './Button.tsx'
import { Logomark } from './Logo.tsx'
import { Media } from './Media.tsx'

type TeamCardProps = {
  name: string
  role: string
  image?: string
  imageAlt: string
  email?: string
  /** Force Hover for documentation. Real hover and keyboard focus work without it. */
  state?: 'Default' | 'Hover'
}

/** Hover or focus reveals one "Get in touch" button, led by the logomark, over the bottom of the photo. Touch devices always show it. */
export function TeamCard({ name, role, image, imageAlt, email = 'team@dore.example', state = 'Default' }: TeamCardProps) {
  return (
    <article data-state={state} className="group flex w-full max-w-[400px] flex-col items-center gap-md text-center">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-media">
        <Media src={image} alt={imageAlt} tone="clay" />
        <div
          className={cn(
            'absolute inset-x-md bottom-md flex opacity-0 transition-opacity duration-200',
            'group-hover:opacity-100 group-focus-within:opacity-100 group-data-[state=Hover]:opacity-100 pointer-coarse:opacity-100',
          )}
        >
          <Button href={`mailto:${email}`} icon={<Logomark className="h-5 w-auto text-limone" />} className="flex-1">Get in touch</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2xs">
        <h3 className="font-sans text-14 text-ink">{name}</h3>
        <p className="eyebrow text-ink-muted">{role}</p>
      </div>
    </article>
  )
}
