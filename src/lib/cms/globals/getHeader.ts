import { getPayloadClient } from '../client'

export async function getHeader() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'header',
  })
}