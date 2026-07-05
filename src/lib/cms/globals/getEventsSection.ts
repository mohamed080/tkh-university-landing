import { getPayloadClient } from '../client'

export async function getEventsSection() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'eventsSection',
  })
}