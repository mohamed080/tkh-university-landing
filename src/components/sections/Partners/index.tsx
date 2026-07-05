'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useInView } from './useInView'
import { PartnerCard } from './PartnerCard'
import type { PartnersSectionData, PartnerItem } from './types'

type PartnersProps = {
  data: PartnersSectionData
  partners: PartnerItem[]
}

type CardState = {
  xPercent: number
  yPercent: number
  rotation: number
  scale?: number
}

// anchor = which corner each card is pinned to
const ANCHOR_CLASSES = ['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0']

// CLOSED: pinned at corner, heavy rotation + pull → overlapping pinwheel bleed
const CLOSED_STATE: CardState[] = [
  { xPercent: 60, yPercent: 55, rotation: -10, scale: 0.9 },
  { xPercent: -60, yPercent: 55, rotation: 10, scale: 0.9 },
  { xPercent: 60, yPercent: -55, rotation: 10, scale: 0.9 },
  { xPercent: -60, yPercent: -55, rotation: -10, scale: 0.9 },
]

// OPEN: pulled outward toward own corner, rotation relaxes
const OPEN_STATE: CardState[] = [
  { xPercent: -18, yPercent: 6, rotation: -4, scale: 1 },
  { xPercent: 18, yPercent: 6, rotation: 4, scale: 1 },
  { xPercent: -18, yPercent: -6, rotation: 4, scale: 1 },
  { xPercent: 18, yPercent: -6, rotation: -4, scale: 1 },
]

// hovered card moves to stage center, upright, scaled up
const CENTER_STATE: CardState[] = [
  { xPercent: 45, yPercent: 65, rotation: 0, scale: 1.15 },
  { xPercent: -45, yPercent: 65, rotation: 0, scale: 1.15 },
  { xPercent: 45, yPercent: -65, rotation: 0, scale: 1.15 },
  { xPercent: -45, yPercent: -65, rotation: 0, scale: 1.15 },
]

// other cards scatter further out + rotate harder when one is hovered
const SCATTERED_STATE: CardState[] = [
  { xPercent: -42, yPercent: -18, rotation: -15 },
  { xPercent: 42, yPercent: -18, rotation: 15 },
  { xPercent: -42, yPercent: 18, rotation: 15 },
  { xPercent: 42, yPercent: 18, rotation: -15 },
]

// Mobile: small alternating tilt per card, stacked in a single column
const MOBILE_ROTATIONS = [-3, 2, -2, 3]

export function Partners({ data, partners }: PartnersProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const activePartners = partners
    .filter((partner) => partner.isActive !== false)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

  const firstRow = activePartners
  const secondRow = [...activePartners].reverse()
  const combinedRows = [...firstRow, ...secondRow]

  const displayPartners = activePartners.length
    ? Array.from({ length: 4 }, (_, index) => combinedRows[index % combinedRows.length])
    : []

  useEffect(() => {
    displayPartners.forEach((_, index) => {
      const el = cardRefs.current[index]
      if (!el) return

      const isHovered = hoveredIndex === index
      const isOtherHovered = hoveredIndex !== null && !isHovered

      const target = isHovered
        ? CENTER_STATE[index]
        : isOtherHovered
          ? SCATTERED_STATE[index]
          : inView
            ? OPEN_STATE[index]
            : CLOSED_STATE[index]

      gsap.to(el, {
        xPercent: target.xPercent,
        yPercent: target.yPercent,
        rotation: target.rotation,
        scale: target.scale ?? 1,
        zIndex: isHovered ? 30 : 10 - index,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      gsap.to(el, {
        opacity: isOtherHovered ? 0.5 : 1,
        filter: isOtherHovered ? 'blur(2px)' : 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
      })
    })
  }, [inView, hoveredIndex, displayPartners.length])

  if (!displayPartners.length) return null

  return (
    <section ref={ref} className="overflow-hidden bg-gradient-reverse px-4 py-16 md:py-28">
      {/* Shared eyebrow/title/description — mobile only, sits above the stack */}
      <div className="mx-auto mb-8 flex max-w-sm flex-col items-center px-4 text-center md:hidden">
        {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
        <h2 className="mt-4 text-2xl font-bold leading-tight text-primary">{data.title}</h2>
        <p className="mt-3 text-sm leading-6 text-secondary">{data.description}</p>
      </div>

      {/* MOBILE: stacked cards with alternating tilt, no GSAP needed */}
      <div className="flex flex-col gap-6 md:hidden">
        {displayPartners.map((partner, index) => (
          <div
            key={`${partner.id}-mobile-${index}`}
            className="h-[300px] w-full origin-center transition-transform duration-300"
            style={{ transform: `rotate(${MOBILE_ROTATIONS[index % MOBILE_ROTATIONS.length]}deg)` }}
          >
            <PartnerCard partner={partner} />
          </div>
        ))}
      </div>

      {/* DESKTOP: GSAP pinwheel */}
      <div className="relative mx-auto hidden h-[900px] max-w-[1440px] md:block">
        <div
          className={`absolute inset-0 z-0 flex flex-col items-center justify-center px-10 text-center transition-opacity duration-700 delay-500 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          <h2 className="mt-4 max-w-sm text-2xl font-bold leading-tight text-primary lg:text-3xl">
            {data.title}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-secondary">{data.description}</p>
        </div>

        {displayPartners.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            className={`absolute h-[260px] w-[520px] md:h-[320px] md:w-[680px] lg:h-[360px] lg:w-[800px] ${ANCHOR_CLASSES[index]}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <PartnerCard partner={partner} />
          </div>
        ))}
      </div>
    </section>
  )
}