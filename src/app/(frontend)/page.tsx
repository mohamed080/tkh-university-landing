import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { getHeader, getHero } from '@/lib/cms'

export default async function HomePage() {
  const [header, hero] = await Promise.all([getHeader(), getHero()])

  return (
    <>
      <Header data={header} />
      <main>
        <Hero hero={hero} />
      </main>
    </>
  )
}
