import Image from 'next/image'
import type { HeroMedia } from './types'

function getMediaSource(media: HeroMedia) {
  if (!media || typeof media === 'number') return null

  if (typeof media === 'string') {
    return { src: media, alt: 'Hero media', mimeType: '' }
  }

  if (!media.url) return null

  return {
    src: media.url,
    alt: media.alt || 'Hero media',
    mimeType: media.mimeType || '',
  }
}

type Props = {
  video: HeroMedia
  fallback: HeroMedia
}

export function HeroVideo({ video, fallback }: Props) {
  const videoSource = getMediaSource(video)
  const fallbackSource = getMediaSource(fallback)
  const canUseVideo = Boolean(videoSource?.src)

  return (
    <div className="absolute inset-0 m-4">
      {canUseVideo ? (
        <video autoPlay muted loop playsInline poster={fallbackSource?.src} className="h-full xl:h-auto w-full object-cover object-bottom rounded-4xl overflow-hidden">
          <source src={videoSource?.src} type={videoSource?.mimeType || undefined} />
        </video>
      ) : fallbackSource ? (
        <Image
          src={fallbackSource.src}
          alt={fallbackSource.alt}
          fill
          priority
          className="object-cover rounded-4xl"
          sizes="100vw"
        />
      ) : null}

    </div>
  )
}