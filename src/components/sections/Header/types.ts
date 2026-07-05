import type { Header as HeaderType, Media } from '@/payload-types'

export type HeaderData = HeaderType

export type MediaItem = Media | string | number | null | undefined

export type MegaMenuData = NonNullable<
  NonNullable<HeaderData['mainNavigation']>[number]['megaMenu']
>

export type MainNavigationItem = NonNullable<HeaderData['mainNavigation']>[number]

export type TopNavigationItem = NonNullable<HeaderData['topNavigation']>[number]