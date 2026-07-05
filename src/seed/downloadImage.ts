import { writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'

let counter = 0

export async function downloadFile(url: string, extensionHint?: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`)

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  counter += 1
  const extension = extensionHint ?? (url.includes('.png') ? 'png' : url.includes('.mp4') ? 'mp4' : 'jpg')
  const filePath = path.join(tmpdir(), `seed-${Date.now()}-${counter}.${extension}`)

  await writeFile(filePath, buffer)
  return filePath
}