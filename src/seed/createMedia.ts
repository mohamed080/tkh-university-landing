import type { Payload } from 'payload'
import { downloadFile } from './downloadImage'

const mediaCache = new Map<string, string>()

export async function createMedia(payload: Payload, url: string, alt: string): Promise<string> {
  const cacheKey = `${url}::${alt}`
  if (mediaCache.has(cacheKey)) return mediaCache.get(cacheKey) as string

  const filePath = await downloadFile(url)

  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath,
  })

  mediaCache.set(cacheKey, doc.id as string)
  return doc.id as string
}

export async function createVideoMedia(payload: Payload, url: string, alt: string): Promise<string> {
  const cacheKey = `${url}::${alt}`
  if (mediaCache.has(cacheKey)) return mediaCache.get(cacheKey) as string

  const filePath = await downloadFile(url, 'mp4')

  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath,
  })

  mediaCache.set(cacheKey, doc.id as string)
  return doc.id as string
}

export const PHOTO = (seed: string, w = 1200, h = 900) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const LOGO = (text: string, bg = '1B2A4E', fg = 'FFFFFF') =>
  `https://placehold.co/320x120/${bg}/${fg}.png?text=${encodeURIComponent(text)}`

// Small, freely-licensed sample video — swap for real footage later via the admin UI
export const SAMPLE_VIDEO_URL =
  'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'