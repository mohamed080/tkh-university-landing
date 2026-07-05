import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { MediaItem, MegaMenuData } from './types'

type MegaMenuProps = {
  megaMenu?: MegaMenuData | null
  onNavigate?: () => void
}

function getMediaImage(media: MediaItem, fallbackAlt: string) {
  if (!media || typeof media === 'number') return null
  if (typeof media === 'string') return { src: media, alt: fallbackAlt }
  if (!media.url) return null
  return { src: media.url, alt: media.alt || fallbackAlt }
}

export function MegaMenu({ megaMenu, onNavigate }: MegaMenuProps) {
  const previewImage = getMediaImage(megaMenu?.previewImage, 'Mega menu preview')
  const hasPreviewImages = Boolean(megaMenu?.previewImages?.length)
  const hasLinks = Boolean(megaMenu?.links?.length)

  return (
    <div className="grid min-h-90 grid-cols-[30%_30%_1fr] gap-10 border-t border-[#B1B3B6] p-8">
      <div className="space-y-2">
        {megaMenu?.cards?.map((card) => {
          const image = getMediaImage(card.image, card.title)
          return (
            <Link
              key={`${card.title}-${card.href}`}
              href={card.href || '#'}
              onClick={onNavigate}
              className="flex items-center justify-between gap-4 rounded-3xl p-4 transition-all duration-300 ease-in-out hover:bg-[#EFF1F4B2] hover:shadow-lg"
            >
              <div>
                {image && (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={145}
                    height={60}
                    className="h-auto max-h-15 w-36.25 object-contain"
                  />
                )}
                {!image && <h3 className="text-lg font-semibold text-primary">{card.title}</h3>}
                {card.description && (
                  <p className="mt-2 text-sm leading-6 text-secondary">{card.description}</p>
                )}
              </div>

              <ChevronRight className="shrink-0" size={22} />
            </Link>
          )
        })}
      </div>
      {hasLinks && (
        <div className="flex flex-col border-s-2 border-s-[#B1B3B6]">
          {megaMenu?.links?.length ? (
            <ul className="space-y-6 ps-12 pt-6">
              {megaMenu.links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link
                    href={link.href || '#'}
                    onClick={onNavigate}
                    className="inline-flex items-center gap-2 text-base font-medium text-primary transition hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}

      <div
        className={`flex items-start justify-center ${
          !hasLinks && hasPreviewImages ? 'border-s-2 border-s-[#B1B3B6] ps-10' : ''
        }`}
      >
        {previewImage && (
          <Image
            src={previewImage.src}
            alt={previewImage.alt}
            width={420}
            height={280}
            className="h-65 w-full object-cover"
          />
        )}
        {!previewImage && hasPreviewImages && (
          <div className="flex flex-col gap-2">
            {megaMenu?.previewImages?.map((item, index) => {
              const image = getMediaImage(item.image, 'University logo')
              if (!image) return null
              return (
                <Image
                  key={`${image.src}-${index}`}
                  src={image.src}
                  alt={image.alt}
                  width={360}
                  height={120}
                  className="h-auto w-[320px] p-6"
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
