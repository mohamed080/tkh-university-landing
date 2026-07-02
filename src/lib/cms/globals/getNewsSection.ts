import { getPayloadClient } from '../client'

export async function getNewsSection() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'newsSection',
  })
}