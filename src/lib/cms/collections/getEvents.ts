import { getPayloadClient } from '../client'

export async function getEvents() {
  const payload = await getPayloadClient()

  const events = await payload.find({
    collection: 'events',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'displayOrder',
  })

  return events.docs
}