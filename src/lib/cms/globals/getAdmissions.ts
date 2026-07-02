import { getPayloadClient } from '../client'

export async function getAdmissions() {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'admissions',
  })
}