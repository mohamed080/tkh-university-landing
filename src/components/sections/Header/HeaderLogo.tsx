import Image from 'next/image'
import Link from 'next/link'
import type { MediaItem } from './types'

type HeaderLogoProps = {
  logo: MediaItem
}

export function HeaderLogo({ logo }: HeaderLogoProps) {
  if (!logo || typeof logo === 'number') return null

  const src = typeof logo === 'string' ? logo : logo.url
  const alt = typeof logo === 'string' ? 'The Knowledge Hub Universities logo' : logo.alt

  if (!src) return null

  return (
    <Link href="#" aria-label="The Knowledge Hub home" className="block">
      <Image
        src={src}
        alt={alt || 'The Knowledge Hub Universities logo'}
        width={240}
        height={70}
        priority
        className="h-auto w-35 lg:w-60"
      />
    </Link>
  )
}