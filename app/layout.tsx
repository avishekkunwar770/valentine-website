import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'

import './globals.css'

const _playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const _lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export const metadata: Metadata = {
  title: 'My Valentine',
  description: 'A special Valentine surprise just for you',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  )
}
