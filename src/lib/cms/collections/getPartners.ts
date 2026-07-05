import { getPayloadClient } from '../client'

export async function getPartners() {
  const payload = await getPayloadClient()

  const partners = await payload.find({
    collection: 'partners',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'displayOrder',
  })

  return partners.docs
}