import React from 'react'
import Image from 'next/image'
import { MoveRight } from 'lucide-react'
import Link from 'next/link';

interface props {
    title:string;
    category: string[];
    image: string;
    description: string;
    alt: string;
    slug: string;
    id?: string;
}

const BlogItem = ({title, category, image, description, alt, slug, id}: props) => {
  return (
    <Link href={`/blog/${slug}`} id={id} className='max-w-[330px] sm:max-w-[300px] bg-white border dark:bg-background hover:shadow-[-7px_7px_0px_#000] dark:hover:shadow-[-7px_7px_0px_#fff]'>
      <Image src={image} alt={alt} className='border-b' width={400} height={400}/>
      <div className='flex px-3'>
        {category.map((item, index)=>{
          return <p key={index} className='ml-2 mt-5 px-1 inline-block bg-black text-white text-sm dark:bg-white dark:text-black'>{item}</p>
        })}
      </div>
      <div className="py-2 px-5 pt-1">
        <h5 className=' text-lg font-medium tracking-tight text-gray-900 dark:text-white/90'>{title}</h5>
        <p className='mb-1 text-sm tracking-tight text-gray-700 dark:text-gray-200/50'>{description}</p>
        <div className='inline-flex items-center font-semibold text-center gap-2'>
        Read more <MoveRight/>
        </div>
      </div>
    </Link>
  )
}

export default BlogItem
