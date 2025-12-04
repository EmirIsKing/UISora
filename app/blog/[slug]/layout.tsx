import type { Metadata } from 'next'
import React from 'react'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params

  const titleBase = slug.replace(/-/g, ' ')
  const formattedTitle = `${titleBase.charAt(0).toUpperCase()}${titleBase.slice(1)} – UISora Blog`

  return {
    title: formattedTitle,
    description: `Insights on AI-assisted UI design, mobile UX, and product building. ${titleBase.charAt(0).toUpperCase()}${titleBase.slice(1)}`,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: formattedTitle,
      description: `Insights on AI-assisted UI design, mobile UX, and product building. ${titleBase.charAt(0).toUpperCase()}${titleBase.slice(1)}`,
      images: [{ url: '/uisora-og.png', width: 1200, height: 630 }],
      type: 'article',
    },
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
