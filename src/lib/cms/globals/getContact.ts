import { getPayloadClient } from '../client'

export async function getContact() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'contact',
  })
}