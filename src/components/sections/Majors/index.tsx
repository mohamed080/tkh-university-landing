'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { MajorCard } from './MajorCard'
import type { MajorsSectionData, MajorItem } from './types'

type MajorsProps = {
  data: MajorsSectionData
  majors: MajorItem[]
}

const AUTOPLAY_INTERVAL = 3500
const GAP = 24

export function Majors({ data, majors }: MajorsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const activeMajors = majors
    .filter((major) => major.isActive !== false)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

  const scrollByCard = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    const card = container.querySelector<HTMLElement>('[data-major-card]')
    const cardWidth = card?.offsetWidth ?? 320
    const amount = cardWidth + GAP

    const isAtEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 10

    const isAtStart = container.scrollLeft <= 10

    if (direction === 'right' && isAtEnd) {
      container.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }

    if (direction === 'left' && isAtStart) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
      return
    }

    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (isPaused || !activeMajors.length) return

    intervalRef.current = setInterval(() => {
      scrollByCard('right')
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, activeMajors.length])

  if (!activeMajors.length) return null

  return (
    <section className="flex flex-col items-center bg-gradient-reverse px-4 py-20">
      <div className="mb-10 flex flex-col items-center text-center">
        {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}

        <h2 className="mt-4 max-w-lg text-4xl font-bold leading-tight text-primary lg:text-5xl">
          {data.title}
        </h2>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {activeMajors.map((major, index) => (
          <div
            key={major.id}
            data-major-card
            className="w-75 shrink-0 snap-start transition duration-500 hover:-translate-y-3 hover:scale-[1.03] sm:w-85 lg:w-100"
          >
            <MajorCard major={major} flip={index % 2 === 1} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => scrollByCard('left')}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B1B3B6] text-primary transition hover:border-primary"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => scrollByCard('right')}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-orange text-orange transition hover:bg-orange hover:text-white"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  )
}