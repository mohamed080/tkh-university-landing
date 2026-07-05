import Image from 'next/image'
import { getMediaAlt, getMediaUrl } from '@/lib/utils'
import type { ExperienceTab } from './types'

type ExperienceImageProps = {
  tab: ExperienceTab
}

export function ExperienceImage({ tab }: ExperienceImageProps) {
  const src = getMediaUrl(tab.image)
  const alt = getMediaAlt(tab.image, tab.title)

  return (
    <div className="relative aspect-4/3 w-full">
      <div
        className="relative h-full w-full overflow-hidden bg-[#1B2A4E]"
        style={{
          clipPath:
            'polygon(25% 0, 89% 0, 100% 35%, 100% 100%, 68% 100%, 16% 100%, 0 65%, 0 35%, 0 0)',
        }}
      >
        {src && (
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 50vw"
            className="object-cover transition-opacity duration-500"
          />
        )}
        {tab.statBadge?.value && (
          <div
            className="absolute bottom-0 flex flex-col bg-[#1B2A4E] px-4 py-4 tracking-tight text-white left-[10%] sm:px-6 sm:py-6 lg:px-7 lg:py-7"
            style={{ clipPath: 'polygon(0 2%, 79% 0, 100% 30%, 100% 100%, 0 99%, 0% 50%)' }}
          >
            <span className="text-xs sm:text-sm lg:text-base">{tab.statBadge.label}</span>
            <span className="text-3xl leading-none sm:text-4xl lg:text-[50px]">{tab.statBadge.value}</span>
          </div>
        )}
      </div>
    </div>
  )
}
