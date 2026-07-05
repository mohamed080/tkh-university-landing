'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { EventCard } from './EventCard'
import type { EventsSectionData, EventItem } from  './types'
import { ButtonLink } from '@/components/ui/ButtonLink'

type EventsProps = {
  data: EventsSectionData
  events: EventItem[]
}

const AUTOPLAY_INTERVAL = 3500
export function Events({ data, events }: EventsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const activeEvents = events
    .filter((event) => event.isActive !== false)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

  const scrollByCard = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    const card = container.querySelector<HTMLElement>('[data-event-card]')
    const cardWidth = card?.offsetWidth ?? 480
    const gap = 32

    const atEnd =
      Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 4
    const atStart = container.scrollLeft <= 4

    if (direction === 'right' && atEnd) {
      container.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }
    if (direction === 'left' && atStart) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
      return
    }

    container.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (isPaused || activeEvents.length <= 1) return

    intervalRef.current = setInterval(() => {
      scrollByCard('right')
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, activeEvents.length])

  if (!activeEvents.length) return null

  return (
    <section className="flex flex-col items-center bg-gradient-primary ps-4 sm:ps-10 py-10 sm:py-20">
      <div className="mb-10 flex flex-col items-center text-center">
        {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
        <h2 className="section-title">{data.title}</h2>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex w-full snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {activeEvents.map((event) => (
          <div
            key={event.id}
            data-event-card
            className="w-[95%] shrink-0 snap-start transition duration-500 hover:-translate-y-3 hover:scale-[1.02] sm:w-[70%] lg:w-[50%]"
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex w-full items-center flex-col sm:flex-row justify-center gap-4 sm:justify-between sm:max-w-[80%]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollByCard('left')}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B1B3B6] text-primary transition hover:border-primary"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard('right')}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-orange text-orange transition hover:bg-orange hover:text-white"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <ButtonLink label={data.cta?.label} href={data.cta?.href} />
      </div>
    </section>
  )
}
