import React from 'react';
import BlogItem from './BlogItem';

// Define the type of a single blog item
type Blog = {
  slug: string;
  og_image: string;
  excerpt: string;
  title: string;
  tags: string[]; // or string if tags is a single string
};

const BlogList = ({ blogData }: { blogData: Blog[] }) => {
  return (
    <div>
      {/* <div className='flex justify-center gap-6 my-10'>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div> */}
      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:x-24'>
        {blogData.map((item, index) => (
          <BlogItem
            key={index}
            slug={item.slug}
            alt='image'
            image={item.og_image}
            description={item.excerpt}
            title={item.title}
            category={item.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
