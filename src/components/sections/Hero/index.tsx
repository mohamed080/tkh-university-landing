import { HeroVideo } from './HeroVideo'
import { HeroContent } from './HeroContent'
import type { HeroData } from './types'

type Props = {
  hero: HeroData
}

export function Hero({ hero }: Props) {
  return (
    <section className="relative flex min-h-screen overflow-hidden">
      <HeroVideo video={hero.backgroundVideo} fallback={hero.fallbackImage} />
      <HeroContent hero={hero} />
    </section>
  )
}