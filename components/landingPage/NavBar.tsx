import React from 'react'
import Link from 'next/link'
import SignUp from './SignUp'

const NavBar = () => {


  return (
    <nav className='w-full top-0 z-50 h-14 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-14
    backdrop-blur-sm bg-opacity-90 max-md:px-4'>
        <span>Design Forge</span>
        <div className='flex items-center gap-4'>
            <Link href='#feature'  className={`text-[#6b7280] hover:text-[#543cf3]`}>Features</Link>
            <Link href='#how-it-works' className={`text-[#6b7280] hover:text-[#543cf3]`}>How it works</Link>
            <Link href='#pricing' className={`text-[#6b7280] hover:text-[#543cf3]`}>Pricing</Link>
            <Link href='/sign-in' className={`text-[#6b7280] hover:text-[#543cf3]`}>Sign In</Link>
            <SignUp/>
        </div>
    </nav>
  )
}

export default NavBar