import Image from 'next/image'
import { getMediaAlt, getMediaUrl } from '@/lib/utils'
import type { MarqueeRow as MarqueeRowType } from './types'

type MarqueeRowProps = {
  row: MarqueeRowType
  index: number
}

const ROW_COLORS = ['bg-[#2C4B9B]', 'bg-[#1E7A4C]', 'bg-[#8A8D91]', 'bg-orange', 'bg-[#1B2A4E]']

const REPEAT_COUNT = 10

export function MarqueeRow({ row, index }: MarqueeRowProps) {
  const bgClass = ROW_COLORS[index % ROW_COLORS.length]
  const isRight = index % 2 === 1
  const animationClass = isRight
    ? 'animate-[marqueeRight_25s_linear_infinite]'
    : 'animate-[marqueeLeft_25s_linear_infinite]'
  const tiltDeg = index % 2 === 0 ? -2.5 : 2.5

  const logoSrc = row.type === 'logo' ? getMediaUrl(row.logo) : null
  const logoAlt = getMediaAlt(row.logo, 'Partner logo')

  const items = Array.from({ length: REPEAT_COUNT })

  return (
    <div
      className={`relative flex h-[80px] w-[140%] items-center overflow-hidden sm:h-[120px] sm:w-[130%] md:h-[150px] lg:h-[180px] ${bgClass}`}
      style={{ transform: `rotate(${tiltDeg}deg) translateX(-18%)` }}
    >
      <div
        className={`flex h-full w-max shrink-0 items-center gap-6 whitespace-nowrap sm:gap-10 lg:gap-16 ${animationClass}`}
      >
        {items.map((_, itemIndex) => (
          <div key={itemIndex} className="flex h-full items-center gap-6 sm:gap-10 lg:gap-16">
            {row.type === 'text' && row.label && (
              <span className="text-base font-extrabold uppercase leading-none tracking-wide text-white sm:text-xl lg:text-2xl">
                {row.label}
              </span>
            )}

            {row.type === 'logo' && logoSrc && (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={160}
                height={110}
                className="h-12 w-auto object-contain brightness-0 invert sm:h-20 lg:h-30"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}