import { getPayloadClient } from '../client'

export async function getMajorsSection() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'majorsSection',
  })
}