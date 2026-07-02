import { getPayloadClient } from '../client'

export async function getNews() {
  const payload = await getPayloadClient()

  const news = await payload.find({
    collection: 'news',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'displayOrder',
  })

  return news.docs
}