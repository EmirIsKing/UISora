"use client"

import Image from "next/image"
import { ArrowDownRight, Star } from "lucide-react"
import { motion } from "motion/react"
import SignUp from "./SignUp"
import WatchDemo from "./WatchDemo"
import { Button } from "../ui/button"
import { AnimatedGroup } from "./animated-group"
import { AnimatedText } from "./animated-text"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Caroussel from "./Carousel"
import HeroExampleCards from "./HeroExampleCards"


interface HeroShowcaseProps {
  heading?: string
  description?: string
  buttons?: {
    primary?: {
      text: string
      url: string
    }
    secondary?: {
      text: string
      url: string
    }
  }
  reviews?: {
    count: number
    avatars: {
      src: string
      alt: string
    }[]
    rating?: number
  }
}

export function HeroShowcase({
  heading = "Build beautiful Mobile UIs, effortlessly.",
  description = "Describe your app vision, and watch our AI create stunning, mobile interfaces in seconds",

}: HeroShowcaseProps) {
  return (
    <>
      <main className="relative max-md:pt-4 bg-gradient-to-b from-white to-[#CACAF2]">
        <AnimatedGroup>
        <div className='absolute inset-0'>
            <div className='absolute w-[50px] h-[50px]  top-[285px] left-[124px] rounded-full bg-[#543CF3] opacity-[9%]'></div>
            <div className='absolute w-[100px] h-[100px] top-[120px] left-[184px] rounded-full bg-[#543CF3] opacity-[12%]'></div>
            <div className='absolute w-20 h-20 top-[180px] left-[1122px] rounded-full bg-[#543CF3]  opacity-[15%]'></div>
            <div className='absolute w-20 h-20 top-[350px] left-[1008px] rounded-full bg-[#543CF3]  opacity-[15%]'></div>
        </div>
        </AnimatedGroup>
        <motion.section
          className="from-background to-muted relative overflow-visible max-md:justify-center"
          initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ type: "spring", bounce: 0.32, duration: 0.9 }}
        >
          {/* Background image layer behind text/buttons on all devices except PCs (lg and up) */}
          <div className="absolute top-[-50px] left-0 w-full h-full z-0 pointer-events-none lg:hidden flex items-center justify-center">
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-6">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-[#543CF3]/20 to-transparent blur-2xl"></div>
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="https://res.cloudinary.com/dyzxnud9z/image/upload/v1757401349/smoothui/hero-example_xertaz.png"
                  alt="app screen background"
                  width={1580}
                  height={1542}
                  className="w-full h-auto object-cover opacity-70"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl z-20 max-md:py-2 items-center gap-10 px-6 py-10 lg:grid-cols-2 lg:gap-20">
            <AnimatedGroup
              preset="blur-slide"
              className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left order-2 lg:order-1"
            >
              <AnimatedText
                as="h1"
                className="my-6 text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl"
              >
                {heading}
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-foreground/70 mb-8 max-w-xl lg:text-xl"
                delay={0.12}
              >
                {description}
              </AnimatedText>
              <AnimatedGroup
                preset="slide"
                className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row"
              >

                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starNumber) => (
                      <Star
                        key={`star-${starNumber}`}
                        className="size-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}

                  </div>

                </div>
              </AnimatedGroup>
              <AnimatedGroup
                preset="slide"
                className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"
              >
                <SignUp/>
                <WatchDemo/>
              </AnimatedGroup>
            </AnimatedGroup>
            <div className="hidden lg:flex sm:static sm:z-auto order-1 lg:order-2">
              <div className="relative mx-auto max-w-md md:max-w-lg lg:max-w-xl">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-[#543CF3]/20 to-transparent blur-2xl"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 md:rotate-[-1.5deg] md:hover:rotate-0 transition-transform duration-300">
                  <Image
                    src="https://res.cloudinary.com/dyzxnud9z/image/upload/v1757401349/smoothui/hero-example_xertaz.png"
                    alt="app screen"
                    width={1580}
                    height={1542}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Mobile: show carousel */}
          <div className="sm:hidden">
            <Caroussel/>
          </div>
          {/* Desktop/tablet: show stationary cards */}
          <div className="hidden sm:flex items-center justify-center gap-4 px-6 pb-12">
            <HeroExampleCards image="/ex1.png"/>
            <HeroExampleCards image="/ex2.png"/>
            <HeroExampleCards image="/ex3.png"/>
          </div>
        </motion.section>
      </main>
    </>
  )
}
