import Image from 'next/image'
import { getMediaAlt, getMediaUrl } from '@/lib/utils'
import type { NewsItem } from './types'

type NewsCardProps = {
  item: NewsItem
}

function formatDate(dateString?: string | null) {
  if (!dateString) return null
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null

  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function NewsCard({ item }: NewsCardProps) {
  const src = getMediaUrl(item.coverImage)
  const alt = getMediaAlt(item.coverImage, item.title)
  const formattedDate = formatDate(item.date)

  return (
    <div className="group flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#1B2A4E]"
      style={{ clipPath: 'polygon(100% 0%, 100% 80%, 88% 100%, 0% 100%, 0% 20%, 10% 0%)' }}
        
        >
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      {item.category && (
        <span className="text-xs font-semibold uppercase tracking-wide text-orange">
          {item.category}
        </span>
      )}

      <h3 className="line-clamp-2 text-base font-semibold leading-snug text-primary transition-colors duration-300 group-hover:text-orange">
        {item.title}
      </h3>

      {formattedDate && <span className="text-sm text-secondary">{formattedDate}</span>}
    </div>
  )
}