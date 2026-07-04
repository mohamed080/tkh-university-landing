'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ExperienceImage } from './ExperienceImage'
import type { ExperienceData } from './types'

type ExperienceProps = {
  data: ExperienceData
}

const AUTOPLAY_DURATION = 5000 // ms per tab

export function Experience({ data }: ExperienceProps) {
  const tabs = data.tabs ?? []
  const [activeIndex, setActiveIndex] = useState(0)
  const [fillHeight, setFillHeight] = useState('0%')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number | null>(null)

  const segment = 100 / tabs.length
  const baseHeight = activeIndex * segment
  const targetHeight = (activeIndex + 1) * segment

  const goToTab = (index: number) => {
    setActiveIndex(index)
  }

  // Animate the continuous fill bar: jump to baseHeight instantly (no transition),
  // then transition up to targetHeight over the autoplay duration.
  useEffect(() => {
    if (!tabs.length) return

    setFillHeight(`${baseHeight}%`)

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setFillHeight(`${targetHeight}%`)
      })
    })

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % tabs.length)
    }, AUTOPLAY_DURATION)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [activeIndex, tabs.length])

  if (!tabs.length) return null

  const activeTab = tabs[activeIndex]

  return (
<section className="grid gap-16 bg-gradient-primary px-4 sm:px-10 py-20 lg:grid-cols-2 lg:px-16 mt-6">
      <div>
        {data.eyebrow && (
          <span className="eyebrow ml-8">
            {data.eyebrow}
          </span>
        )}

        <h2 className="mt-4 text-3xl font-bold leading-tight text-primary lg:text-4xl ml-8">
          {data.title}
        </h2>

        <div className="relative mt-8 pl-8">
          <span className="absolute left-0 top-0 h-full w-1.5 rounded-full bg-[#6A728233]" />

          <span
            className="absolute left-0 top-0 w-1.5 rounded-full transition-[height] ease-linear"
            style={{
              height: fillHeight,
              transitionDuration: `${AUTOPLAY_DURATION}ms`,
              background: 'linear-gradient(270deg, #273480 0%, #E84925 100%)',
            }}

          />

          <ul className="flex flex-col">
            {tabs.map((tab, index) => {
              const isActive = index === activeIndex

              return (
                <li key={tab.id ?? tab.title}>
                  <button
                    type="button"
                    onClick={() => goToTab(index)}
                    className="block w-full py-4 text-left"
                  >
                    <span
                      className={`block text-lg sm:text-2xl font-bold transition-colors ${
                        isActive ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      {tab.title}
                    </span>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-2 max-w-md text-base leading-5 text-secondary">
                          {tab.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}

          </ul>
        </div>
            {data.cta?.label && (
                <Link
                  href={data.cta.href || '#'}
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-base text-white ml-8 mt-6"
                >
                  {data.cta.label}
                  <ArrowUpRight size={18} className="h-6 w-6 rounded-full bg-white p-px text-orange" />
                </Link>
            )}
      </div>

      <ExperienceImage tab={activeTab} />
    </section>
  )
}