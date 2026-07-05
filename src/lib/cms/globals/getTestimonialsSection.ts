import { getPayloadClient } from '../client'

export async function getTestimonialsSection() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'testimonialsSection',
  })
}