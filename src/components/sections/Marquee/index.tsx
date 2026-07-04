import { MarqueeRow } from './MarqueeRow'
import type { MarqueeData } from './types'

type MarqueeProps = {
  data: MarqueeData
}

export function Marquee({ data }: MarqueeProps) {
  const rows = data.rows ?? []

  if (!rows.length) return null

  return (
    <section className="relative flex flex-col overflow-hidden gap-2 py-10 sm:py-16 bg-gradient-primary">
      {rows.map((row, index) => (
        <MarqueeRow key={row.id ?? index} row={row} index={index} />
      ))}
    </section>
  )
}
