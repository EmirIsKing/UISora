import React from 'react'
import Header from '@/components/blog/Header'
import BlogList from '@/components/blog/BlogList'

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog/all`, {
    cache: "no-store", // ensure fresh content
  });
  return res.json();
}

export default async function Page() {
  const blogs = await getBlogs();

    

  return (
    <section className='px-16 max-md:px-4 flex flex-col w-full gap-16'>
      <Header/>
      <BlogList blogData={blogs}/>
    </section>
  )
}
