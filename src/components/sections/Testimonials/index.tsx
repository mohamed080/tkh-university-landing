'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { TestimonialCard } from './TestimonialCard'
import type { TestimonialsSectionData, TestimonialItem } from './types'
import { ButtonLink } from '@/components/ui/ButtonLink'

type TestimonialsProps = {
  data: TestimonialsSectionData
  testimonials: TestimonialItem[]
}

export function Testimonials({ data, testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeTestimonials = testimonials
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

  const total = activeTestimonials.length

  const goTo = (direction: 'prev' | 'next') => {
    setActiveIndex((current) => {
      if (direction === 'next') return (current + 1) % total
      return (current - 1 + total) % total
    })
  }

  if (!total) return null

  return (
    <section className="flex flex-col items-center bg-gradient-reverse px-4 py-10 sm:ps-10 sm:py-20 overflow-hidden">
      <div className="mb-10 flex flex-col items-center text-center sm:mb-14">
        {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
        <h2 className="section-title">{data.title}</h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-secondary">{data.description}</p>
      </div>

      {/* Stage — arrows overlap sides only from sm: upward */}
      <div className="relative flex w-full items-center justify-center">
        <button
          type="button"
          onClick={() => goTo('prev')}
          aria-label="Previous testimonial"
          className="absolute left-2 z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-[#B1B3B6] bg-white text-primary transition hover:border-primary md:flex md:left-6 lg:left-10"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="relative h-95 w-full max-w-138 overflow-visible sm:h-105 lg:h-130">
          {activeTestimonials.map((testimonial, index) => {
            let offset = index - activeIndex
            if (offset > total / 2) offset -= total
            if (offset < -total / 2) offset -= -total

            if (Math.abs(offset) > 2) return null

            return (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                offset={offset}
                onClick={() => setActiveIndex(index)}
              />
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => goTo('next')}
          aria-label="Next testimonial"
          className="absolute right-2 z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-orange bg-white text-orange transition hover:bg-orange hover:text-white md:flex md:right-6 lg:right-10"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="mt-6 flex w-full items-center flex-col gap-4 sm:flex-row justify-between md:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo('prev')}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B1B3B6] bg-white text-primary"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => goTo('next')}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-orange bg-white text-orange"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        <ButtonLink label={data.cta?.label} href={data.cta?.href} />
      </div>

      <div className="mt-10 hidden md:block">
        <ButtonLink label={data.cta?.label} href={data.cta?.href} />
      </div>
    </section>
  )
}