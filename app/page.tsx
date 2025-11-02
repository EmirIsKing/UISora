"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import NavBar from '@/components/landingPage/NavBar'
import {HeroShowcase} from '@/components/landingPage/NewHero'
import ProblemSolution from '@/components/landingPage/ProblemSolution'
import Features from '@/components/landingPage/Features'
import Lenis from "lenis"
import HowItWorks from '@/components/landingPage/HowItWorks'
import SocialProof from '@/components/landingPage/SocialProof'
import Pricing from '@/components/landingPage/Pricing'
import Examples from '@/components/landingPage/Examples'
import FAQ from '@/components/landingPage/FAQ'
import Footer from '@/components/landingPage/Footer'
import ScrollToHash from '@/components/ScrollToHash'

const Page = () => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) {
           router.push('/dashboard/projects');
        }
    }, [user, loading, router]);

    useEffect(() => {
      const lenis = new Lenis();
      
      // Expose Lenis instance globally for navbar access
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis = lenis;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function raf(time: any) {
        lenis.raf(time);
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
      
      // Cleanup
      return () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).lenis;
        lenis.destroy();
      }
    }, [])
    

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return null; // Will redirect to dashboard
    }

    return (
        <div className="min-h-screen max-md:overflow-x-hidden">
        <NavBar/>
        <HeroShowcase/>
        <ScrollToHash/>
        <ProblemSolution/>
        <Features/>
        <HowItWorks/>
        <SocialProof/>
        <Pricing/>
        <Examples/>
        <FAQ/>
        <Footer/>
        </div>
    );
}

export default Page
