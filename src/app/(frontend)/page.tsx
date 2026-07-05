import { Admissions } from '@/components/sections/Admission'
import { Events } from '@/components/sections/Events'
import { Experience } from '@/components/sections/Experience'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Majors } from '@/components/sections/Majors'
import { Marquee } from '@/components/sections/Marquee'
import { Partners } from '@/components/sections/Partners'
import { Testimonials } from '@/components/sections/Testimonials'
import {
  getAdmissions,
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
  getTestimonials,
  getTestimonialsSection,
} from '@/lib/cms'

export default async function HomePage() {
  const [
    header,
    hero,
    experience,
    partnersSection,
    partners,
    marquee,
    majorsSection,
    majors,
    eventsSection,
    events,
    testimonialsSection,
    testimonials,
    admissions,
  ] = await Promise.all([
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
    getTestimonialsSection(),
    getTestimonials(),
    getAdmissions(),
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
        <Testimonials data={testimonialsSection} testimonials={testimonials} />
        <Admissions data={admissions} />
      </main>
    </>
  )
}
