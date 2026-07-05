import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { createMedia, createVideoMedia, PHOTO, LOGO, SAMPLE_VIDEO_URL } from './createMedia'
import { resetCollections } from './resetCollections'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Starting seed...\n')

  await resetCollections(payload)

  // ---------- Shared media ----------
  const tkhLogo = await createMedia(payload, LOGO('TKH', 'E84925'), 'The Knowledge Hub logo')
  const coventryLogo = await createMedia(
    payload,
    LOGO('Coventry University'),
    'Coventry University logo',
  )
  const novaLogo = await createMedia(
    payload,
    LOGO('NOVA University', '1E7A4C'),
    'NOVA University logo',
  )

  // ==================================================
  // GLOBALS
  // ==================================================

  console.log('Seeding Header...')
  await payload.updateGlobal({
    slug: 'header',
    data: {
      logo: tkhLogo,
      topNavigation: [
        { label: 'Coventry University', href: '#' },
        { label: 'NOVA University', href: '#' },
        { label: 'Alumni', href: '#' },
        { label: 'News', href: '#' },
        { label: 'Events', href: '#' },
      ],
      searchAction: { label: 'Search', href: '#' },
      contactLink: { label: 'Contact Us', href: '#' },
      primaryCTA: { label: 'Apply Now', href: '#' },
      mainNavigation: [
        {
          label: 'Universities',
          href: '#',
          megaMenu: {
            cards: [
              {
                title: 'Coventry University',
                description: 'Earn a UK degree in Engineering, Computing, Business, or Design.',
                image: coventryLogo,
                href: '#',
              },
              {
                title: 'NOVA University',
                description: 'Pursue world-class European education from top-ranked NOVA Lisbon.',
                image: novaLogo,
                href: '#',
              },
            ],
            links: [
              { label: 'About NOVA University', href: '#' },
              { label: 'Tuition Fees', href: '#' },
              { label: 'Admission Criteria', href: '#' },
              { label: 'Schools and Programs', href: '#' },
            ],
            previewImage: await createMedia(
              payload,
              PHOTO('campus-preview', 800, 600),
              'Campus preview',
            ),
          },
        },
        {
          label: 'Study',
          href: '#',
          megaMenu: {
            links: [
              { label: 'Undergraduate', href: '#' },
              { label: 'Postgraduate', href: '#' },
              { label: 'Continuing Education', href: '#' },
            ],
          },
        },
        {
          label: 'Campus Life',
          href: '#',
          megaMenu: {
            links: [
              { label: 'Student Life', href: '#' },
              { label: 'Services', href: '#' },
              { label: 'Support', href: '#' },
            ],
          },
        },
        {
          label: 'Admissions',
          href: '#',
          megaMenu: {
            links: [
              { label: 'Entry Criteria', href: '#' },
              { label: 'Tuition Fees', href: '#' },
              { label: 'How to Apply', href: '#' },
            ],
          },
        },
        { label: 'International Students', href: '#' },
        {
          label: 'About TKH',
          href: '#',
          megaMenu: {
            links: [
              { label: 'Overview', href: '#' },
              { label: 'Board of Trustees', href: '#' },
              { label: 'TKH Campus', href: '#' },
              { label: 'Work With TKH', href: '#' },
              { label: 'FAQs', href: '#' },
            ],
          },
        },
      ],
    },
  })

  console.log('Seeding Hero...')
  const heroFallback = await createMedia(
    payload,
    PHOTO('hero-fallback', 1600, 900),
    'Hero fallback image',
  )
  const heroVideo = await createVideoMedia(payload, SAMPLE_VIDEO_URL, 'Hero background video')

  await payload.updateGlobal({
    slug: 'hero',
    data: {
      headline: 'Your Gateway To Global Education',
      description:
        'Earn a globally recognized degree from top-ranked partnered universities on our state-of-the-art campus located in Egypt.',
      backgroundVideo: heroVideo,
      fallbackImage: heroFallback,
      primaryCTA: { label: 'Explore Programs', href: '/programs' },
      secondaryCTA: { label: 'Start a Virtual Campus Tour', href: '/virtual-tour' },
    },
  })

  console.log('Seeding Experience...')
  await payload.updateGlobal({
    slug: 'experience',
    data: {
      eyebrow: 'Experience TKH',
      title: 'Experience a World-Class Campus',
      tabs: [
        {
          title: 'State-of-the-Art Campus',
          description: 'Our modern campus is equipped with the latest technology and facilities.',
          image: await createMedia(payload, PHOTO('campus-modern'), 'State-of-the-art campus'),
          statBadge: { label: 'Modern Labs', value: '20+' },
        },
        {
          title: 'World-Class Facilities',
          description:
            'Access industry-standard Academic, Computing, and Engineering labs, alongside our comprehensive library, modern clinics, and dedicated student success spaces.',
          image: await createMedia(payload, PHOTO('facilities'), 'World-class facilities'),
          statBadge: { label: 'Modern Labs', value: '20+' },
        },
        {
          title: 'Sports & Recreation',
          description:
            'Stay active with our sports facilities including courts, gyms, and outdoor spaces.',
          image: await createMedia(payload, PHOTO('sports'), 'Sports and recreation'),
          statBadge: { label: 'Facilities', value: '10+' },
        },
        {
          title: 'Student Clubs & Societies',
          description:
            'Join a vibrant community to lead activities, join societies, and participate in global programs like Student Ambassador.',
          image: await createMedia(payload, PHOTO('clubs'), 'Student clubs and societies'),
          statBadge: { label: 'Clubs', value: '30+' },
        },
      ],
      cta: { label: 'Know More About TKH', href: '/about' },
    },
  })

  console.log('Seeding Partners Section + Partners collection...')
  await payload.updateGlobal({
    slug: 'partnersSection',
    data: {
      eyebrow: 'Partner with Excellence',
      title: "Study with The World's Top Ranked Universities",
      description:
        'TKH partners with prestigious European and UK universities to bring their academic excellence to Egypt.',
    },
  })

  await payload.create({
    collection: 'partners',
    data: {
      name: 'Coventry University',
      logo: coventryLogo,
      coverImage: await createMedia(
        payload,
        PHOTO('coventry-campus'),
        'Coventry University campus',
      ),
      cta: { label: 'Explore Coventry', href: '#' },
      facts: [
        {
          title: '5 stars',
          description: 'Overall Rating & Internationalization QS Stars University Ratings',
        },
        { title: "Queen's Award", description: 'For Interprise International Trade 2022' },
        {
          title: '12th on world',
          description: 'For international outlook The Young University Rankings 2024',
        },
      ],
      displayOrder: 1,
      isActive: true,
    },
  })

  await payload.create({
    collection: 'partners',
    data: {
      name: 'NOVA University',
      logo: novaLogo,
      coverImage: await createMedia(payload, PHOTO('nova-campus'), 'NOVA University campus'),
      cta: { label: 'Explore NOVA', href: '#' },
      facts: [
        {
          title: '5 stars',
          description: 'Overall Rating & Internationalization QS Stars University Ratings',
        },
        { title: "Queen's Award", description: 'For Interprise International Trade 2022' },
        {
          title: '12th on world',
          description: 'For international outlook The Young University Rankings 2024',
        },
      ],
      displayOrder: 2,
      isActive: true,
    },
  })

  console.log('Seeding Marquee...')
  await payload.updateGlobal({
    slug: 'marquee',
    data: {
      rows: [
        { type: 'logo', logo: coventryLogo },
        { type: 'logo', logo: novaLogo },
        { type: 'text', label: 'New Partnerships Soon' },
      ],
    },
  })

  console.log('Seeding Majors Section + Majors collection...')
  await payload.updateGlobal({
    slug: 'majorsSection',
    data: { eyebrow: 'Choose Your Future', title: 'Discover Your Path Across 5 Core Majors' },
  })

  const majorsData = [
    { name: 'Design & Media', count: 7, seed: 'design-media' },
    { name: 'Engineering', count: 9, seed: 'engineering' },
    { name: 'Psychology', count: 3, seed: 'psychology' },
    { name: 'Business', count: 12, seed: 'business' },
    { name: 'Computing', count: 8, seed: 'computing' },
  ]

  for (let i = 0; i < majorsData.length; i += 1) {
    const major = majorsData[i]
    await payload.create({
      collection: 'majors',
      data: {
        name: major.name,
        coverImage: await createMedia(payload, PHOTO(major.seed, 900, 1100), major.name),
        programsCount: major.count,
        displayOrder: i + 1,
        isActive: true,
      },
    })
  }

  console.log('Seeding Events Section + Events collection...')
  await payload.updateGlobal({
    slug: 'eventsSection',
    data: {
      eyebrow: 'Events',
      title: "Don't Miss Our Upcoming Events!",
      cta: { label: 'Explore Our All Events', href: '#' },
    },
  })

  await payload.create({
    collection: 'events',
    data: {
      title: 'NOVA Open Day!',
      description:
        'Join us for an Open Day! Discover opportunities and meet our campus. Explore your future with us!',
      date: '2026-04-25T12:00:00.000Z',
      coverImage: await createMedia(
        payload,
        PHOTO('nova-open-day', 1200, 800),
        'NOVA Open Day event',
      ),
      displayOrder: 1,
      isActive: true,
    },
  })

  await payload.create({
    collection: 'events',
    data: {
      title: 'Cairo Innovation Hub',
      description: 'Visit our Campus! Learn about programs and meet campus.',
      date: '2026-05-10T12:00:00.000Z',
      coverImage: await createMedia(
        payload,
        PHOTO('cairo-hub', 1200, 800),
        'Cairo Innovation Hub event',
      ),
      displayOrder: 2,
      isActive: true,
    },
  })

  console.log('Seeding Testimonials Section + Testimonials collection...')
  await payload.updateGlobal({
    slug: 'testimonialsSection',
    data: {
      eyebrow: 'Build Your Career',
      title: 'Success Career Journeys of Our Graduates',
      description: '98% of our graduates are employed within 6 months of graduation.',
      cta: { label: 'Explore Our Career Services', href: '#' },
    },
  })

  const testimonialsData = [
    {
      studentName: 'Sarah Ahmed',
      currentRole: 'Software Engineer at Vodafone, Egypt',
      quote:
        'During my final year at TKH, the career services team helped me refine my CV, prepare for technical interviews, and connect with industry mentors. Through their guidance, I secured multiple interviews and landed my role shortly after graduation.',
      universityLogo: novaLogo,
      graduationYearText: '2025',
      seed: 'grad-sarah',
    },
    {
      studentName: 'Ali Hassan',
      currentRole: 'Software Engineer at Vodafone, Egypt',
      quote:
        'The career services team helped me prepare for interviews and connect with industry mentors, and I landed my role shortly after graduation.',
      universityLogo: coventryLogo,
      graduationYearText: '2024',
      seed: 'grad-ali',
    },
  ]

  for (let i = 0; i < testimonialsData.length; i += 1) {
    const t = testimonialsData[i]
    await payload.create({
      collection: 'testimonials',
      data: {
        studentName: t.studentName,
        studentAvatar: await createMedia(
          payload,
          PHOTO(`avatar-${t.seed}`, 200, 200),
          `${t.studentName} avatar`,
        ),
        coverImage: await createMedia(
          payload,
          PHOTO(t.seed, 1000, 1000),
          `${t.studentName} graduation photo`,
        ),
        universityLogo: t.universityLogo,
        graduationYear: await createMedia(
          payload,
          LOGO(`${t.graduationYearText} Grad`, 'E84925'),
          `${t.graduationYearText} Grad badge`,
        ),
        currentRole: t.currentRole,
        quote: t.quote,
        displayOrder: i + 1,
        isActive: true,
      },
    })
  }

  console.log('Seeding Admissions...')
  await payload.updateGlobal({
    slug: 'admissions',
    data: {
      eyebrow: 'Take Action',
      title: 'Your Journey Starts Here!',
      description: 'Just a few steps to join TKH campus.',
      cta: { label: 'Apply For 2026 Year', href: '#' },
      steps: [
        { title: 'Apply Online', description: 'Complete our simple online application form' },
        { title: 'Upload Docs', description: 'Upload your academic and identity documents' },
        { title: 'Screening & Interview', description: "You'll be scheduled for an interview" },
        { title: 'Placement Test', description: "You'll be invited to on-campus placement test" },
        { title: 'Acceptance Offer', description: "You'll receive our final acceptance offer" },
      ],
    },
  })

  console.log('Seeding News Section + News collection...')
  await payload.updateGlobal({
    slug: 'newsSection',
    data: {
      eyebrow: 'Stay Updated',
      title: 'Proud News!',
      description:
        'Discover the latest achievements, partnerships, and news shaping the future of education at TKH.',
      cta: { label: 'Explore Our All News', href: '#' },
    },
  })

  const newsData = [
    {
      category: 'NOVA University',
      title: 'Communication University of China (CUC) Delegation Visits TKH',
      date: '2025-12-17T12:00:00.000Z',
      seed: 'news-cuc',
    },
    {
      category: 'Design & Media',
      title:
        'Cultivating Empathy Through Learning: NOVA SBE Students Explore Diversity, Equity & Inclusion',
      date: '2025-12-02T12:00:00.000Z',
      seed: 'news-empathy',
    },
    {
      category: 'School of Continuing Education',
      title:
        'H.E. Prof. Khaled El-Enany, TKH Board Member, Appointed as Director-General of UNESCO',
      date: '2025-10-07T12:00:00.000Z',
      seed: 'news-unesco',
    },
  ]

  for (let i = 0; i < newsData.length; i += 1) {
    const item = newsData[i]
    await payload.create({
      collection: 'news',
      data: {
        category: item.category,
        title: item.title,
        date: item.date,
        coverImage: await createMedia(payload, PHOTO(item.seed, 900, 700), item.title),
        displayOrder: i + 1,
        isActive: true,
      },
    })
  }

  console.log('Seeding Contact...')
  await payload.updateGlobal({
    slug: 'contact',
    data: {
      eyebrow: 'Take Action',
      title: 'Get In Touch!',
      description: 'Have a question on mind? Leave us a message and we will contact you shortly.',
      phonePlaceholder: 'Your Phone Number',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      submitButtonLabel: 'Send Message',
    },
  })

  console.log('Seeding Footer...')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      logo: tkhLogo,
      description:
        'Earn a globally recognized degree from top-ranked partnered universities on our state-of-the-art campus located in Egypt.',
      contact: {
        phone: '19940, +20 123 456 789',
        address: 'New Administrative Capital, Residential Area 7, R7, Cairo Governorate',
        email: 'hello@tkh.edu.eg',
      },
      searchTitle: "Can't find what you're looking for?",
      search: { placeholder: 'Search for programs, fees, university...', buttonLabel: 'Search' },
      cta: { label: 'Apply Now', href: '#' },
      socialLinks: [
        { platform: 'facebook', url: '#' },
        { platform: 'instagram', url: '#' },
        { platform: 'linkedin', url: '#' },
      ],
      navigationGroups: [
        {
          title: 'Universities',
          links: [
            { label: 'Coventry University', href: '#' },
            { label: 'NOVA University', href: '#' },
          ],
        },
        {
          title: 'Study',
          links: [
            { label: 'Undergraduate', href: '#' },
            { label: 'Postgraduate', href: '#' },
            { label: 'Continuing Education', href: '#' },
          ],
        },
        {
          title: 'Campus Life',
          links: [
            { label: 'Student Life', href: '#' },
            { label: 'Services', href: '#' },
            { label: 'Support', href: '#' },
          ],
        },
        {
          title: 'Admissions',
          links: [
            { label: 'Entry Criteria', href: '#' },
            { label: 'Tuition Fees', href: '#' },
            { label: 'How to Apply', href: '#' },
          ],
        },
        {
          title: 'About TKH',
          links: [
            { label: 'Overview', href: '#' },
            { label: 'Board of Trustees', href: '#' },
            { label: 'TKH Campus', href: '#' },
            { label: 'Work With TKH', href: '#' },
            { label: 'FAQs', href: '#' },
          ],
        },
        {
          links: [
            { label: 'International Students', href: '#' },
            { label: 'Policies & Regulations', href: '#' },
            { label: 'Alumni', href: '#' },
            { label: 'News', href: '#' },
            { label: 'Events', href: '#' },
          ],
        },
      ],
      bottomLinks: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
      copyright: '© 2024 TKH - The Knowledge Hub. All rights reserved.',
    },
  })

  console.log('Seeding SEO...')

await payload.updateGlobal({
  slug: 'seo',
  data: {
    title: 'TKH - The Knowledge Hub',
    description:
      'Your gateway to global education through international university partnerships in Egypt.',
    ogImage: heroFallback,
  },
})

  console.log('\n✅ Seed complete.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
