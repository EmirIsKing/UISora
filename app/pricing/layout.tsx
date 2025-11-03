import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Pricing – Fair, transparent credits',
  description:
    'Only pay for what you use. Clear credits for UI generation, images, and exports.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing – Fair, transparent credits',
    description:
      'Only pay for what you use. Clear credits for UI generation, images, and exports.',
    images: [{ url: '/uisora-gradient.png', width: 1200, height: 630 }],
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}


