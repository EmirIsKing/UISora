import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Projects – UISora',
  robots: { index: false, follow: false },
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children
}


