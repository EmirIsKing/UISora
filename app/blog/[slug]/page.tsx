"use client"
import React,{useEffect, useState} from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MoveLeft } from 'lucide-react'

const Page = () => {

  const {slug} = useParams()
  
  
  const [data, setData] = useState()


  const fetchBlogData = () => {
    setData("")
  }

  useEffect(() => {
    fetchBlogData()
  }, [])
  


  return (
    <div className='text-center my-10'>
      <div className='flex justify-between items-center mx-20 mb-12'>
        <Link href={'/blog'} className='flex justify-center items-center gap-2'><MoveLeft/>Home</Link>
      </div>
      <div className=''>
        <h2 className='text-2xl mx-auto sm:text-5xl font-semibold max-w-[700px]'>The title here {slug + data}</h2>
      </div>

    </div>
  )
}

export default Page
