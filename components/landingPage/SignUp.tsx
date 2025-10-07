import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const SignUp = () => {



  return (
    <Link href={"/sign-up"}>
        <Button className='bg-[#5301BE] text-white hover:bg-[#3101ce] hover:cursor-pointer hover:scale-[0.98]'>
            <span className='max-md:hidden'>Start Creating Free</span>
            <span  className='hidden max-md:block'>Sign Up</span>
        </Button>
    </Link>
  )
}

export default SignUp