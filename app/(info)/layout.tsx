import React from 'react'
import Footer from '@/components/landingPage/Footer'

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

