import { Experience } from '@/components/sections/Experience'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { getExperience, getHeader, getHero } from '@/lib/cms'

export default async function HomePage() {
  const [header, hero, experience] = await Promise.all([getHeader(), getHero(), getExperience()])

  return (
    <>
      <Header data={header} />
      <main>
        <Hero hero={hero} />
        <Experience data={experience} />
      </main>
    </>
  )
}
