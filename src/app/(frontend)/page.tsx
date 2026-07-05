import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Experience } from '@/components/sections/Experience'
import { Partners } from '@/components/sections/Partners'
import { Marquee } from '@/components/sections/Marquee'
import { Admissions } from '@/components/sections/Admission'
import { Majors } from '@/components/sections/Majors'
import { Events } from '@/components/sections/Events'
import { Testimonials } from '@/components/sections/Testimonials'
import { News } from '@/components/sections/News'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

import {
  getAdmissions,
  getContact,
  getEvents,
  getEventsSection,
  getExperience,
  getFooter,
  getHeader,
  getHero,
  getMajors,
  getMajorsSection,
  getMarquee,
  getNews,
  getNewsSection,
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
    newsSection,
    news,
    contact,
    footer
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
    getNewsSection(),
    getNews(),
    getContact(),
    getFooter(),
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
        <News data={newsSection} news={news} />
        <Contact data={contact} />
        <Footer data={footer} />
      </main>
    </>
  )
}
