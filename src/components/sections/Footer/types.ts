import type { Footer as FooterType } from '@/payload-types'

export type FooterData = FooterType
export type FooterNavGroup = NonNullable<FooterData['navigationGroups']>[number]