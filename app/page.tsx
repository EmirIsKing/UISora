import NavBar from '@/components/landingPage/NavBar'
import { HeroShowcase } from '@/components/landingPage/NewHero'
import ProblemSolution from '@/components/landingPage/ProblemSolution'
import Features from '@/components/landingPage/Features'
import HowItWorks from '@/components/landingPage/HowItWorks'
import SocialProof from '@/components/landingPage/SocialProof'
import Pricing from '@/components/landingPage/Pricing'
import Examples from '@/components/landingPage/Examples'
import FAQ from '@/components/landingPage/FAQ'
import Footer from '@/components/landingPage/Footer'

export default function Page() {
  return (
      <div className="min-h-screen max-md:overflow-x-hidden">
        <NavBar/>
        <HeroShowcase/>
        <ProblemSolution/>
        <Features/>
        <HowItWorks/>
        <SocialProof/>
        <Pricing/>
        <Examples/>
        <FAQ/>
        <Footer/>
      </div>
  )
}
