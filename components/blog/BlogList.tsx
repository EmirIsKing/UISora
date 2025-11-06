import React from 'react'
import BlogItem from './BlogItem'

const BlogList = ({blogData}:{blogData:[]}) => {
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
            return <BlogItem key={index} slug={item.slug} alt='image' image={item.og_image} description={item.excerpt} title={item.title} category={item.tags}/>
        })}
      </div>
    </div>
  )
}

export default BlogList
