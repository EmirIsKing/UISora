import React from 'react'
import SignUp from './SignUp'
import WatchDemo from './WatchDemo'
import HeroExampleCards from './HeroExampleCards'

const Hero = () => {
  return (
    <div className='relative px-14 max-md:px-6 pt-12 max-md:pt-8 bg-gradient-to-b from-white to-[#CACAF2] min-h-[750px]'>
        <div className='absolute inset-0'>
            <div className='absolute w-[50px] h-[50px]  top-[285px] left-[124px] rounded-full bg-[#543CF3] opacity-[9%]'></div>
            <div className='absolute w-[100px] h-[100px] top-[120px] left-[184px] rounded-full bg-[#543CF3] opacity-[12%]'></div>
            <div className='absolute w-20 h-20 top-[180px] left-[1122px] rounded-full bg-[#543CF3]  opacity-[15%]'></div>
            <div className='absolute w-20 h-20 top-[350px] left-[1008px] rounded-full bg-[#543CF3]  opacity-[15%]'></div>
        </div>
        <div className='relative w-full h-full flex gap-16 max-md:gap-12 flex-col justify-center items-center'>
            <div className='flex flex-col gap-9 max-md:gap-4'>
                <h3 className='h3 text-center leading-16 max-md:text-left'>Create Beautiful Mobile UIs<br/> with AI in <span className='text-amber-300/90'>Minutes</span></h3>
                <h1 className='h1 !text-[20px] text-wrap text-[#6B7280] text-center'>Describe your app vision, and watch our AI create stunning, mobile interfaces in<br/>
                seconds</h1>
            </div>
            <div className='flex justify-center items-center gap-6'>
                <SignUp/>
                <WatchDemo/>
            </div>
            <div className='flex justify-center items-center gap-5'>
                <HeroExampleCards/>
                <HeroExampleCards/>
                <HeroExampleCards/>
            </div>
        </div>
        
    </div>
  )
}

export default Hero