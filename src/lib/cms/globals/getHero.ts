import { getPayloadClient } from '../client'

export async function getHero() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'hero',
  })
}