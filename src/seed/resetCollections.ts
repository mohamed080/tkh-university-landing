import type { Payload } from 'payload'

const SEEDED_COLLECTIONS = ['partners', 'majors', 'events', 'testimonials', 'news'] as const

export async function resetCollections(payload: Payload) {
  for (const slug of SEEDED_COLLECTIONS) {
    const { docs } = await payload.find({ collection: slug, limit: 1000 })
    for (const doc of docs) {
      await payload.delete({ collection: slug, id: doc.id })
    }
    console.log(`Cleared ${docs.length} doc(s) from "${slug}"`)
  }
}