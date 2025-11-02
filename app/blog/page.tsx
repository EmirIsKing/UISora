"use client"
import React from 'react'
import Header from '@/components/blog/Header'
import BlogList from '@/components/blog/BlogList'

export const blogData = [
  {
    id:1,
    title: "A detailed something",
    description: "lorem ipsiund odsvre flanr ewoknt",
    image: "/mobile-ui-thread-crafter.png",
    date: Date.now(),
    category:"Ai",
    author: "UISora",
    author_img: "/uisora-black-rounded.png",
    slug: "number-1"
  },
  {
    id:2,
    title: "A detailed something",
    description: "lorem ipsiund odsvre flanr ewoknt",
    image: "/mobile-ui-thread-crafter.png",
    date: Date.now(),
    category:"Ai",
    author: "UISora",
    author_img: "/uisora-black-rounded.png",
    slug: "number-2"
  },
  {
    id:3,
    title: "A detailed something",
    description: "lorem ipsiund odsvre flanr ewoknt",
    image: "/mobile-ui-thread-crafter.png",
    date: Date.now(),
    category:"Ai",
    author: "UISora",
    author_img: "/uisora-black-rounded.png",
    slug: "number-3"
  },
  {
    id:4,
    title: "A detailed something",
    description: "lorem ipsiund odsvre flanr ewoknt",
    image: "/mobile-ui-thread-crafter.png",
    date: Date.now(),
    category:"Ai",
    author: "UISora",
    author_img: "/uisora-black-rounded.png",
    slug: "number-4"
  },
  {
    id:5,
    title: "A detailed something",
    description: "lorem ipsiund odsvre flanr ewoknt",
    image: "/mobile-ui-thread-crafter.png",
    date: Date.now(),
    category:"Ai",
    author: "UISora",
    author_img: "/uisora-black-rounded.png",
    slug: "number-5"
  },
  {
    id:66,
    title: "A detailed something",
    description: "lorem ipsiund odsvre flanr ewoknt",
    image: "/mobile-ui-thread-crafter.png",
    date: Date.now(),
    category:"Ai",
    author: "UISora",
    author_img: "/uisora-black-rounded.png",
    slug: "number-6"
  },
  {
    id:7,
    title: "A detailed something",
    description: "lorem ipsiund odsvre flanr ewoknt",
    image: "/mobile-ui-thread-crafter.png",
    date: Date.now(),
    category:"Ai",
    author: "UISora",
    author_img: "/uisora-black-rounded.png",
    slug: "number-7"
  },
  {
    id:8,
    title: "A detailed something",
    description: "lorem ipsiund odsvre flanr ewoknt",
    image: "/mobile-ui-thread-crafter.png",
    date: Date.now(),
    category:"Ai",
    author: "UISora",
    author_img: "/uisora-black-rounded.png",
    slug: "number-8"
  },

]

const Page = () => {


  

  return (
    <section className='px-16 flex flex-col w-full gap-16'>
      <Header/>
      <BlogList/>
    </section>
  )
}

export default Page
