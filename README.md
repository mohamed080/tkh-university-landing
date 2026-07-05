# TKH University Landing Page

A fully CMS-driven university landing page built with **Next.js 16 App Router** and **Payload CMS 3**.

Every landing page section is editable by a non-technical user through the Payload admin panel with no hardcoded frontend content.

Editable CMS sections:

- Header
- Hero
- Experience
- Partners
- Marquee
- Majors
- Events
- Testimonials
- Admissions
- News
- Contact
- Footer
- SEO Metadata

---

## Tech Stack

- **Next.js 16** (App Router, React Server Components)
- **Payload CMS 3** (self-hosted in the same repository)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **MongoDB / MongoDB Atlas**
- **GSAP** (interactive animations)
- **React Hook Form + Zod** (form validation)
- **Next.js Image Optimization**

---

# Setup

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Environment Variables

Create `.env` in the root directory.

Local MongoDB:

```env
DATABASE_URL=mongodb://127.0.0.1:27017/university-landing

PAYLOAD_SECRET=your-long-random-secret

NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

MongoDB Atlas:

```env
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/tkh-university

PAYLOAD_SECRET=your-long-random-secret

NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Environment Variables

| Variable | Usage |
|---|---|
| DATABASE_URL | MongoDB connection used by Payload CMS |
| PAYLOAD_SECRET | Secret used by Payload authentication |
| NEXT_PUBLIC_SERVER_URL | Application base URL |

---

# Seed Database

Populate the CMS:

```bash
npm run seed
```

The seed script creates all required demo content:

- Globals
- Collections
- Media uploads
- SEO metadata

After running the seed command, the landing page works immediately without manually adding CMS data.

Seed includes:

- Header
- Hero
- Experience
- Partners
- Marquee
- Majors
- Events
- Testimonials
- Admissions
- News
- Contact
- Footer
- SEO

---

# Run Development Server

```bash
npm run dev
```

Frontend:

```txt
http://localhost:3000
```

Payload Admin:

```txt
http://localhost:3000/admin
```

---

# Payload Admin Access

1. Run:

```bash
npm run dev
```

2. Open:

```txt
http://localhost:3000/admin
```

3. Payload will show:

```txt
Create your first user
```

Create an email and password.

This account becomes the administrator.

No admin credentials are stored inside the repository.

---

# Editing Content

## Globals

Single-instance page sections:

- Header
- Hero
- Experience
- Partners Section
- Marquee
- Majors Section
- Events Section
- Testimonials Section
- Admissions
- News Section
- Contact
- Footer
- SEO

Editors can update:

- Titles
- Descriptions
- Images
- Videos
- CTA buttons
- Navigation
- SEO

without code changes.

---

## Collections

Repeatable content:

- Partners
- Majors
- Events
- Testimonials
- News

Collections support:

- Independent content management
- Display ordering
- Active/inactive visibility control

---

# Architecture Decisions

## Embedded Payload CMS

Payload runs inside the Next.js application.

Benefits:

- Single deployment
- Shared TypeScript types
- Direct server-side Payload Local API usage
- No extra backend service required

---

## CMS Structure Matches The Design

Each visual section maps directly to a Payload global or collection.

Example:

```txt
Hero UI Component
        |
        ↓
Hero Payload Global
```

This keeps the admin panel understandable for non-technical editors.

---

## Repeatable Content Strategy

Small repeatable content uses Payload arrays:

Examples:

- Navigation links
- Footer links
- CTA groups

Large reusable content uses collections:

Examples:

- Events
- News
- Majors
- Partners

This keeps content scalable and easier to maintain.

---

## Media Management

All images and videos are managed through Payload's Media collection.

No hardcoded image paths are used.

Reusable helpers handle:

- Media URLs
- Alt text
- Empty media states

---

# Rendering & Caching Strategy

The project uses **Static Generation with Incremental Static Regeneration (ISR)**.

The homepage uses:

```ts
export const revalidate = 3600
```

This means:

- Pages are pre-rendered and cached.
- Users receive fast static HTML.
- The page regenerates automatically in the background.
- CMS changes appear without requiring rebuilds or redeployments.
- Stale content does not remain forever.

ISR was selected because this is a marketing landing page where:

- Traffic reads happen frequently.
- Content updates happen occasionally.

This provides strong performance while keeping CMS content fresh.

---

# Performance

Performance decisions:

- React Server Components by default.
- Client Components only for interactive UI.
- Optimized images with `next/image`.
- Local fonts with `next/font`.
- Minimal client-side JavaScript.

Client-side features:

- Mega menu interactions
- Carousels
- Partner card animations
- Contact form

---

# SEO

SEO is controlled from Payload CMS.

The SEO Global manages:

- Meta title
- Meta description
- Open Graph image

Next.js `generateMetadata()` reads SEO content from Payload and generates metadata dynamically.

Editors can update SEO without developer changes.

---

# Animations

Implemented animations:

- Partner section GSAP interactions
- Hover effects
- Carousel autoplay animations
- UI entrance/loading transitions

Animations are separated into client components to keep static sections lightweight.

---

# Deployment

The project is ready for Vercel deployment.

Steps:

1. Create MongoDB Atlas database.
2. Add Vercel environment variables:

```env
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/tkh-production

PAYLOAD_SECRET=production-secret

NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

3. Deploy.

After deployment:

- Open `/admin`
- Create the first admin account
- Manage website content from Payload

---

# Tradeoffs & Future Improvements

## Draft / Live Preview

Currently content is edited after publishing.

Future improvement:

- Enable Payload Draft Mode.
- Connect with Next.js Preview Mode.
- Allow editors to preview unpublished changes.

---

## Internationalization

Current version is single language.

Future improvement:

- Enable Payload localization.
- Add English / Arabic content.
- Add RTL support.

---

## Media Optimization

Future improvements:

- Add Payload custom image sizes.
- Generate optimized video formats.

---

## Testing

Future improvements:

- Component testing.
- CMS integration tests.
- Seed validation tests.

---

# Scripts

| Command | Description |
|---|---|
| npm run dev | Start development |
| npm run build | Create production build |
| npm run start | Start production server |
| npm run seed | Populate Payload CMS |
| npm run generate:types | Generate Payload types |

---

# Production Build

Tested with:

```bash
npm run build
```