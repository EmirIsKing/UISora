import type { Metadata } from 'next'
import React from 'react'

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const titleBase = params.slug?.toString().replace(/-/g, ' ')
  const formattedTitle = titleBase
    ? `${titleBase.charAt(0).toUpperCase()}${titleBase.slice(1)} – UISora Blog`
    : 'Blog Post – UISora'
  const description = 'Insights on AI-assisted UI design, mobile UX, and product building.'
  return {
    title: formattedTitle,
    description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: formattedTitle,
      description,
      images: [{ url: '/uisora-gradient.png', width: 1200, height: 630 }],
      type: 'article',
    },
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}


