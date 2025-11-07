"use client"
import React, {useEffect, useState} from 'react'
import Header from '@/components/blog/Header'
import BlogList from '@/components/blog/BlogList'

async function getBlogs() {
  const res = await fetch(`/api/blog/all`, {
    cache: "no-store", // ensure fresh content
  });
  return res.json();
}

const Page = () => {
  const [blogs, setBlogs] = useState([])

    useEffect(() => {
      const fetchBlogs = async () => {
        const blogs = await getBlogs();
        setBlogs(blogs);
        console.log(blogs)
      };

      fetchBlogs();
    }, []);

    

  return (
    <section className='px-16 max-md:px-4 flex flex-col w-full gap-16'>
      <Header/>
      <BlogList blogData={blogs}/>
    </section>
  )
}

export default Page
