import { getPayloadClient } from '../client'

export async function getSEO() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'seo',
  })
}