import type { Marquee as MarqueeType } from '@/payload-types'

export type MarqueeData = MarqueeType
export type MarqueeRow = NonNullable<MarqueeData['rows']>[number]