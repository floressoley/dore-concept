import { useEffect, useRef } from 'react'
import { cn } from '../lib/cn.ts'

type VideoBackdropProps = {
  src: string
  /** Still frame shown while the video loads, and kept for visitors who ask for reduced motion. */
  poster?: string
  /** Tailwind gradient stops for the dark layer over the video, so light text stays readable. */
  overlay?: string
  /** Soft blur over the video. Off by default. */
  blur?: boolean
}

/**
 * A muted, looping video behind a section, with a dark gradient over it. The parent must be
 * `relative isolate`. Visitors who ask their device for reduced motion get the first frame.
 */
export function VideoBackdrop({ src, poster, overlay = 'from-ink/55 via-ink/35 to-ink/60', blur = false }: VideoBackdropProps) {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.pause()
  }, [])

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden bg-ink">
        <video
          ref={video}
          className={cn('h-full w-full object-cover', blur && 'scale-105 blur-[3px]')}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
      <div aria-hidden="true" className={cn('absolute inset-0 -z-10 bg-gradient-to-b', overlay)} />
    </>
  )
}
