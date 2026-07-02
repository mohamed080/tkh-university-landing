import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Partners } from './collections/Partners'
import { Majors } from './collections/Majors'
import { Events } from './collections/Events'
import { Testimonials } from './collections/Testimonials'
import { News } from './collections/News'

import { Header } from './globals/Header'
import { Hero } from './globals/Hero'
import { Experience } from './globals/Experience'
import { PartnersSection } from './globals/Partners'
import { Marquee } from './globals/Marquee'
import { MajorsSection } from './globals/Majors'
import { EventsSection } from './globals/Events'
import { TestimonialsSection } from './globals/Testimonials'
import { Admissions } from './globals/Admission'
import { NewsSection } from './globals/News'
import { Contact } from './globals/Contact'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Partners, Majors, Events, Testimonials, News],
  globals: [Header, Hero, Experience, PartnersSection, Marquee, MajorsSection, EventsSection, TestimonialsSection, Admissions, NewsSection, Contact, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
