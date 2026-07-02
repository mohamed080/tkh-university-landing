import { getPayloadClient } from '../client'

export async function getTestimonials() {
  const payload = await getPayloadClient()

  const testimonials = await payload.find({
    collection: 'testimonials',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'displayOrder',
  })

  return testimonials.docs
}