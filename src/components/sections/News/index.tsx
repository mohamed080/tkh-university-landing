'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { NewsCard } from './NewsCard'
import type { NewsSectionData, NewsItem } from './types'

type NewsProps = {
  data: NewsSectionData
  news: NewsItem[]
}

const AUTOPLAY_INTERVAL = 3500

export function News({ data, news }: NewsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const activeNews = news
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

  const scrollByCard = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    const card = container.querySelector<HTMLElement>('[data-news-card]')
    const cardWidth = card?.offsetWidth ?? 320
    const gap = 24

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

  // Autoplay — pauses while hovering the carousel
  useEffect(() => {
    if (isPaused || activeNews.length <= 1) return

    intervalRef.current = setInterval(() => {
      scrollByCard('right')
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, activeNews.length])

  if (!activeNews.length) return null

  return (
    <section className="flex flex-col items-center bg-gradient-reverse py-10 ps-5 md:ps-20">
      <div className="mb-10 flex flex-col items-center px-4 text-center">
        {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
        <h2 className="section-title">{data.title}</h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-secondary">{data.description}</p>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {activeNews.map((item) => (
          <div
            key={item.id}
            data-news-card
            className="w-full shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <NewsCard item={item} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">
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

        {data.cta?.label && <ButtonLink label={data.cta.label} href={data.cta.href} className='sm:me-10'/>}
      </div>
    </section>
  )
}
