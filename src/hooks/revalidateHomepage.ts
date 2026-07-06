import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

async function triggerRevalidate() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const secret = process.env.REVALIDATE_SECRET

  try {
    await fetch(`${baseUrl}/api/revalidate?secret=${secret}&path=/`, { method: 'POST' })
  } catch (error) {
    console.error('Failed to trigger revalidation:', error)
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async () => {
  await triggerRevalidate()
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async () => {
  await triggerRevalidate()
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async () => {
  await triggerRevalidate()
}