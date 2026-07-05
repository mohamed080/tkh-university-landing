import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { HeaderData } from './types'

type HeaderActionsProps = {
  primaryCTA?: HeaderData['primaryCTA']
}

export function HeaderActions({ primaryCTA }: HeaderActionsProps) {
  if (!primaryCTA?.label) return null

  return (
    <div className="hidden xl:flex">
      <Link
          href={primaryCTA.href || '#'}
          className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-base text-white "
        >
          {primaryCTA.label}
          <ArrowUpRight size={18} className="bg-white text-orange w-6 h-6 p-px rounded-full" />
        </Link>
    </div>
  )
}