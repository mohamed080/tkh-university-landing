import Image from 'next/image'
import { getMediaAlt, getMediaUrl } from '@/lib/utils'
import type { TestimonialItem } from './types'

type TestimonialCardProps = {
  testimonial: TestimonialItem
  offset: number
  onClick: () => void
}

export function TestimonialCard({ testimonial, offset, onClick }: TestimonialCardProps) {
  const coverSrc = getMediaUrl(testimonial.coverImage)
  const coverAlt = getMediaAlt(testimonial.coverImage, testimonial.studentName)
  const logoSrc = getMediaUrl(testimonial.universityLogo)
  const logoAlt = getMediaAlt(testimonial.universityLogo, 'University logo')
  const avatarSrc = getMediaUrl(testimonial.studentAvatar)
  const avatarAlt = getMediaAlt(testimonial.studentAvatar, testimonial.studentName)
  const graduationYearSrc = getMediaUrl(testimonial.graduationYear)
  const graduationYearAlt = getMediaAlt(testimonial.graduationYear, 'Graduation year')

  const isActive = offset === 0
  const absOffset = Math.abs(offset)

  const translateX = offset * 130
  const scale = 1 - absOffset * 0.12
  const rotate = offset * 10
  const zIndex = 10 - absOffset

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute inset-0 m-auto h-full w-full p-3 bg-white text-left shadow-2xl transition-all duration-500 ease-out sm:w-[85%]"
      style={{
        transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
        zIndex,
        pointerEvents: isActive ? 'none' : 'auto',
      }}
    >
      <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(101.56deg,#1E2749_18.07%,#101828_49.29%,#27202F_80.51%)]">
        <div className="relative m-3 sm:m-4">
          {coverSrc && (
            <Image
              src={coverSrc}
              alt={coverAlt}
              className="h-full w-full object-cover"
              width={420}
              height={420}
              sizes="(max-width: 640px) 90vw, 420px"
            />
          )}

          {logoSrc && (
            <div className="absolute bottom-2 left-1">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={150}
                height={59}
                className="h-10 w-auto object-contain sm:h-14 lg:h-18"
              />
            </div>
          )}

          {graduationYearSrc && (
            <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
              <Image
                src={graduationYearSrc}
                alt={graduationYearAlt}
                width={120}
                height={48}
                className="h-10 w-auto object-contain sm:h-14 lg:h-16"
              />
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            {avatarSrc && (
              <Image
                src={avatarSrc}
                alt={avatarAlt}
                width={40}
                height={40}
                className="h-8 w-8 shrink-0 rounded-full border-2 border-white object-cover sm:h-10 sm:w-10"
              />
            )}
            <div>
              <p className="text-xs font-semibold text-white sm:text-sm">{testimonial.studentName}</p>
              <p className="text-[11px] text-white/70 sm:text-xs">{testimonial.currentRole}</p>
              <p className="line-clamp-3 text-[11px] leading-5 text-white/85 sm:line-clamp-4 sm:text-xs">
                {testimonial.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}