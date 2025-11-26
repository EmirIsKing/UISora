"use client"
import React,{useState} from 'react'

const Header = () => {
    const [email, setEmail] = useState("")

    const handleSubscribe = async () => {
        await fetch("/api/newsletterSubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
    }

    const handleEmail = (email:string) => {
        setEmail(email);
        console.log(email)
    }


  return (
    <div>
      <div className='w-full p-10 text-center flex flex-col'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Exploring AI-Driven Design</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>A space dedicated to exploring how AI transforms the way we design, build, and think about interfaces. Simple ideas. Clear insights. Real workflows.</p>
      </div>
      <form action="" className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto border shadow-[-7px_7px_0px_#000] dark:shadow-[-7px_7px_0px_#fff]">
        <input type='email' onBlur={(e)=>{handleEmail(e.target.value)}} placeholder='Enter your email' className='pl-4 outline-none'/>
        <button type='button' onClick={handleSubscribe} className='border-l py-4 px-4 sm:px-8 active:bg-gray-600/70 active:text-white cursor-pointer hover:bg-gray-600/20'>Subscribe</button>
      </form>
    </div>
  )
}

export default Header
