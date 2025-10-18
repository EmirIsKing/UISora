import React from 'react'
import { AuroraBackground } from '../ui/shadcn-io/aurora-background'

const SocialProof = () => {
  return (
    <section className='' id='socialproof'>
        <AuroraBackground>
            <div className='mx-auto max-w-5xl z-20 max-md:py-2 max-md:pb-8 items-center gap-5 px-6 py-6 flex flex-col'>
                <div className='flex justify-center items-center text-center'>
                    <span className='text-3xl max-md:text-2xl'>Trusted by designers and teams building apps</span>
                </div>
                <div className="flex flex-wrap gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
                    <div>
                        <div className="text-2xl font-bold text-foreground">10,000+</div>
                        <div>UIs Generated</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-foreground">5,000+</div>
                        <div>Happy Developers</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-foreground">99.9%</div>
                        <div>Uptime</div>
                    </div>
                </div>
            </div>
        </AuroraBackground>
        
    </section>
  )
}

export default SocialProof