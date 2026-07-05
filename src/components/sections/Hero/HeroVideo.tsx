import Image from 'next/image'
import type { HeroMedia } from './types'
import { getMediaAlt, getMediaUrl } from '@/lib/utils'

type Props = {
  video: HeroMedia
  fallback: HeroMedia
}

export function HeroVideo({ video, fallback }: Props) {
  const videoSrc = getMediaUrl(video)
  const fallbackSrc = getMediaUrl(fallback)
  const fallbackAlt = getMediaAlt(fallback, 'Hero media')

  return (
    <div className="absolute inset-0 mx-4 mt-4 mb-0 overflow-hidden rounded-4xl">
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={fallbackSrc || undefined}
          className="h-full w-full object-cover object-bottom"
        >
          <source src={videoSrc} />
        </video>
      ) : fallbackSrc ? (
        <Image
          src={fallbackSrc}
          alt={fallbackAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
    </div>
  )
}
