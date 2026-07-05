import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { HeroData } from './types'

type Props = {
  primary: HeroData['primaryCTA']
  secondary: HeroData['secondaryCTA']
}

export function HeroActions({ primary, secondary }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href={primary?.href || '#'}
        className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-orange transition hover:opacity-90"
      >
        {primary?.label}
        <ArrowUpRight size={18} className="bg-orange text-white w-7 h-7 p-0.5 rounded-full" />
      </Link>

      <Link
        href={secondary?.href || '#'}
        className="rounded-full border border-white px-7 py-3 text-white transition hover:bg-white hover:text-primary"
      >
        {secondary?.label}
      </Link>
    </div>
  )
}