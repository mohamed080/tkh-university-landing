import React from 'react'
import localFont from 'next/font/local'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const futura = localFont({
  src: '../../assets/fonts/Futura-Medium.ttf',
  variable: '--font-futura',
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${futura.variable}`}>
      <body>{children}</body>
    </html>
  )
}
