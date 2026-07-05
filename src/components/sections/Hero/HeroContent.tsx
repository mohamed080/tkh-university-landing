import { HeroActions } from './HeroActions'
import type { HeroData } from './types'

type Props = {
  hero: HeroData
}

export function HeroContent({ hero }: Props) {
  return (
    <div className="absolute inset-0 bottom-15 sm:bottom-10 z-10 mx-auto flex h-full mt-auto items-end px-6 sm:px-10">
      <div className="grid w-full gap-4 sm:gap-8 grid-cols-1 xl:grid-cols-[minmax(0,680px)_minmax(500px,800px)] xl:items-end xl:justify-between xl:gap-15">
        <h1 className="max-w-md lg:max-w-3xl text-5xl font-bold leading-[0.95] text-white md:text-6xl lg:text-7xl">
          {hero.headline}
        </h1>

        <div className="flex flex-col items-start gap-2 xl:justify-self-end">
          {hero.description && <p className="max-w-130 lg:max-w-175 text-lg text-white">{hero.description}</p>}
          <HeroActions primary={hero.primaryCTA} secondary={hero.secondaryCTA} />
        </div>
      </div>
    </div>
  )
}
