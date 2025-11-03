import React from 'react'
import type { Metadata } from 'next'
import Footer from '@/components/landingPage/Footer'
import Logo from '@/components/Logo'
import { SimpleThemeToggle } from '@/components/ThemeToggle'
import { MoveRight } from 'lucide-react'
import { Outfit } from 'next/font/google'
import Link from 'next/link'

const outfit = Outfit({subsets: ['latin'], weight:['400','500','600','700']})

export const metadata: Metadata = {
  title: "Blog – Tips on AI UI design and product",
  description:
    "Learn about AI-assisted UI design, mobile UX patterns, and building products faster.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog – Tips on AI UI design and product",
    description:
      "Learn about AI-assisted UI design, mobile UX patterns, and building products faster.",
    images: [{ url: "/uisora-gradient.png", width: 1200, height: 630 }],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
        <nav className='flex w-full justify-between items-center p-5 backdrop-blur sticky top-0 z-50'>
          <Link href="/"><Logo variant='auto'/></Link>
          <div className='flex justify-center items-center gap-10'>
              <SimpleThemeToggle/>
              <button className='flex gap-2 p-3 border shadow-[-7px_7px_0px_#000] dark:shadow-[-7px_7px_0px_#fff] cursor-pointer hover:scale-[0.98] active:scale-[0.99]'>
                Get Started <MoveRight/>
              </button>
          </div>
        </nav>
      <main className={`${outfit.className}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

