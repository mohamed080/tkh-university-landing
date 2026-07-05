import { getPayloadClient } from '../client'

export async function getMarquee() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'marquee',
  })
}