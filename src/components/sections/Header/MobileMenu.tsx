'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import type { HeaderData, MainNavigationItem } from './types'

type MobileMenuProps = {
  items?: MainNavigationItem[] | null
  primaryCTA?: HeaderData['primaryCTA']
  onNavigate?: () => void
}

export function MobileMenu({ items, primaryCTA, onNavigate }: MobileMenuProps) {
  const [openLabel, setOpenLabel] = useState<string | null>(null)

  if (!items?.length) return null

  const toggleAccordion = (label: string) => {
    setOpenLabel((current) => (current === label ? null : label))
  }

  return (
    <div className="flex flex-col border-t border-[#B1B3B6] px-6 py-6">
      <ul className="flex flex-col divide-y divide-[#EAECEE]">
        {items.map((item) => {
          const hasMegaMenu =
            Boolean(item.megaMenu?.cards?.length) ||
            Boolean(item.megaMenu?.links?.length) ||
            Boolean(item.megaMenu?.previewImage) ||
            Boolean(item.megaMenu?.previewImages?.length)

          const isOpen = openLabel === item.label

          if (!hasMegaMenu) {
            return (
              <li key={`${item.label}-${item.href}`}>
                <Link
                  href={item.href || '#'}
                  onClick={onNavigate}
                  className="flex items-center justify-between py-4 text-base font-medium text-primary"
                >
                  {item.label}
                </Link>
              </li>
            )
          }

          return (
            <li key={`${item.label}-${item.href}`}>
              <button
                type="button"
                onClick={() => toggleAccordion(item.label)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-4 text-base font-medium text-primary"
              >
                {item.label}
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-1 pb-4 ps-4">
                    {item.megaMenu?.cards?.map((card) => (
                      <Link
                        key={`${card.title}-${card.href}`}
                        href={card.href || '#'}
                        onClick={onNavigate}
                        className="flex items-center justify-between gap-3 rounded-2xl px-3 py-3 text-sm text-primary transition hover:bg-[#EFF1F4B2]"
                      >
                        {card.title}
                        <ArrowUpRight size={16} className="shrink-0" />
                      </Link>
                    ))}

                    {item.megaMenu?.links?.map((link) => (
                      <Link
                        key={`${link.label}-${link.href}`}
                        href={link.href || '#'}
                        onClick={onNavigate}
                        className="flex items-center justify-between gap-3 rounded-2xl px-3 py-3 text-sm text-secondary transition hover:bg-[#EFF1F4B2]"
                      >
                        {link.label}
                        <ArrowUpRight size={16} className="shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {primaryCTA?.label && (
        <Link
          href={primaryCTA.href || '#'}
          onClick={onNavigate}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-base text-white"
        >
          {primaryCTA.label}
          <ArrowUpRight size={18} className="h-6 w-6 rounded-full bg-white p-px text-orange" />
        </Link>
      )}
    </div>
  )
}