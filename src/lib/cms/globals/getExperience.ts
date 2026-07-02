import { getPayloadClient } from '../client'

export async function getExperience() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'experience',
  })
}