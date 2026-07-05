'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import type { MainNavigationItem } from './types'

type MainNavigationProps = {
  items?: MainNavigationItem[] | null
  activeItem: MainNavigationItem | null
  onToggle: (item: MainNavigationItem) => void
}

export function MainNavigation({ items, activeItem, onToggle }: MainNavigationProps) {
  if (!items?.length) return null

  return (
    <nav className="hidden xl:block" aria-label="Main navigation">
      <ul className="flex items-center gap-7">
        {items.map((item) => {

          const hasMegaMenu =
            Boolean(item.megaMenu?.cards?.length) ||
            Boolean(item.megaMenu?.links?.length) ||
            Boolean(item.megaMenu?.previewImage) ||
            Boolean(item.megaMenu?.previewImages?.length)

          const isOpen = activeItem?.label === item.label

          if (hasMegaMenu) {
            return (
              <li key={`${item.label}-${item.href}`}>
                <button
                  type="button"
                  onClick={() => onToggle(item)}
                  aria-expanded={isOpen}
                  className={`inline-flex items-center gap-1 text-base transition cursor-pointer ${
                    isOpen ? 'text-orange' : 'text-primary hover:text-orange'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </li>
            )
          }

          return (
            <li key={`${item.label}-${item.href}`}>
              <Link
                href={item.href || '#'}
                className="inline-flex items-center gap-1 text-base text-primary transition hover:text-orange"
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}