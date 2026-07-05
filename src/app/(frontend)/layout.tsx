import React from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { getSEO } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

import './styles.css'

const futura = localFont({
  src: '../../assets/fonts/Futura-Medium.ttf',
  variable: '--font-futura',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO()

  const ogImage = getMediaUrl(seo.ogImage)

  return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    title: seo.title,
    description: seo.description,

    openGraph: {
      title: seo.title,
      description: seo.description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },

    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${futura.variable}`}>
      <body>{children}</body>
    </html>
  )
}
