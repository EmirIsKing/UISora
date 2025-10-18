import Image from 'next/image'
import React from 'react'

const ProblemSolution = () => {
  return (
    <section className='relative'>
        
        <div className='wavy-background'></div>
        
        <div className='relative z-10 mt-5'>
            <div className='flex justify-center items-center'>
                <span className='h2 text-center text-foreground'>Tired of spending hours on UI design?</span>
            </div>
            <div className='mx-auto grid max-w-5xl z-20 max-md:py-2 max-md:pb-8 items-center gap-10 px-6 py-6 lg:grid-cols-2 lg:gap-20'>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <div className='flex justify-center items-center gap-3'>
                        <span className='h1 text-center text-foreground'>Hours of manual work</span>
                        <Image src={"/passage-time.webp"} alt='passage-time' height={50} width={50}/>
                    </div>
                    <div className="h-[320px] flex justify-center items-center overflow-hidden">
                        <Image
                            src="/wireframe.png"
                            alt="wireframe"
                            width={220}
                            height={420}
                            className="object-contain h-full w-auto"
                        />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <div className='flex justify-center items-center gap-3'>
                        <span className='h1 text-center text-foreground'>Generated Instantly</span>
                        <Image src={"/Green-Check.png"} alt='Green-Check' height={50} width={50}/>
                    </div>
                    <div className="h-[320px] flex justify-center items-center overflow-hidden">
                        <Image
                            src="/completeUi2.jpg"
                            alt="completeUi"
                            width={220}
                            height={420}
                            className="object-contain h-full w-auto"
                        />
                    </div>
                </div>
            </div>    
        </div>
    </section>
  )
}

export default ProblemSolution