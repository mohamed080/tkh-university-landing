import { Experience } from '@/components/sections/Experience'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { Partners } from '@/components/sections/Partners'
import {
  getExperience,
  getHeader,
  getHero,
  getMarquee,
  getPartners,
  getPartnersSection,
} from '@/lib/cms'

export default async function HomePage() {
  const [header, hero, experience, partnersSection, partners, marquee] = await Promise.all([
    getHeader(),
    getHero(),
    getExperience(),
    getPartnersSection(),
    getPartners(),
    getMarquee(),
  ])

  return (
    <>
      <Header data={header} />
      <main>
        <Hero hero={hero} />
        <Experience data={experience} />
        <Partners data={partnersSection} partners={partners} />
        <Marquee data={marquee} />
      </main>
    </>
  )
}
