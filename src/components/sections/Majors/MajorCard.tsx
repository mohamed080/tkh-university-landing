import Image from 'next/image'
import { getMediaAlt, getMediaUrl } from '@/lib/utils'
import type { MajorItem } from './types'

type MajorCardProps = {
  major: MajorItem
  flip?: boolean
}

export function MajorCard({ major, flip }: MajorCardProps) {
  const src = getMediaUrl(major.coverImage)
  const alt = getMediaAlt(major.coverImage, major.name)

  return (
    <div
      className="relative aspect-5/5 w-full overflow-hidden bg-[#1B2A4E]"
      style={{
         clipPath: 'polygon(0 0, 86% 0, 100% 31%, 100% 100%, 17% 100%, 0 70%)',
        }}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-6 left-[18%] flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-white">{major.name}</h3>
        {typeof major.programsCount === 'number' && (
          <span className="text-sm text-white/80">{major.programsCount} Programs</span>
        )}
      </div>
    </div>
  )
}