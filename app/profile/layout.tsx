import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Profile – UISora',
  robots: { index: false, follow: false },
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children
}


