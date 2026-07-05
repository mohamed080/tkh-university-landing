import { getPayloadClient } from '../client'

export async function getFooter() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'footer',
  })
}