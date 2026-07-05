import Image from 'next/image'
import { getMediaAlt, getMediaUrl } from '@/lib/utils'
import type { EventItem } from './types'

type EventCardProps = {
  event: EventItem
}

function formatEventDate(dateString?: string | null) {
  if (!dateString) return null
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null

  const day = date.getDate()
  const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return { day, monthYear }
}

export function EventCard({ event }: EventCardProps) {
  const src = getMediaUrl(event.coverImage)
  const alt = getMediaAlt(event.coverImage, event.title)

  const formattedDate = formatEventDate(event.date)

  return (
    <div
      className="group relative aspect-video w-full overflow-hidden bg-[#1B2A4E]"
      style={{ clipPath: 'polygon(14% 0, 100% 0, 100% 55%, 85% 100%, 0 100%, 0 45%)' }}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 50vw"
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition duration-500 group-hover:from-black/90" />

      {formattedDate && (
        <div
          className="absolute right-0 top-0 flex h-[80px] w-[86px] flex-col items-center justify-center gap-1 bg-orange text-white sm:h-[105px] sm:w-[113px] lg:h-[127px] lg:w-[137px]"
          style={{ clipPath: 'polygon(14% 0, 100% 0, 100% 55%, 85% 100%, 0 100%, 0 45%)' }}
        >
          <span className="text-base font-bold leading-none sm:text-xl lg:text-2xl">
            {formattedDate.day}
          </span>
          <span className="px-1 text-center text-[10px] leading-tight sm:text-xs lg:text-sm">
            {formattedDate.monthYear}
          </span>
        </div>
      )}

      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1 sm:inset-x-6 sm:bottom-6">
        <h3 className="line-clamp-2 text-lg font-semibold text-white sm:text-xl lg:text-2xl">
          {event.title}
        </h3>
        <p className="line-clamp-2 max-w-[85%] text-xs leading-5 text-white/80 sm:max-w-[70%] sm:text-sm sm:leading-6">
          {event.description}
        </p>
      </div>
    </div>
  )
}