import Link from 'next/link'
import { Search } from 'lucide-react'
import type { HeaderData, TopNavigationItem } from './types'

type TopNavigationProps = {
  items?: TopNavigationItem[] | null
  searchAction?: HeaderData['searchAction']
  contactLink?: HeaderData['contactLink']
}

export function TopNavigation({ items, searchAction, contactLink }: TopNavigationProps) {
  if (!items?.length) return null

  return (
    <div className="hidden border-b border-[#B1B3B6] lg:block">
      <div className="flex h-12 w-full items-center justify-between px-10 text-base">
        <nav aria-label="Top navigation">
          <ul className="flex items-center gap-7">
            {items.map((item, index) => (
              <li
                key={`${item.label}-${item.href}`}
                className={index === 1 ? 'border-r border-[#B1B3B6] pr-7' : ''}
              >
                <Link
                  href={item.href || '#'}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-8 text-lg">
          {searchAction?.label && (
            <Link href={searchAction.href || '#'} className="flex items-center gap-2">
              <Search size={18} />
              {searchAction.label}
            </Link>
          )}

          {contactLink?.label && (
            <Link href={contactLink.href || '#'}>{contactLink.label}</Link>
          )}
        </div>
      </div>
    </div>
  )
}