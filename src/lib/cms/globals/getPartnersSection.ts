import { getPayloadClient } from '../client'

export async function getPartnersSection() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'partnersSection',
  })
}