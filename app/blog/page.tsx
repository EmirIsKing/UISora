"use client"
import React from 'react'
import Header from '@/components/blog/Header'
import BlogList from '@/components/blog/BlogList'

const Page = () => {
  return (
    <section className='px-16 flex flex-col w-full gap-16'>
      <Header/>
      <BlogList/>
    </section>
  )
}

export default Page
