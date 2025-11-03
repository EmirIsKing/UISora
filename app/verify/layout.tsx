import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Verify email – UISora',
  robots: { index: false, follow: false },
}

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children
}


