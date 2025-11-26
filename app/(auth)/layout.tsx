import type { Metadata } from 'next'
import React from 'react'
import ClientAuthGate from "@/components/landingPage/ClientAuthGate";

export const metadata: Metadata = {
  title: 'Account',
  robots: { index: false, follow: false },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <ClientAuthGate>
        {children}
      </ClientAuthGate>

  )
}


