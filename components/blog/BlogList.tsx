import React from 'react'
import BlogItem from './BlogItem'
import { blogData } from '@/lib/blogData'

const BlogList = () => {
  return (
    <div>
      {/* <div className='flex justify-center gap-6 my-10'>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div> */}
      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:x-24'>
        {blogData.map((item, index)=>{
            return <BlogItem key={index} slug={item.slug} alt='image' image={item.image} description={item.description} title={item.title} category={item.category}/>
        })}
      </div>
    </div>
  )
}

export default BlogList
