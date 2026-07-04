import type { Media } from '@/payload-types'

export type PayloadMedia = Media | string | number | null | undefined

export function isMedia(media: PayloadMedia): media is Media {
  return Boolean(media && typeof media === 'object' && 'url' in media && media.url)
}

export function getMediaUrl(media: PayloadMedia) {
  if (!isMedia(media)) return ''

  return media.url || ''
}

export function getMediaAlt(media: PayloadMedia, fallback = 'Image') {
  if (!isMedia(media)) return fallback

  return media.alt || fallback
}
