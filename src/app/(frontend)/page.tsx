import { Events } from '@/components/sections/Events/import type { EventsSection as EventsSectionType, Event } from \'@'
import { Experience } from '@/components/sections/Experience'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Majors } from '@/components/sections/Majors'
import { Marquee } from '@/components/sections/Marquee'
import { Partners } from '@/components/sections/Partners'
import {
  getEvents,
  getEventsSection,
  getExperience,
  getHeader,
  getHero,
  getMajors,
  getMajorsSection,
  getMarquee,
  getPartners,
  getPartnersSection,
} from '@/lib/cms'

export default async function HomePage() {
  const [header, hero, experience, partnersSection, partners, marquee, majorsSection, majors, eventsSection, events] = await Promise.all([
    getHeader(),
    getHero(),
    getExperience(),
    getPartnersSection(),
    getPartners(),
    getMarquee(),
    getMajorsSection(),
    getMajors(),
    getEventsSection(),
    getEvents(),
  ])

  return (
    <>
      <Header data={header} />
      <main>
        <Hero hero={hero} />
        <Experience data={experience} />
        <Partners data={partnersSection} partners={partners} />
        <Marquee data={marquee} />
        <Majors data={majorsSection} majors={majors} />
        <Events data={eventsSection} events={events} />
      </main>
    </>
  )
}
