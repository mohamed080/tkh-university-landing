import { getPayloadClient } from '../client'

export async function getMajors() {
  const payload = await getPayloadClient()

  const majors = await payload.find({
    collection: 'majors',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'displayOrder',
  })

  return majors.docs
}