import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getMediaAlt, getMediaUrl } from '@/lib/utils'
import type { PartnerItem } from './types'

type PartnerCardProps = {
  partner: PartnerItem
  dimmed?: boolean
}

export function PartnerCard({ partner, dimmed }: PartnerCardProps) {
  const coverSrc = getMediaUrl(partner.coverImage)
  const coverAlt = getMediaAlt(partner.coverImage, partner.name)
  const logoSrc = getMediaUrl(partner.logo)
  const logoAlt = getMediaAlt(partner.logo, `${partner.name} logo`)

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-3xl shadow-xl transition-[opacity,filter] duration-500 ${
        dimmed ? 'opacity-60 blur-[1px]' : 'opacity-100'
      }`}
    >
      {coverSrc && (
        <Image
          src={coverSrc}
          alt={coverAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        {/* Left: partnered-with label, logo, CTA */}
        <div className="flex flex-col gap-5 sm:gap-3">
            {logoSrc && (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={180}
                height={56}
                className="h-10 w-auto object-contain"
              />
            )}

          {partner.cta?.label && (
            <Link
              href={partner.cta.href || '#'}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-orange"
            >
              {partner.cta.label}
              <ArrowUpRight size={16} className="h-6 w-6 rounded-full bg-orange p-1 text-white" />
            </Link>
          )}
        </div>

        {/* Right: facts as separate rounded boxes */}
        {partner.facts?.length ? (
          <div className="hidden flex-wrap justify-end gap-3 sm:flex">
            {partner.facts.map((fact) => (
              <div
                key={fact.id ?? fact.title}
                className="w-39 xl:w-43 rounded-2xl bg-black/30 px-4 py-3 backdrop-blur-sm"
              >
                <p className="text-sm font-semibold text-white">{fact.title}</p>
                <p className="mt-1 text-[11px] leading-4 text-white/70">{fact.description}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}