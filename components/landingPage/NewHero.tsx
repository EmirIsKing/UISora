import Image from "next/image"
import { Star } from "lucide-react"
import SignUp from "./SignUp"
import WatchDemo from "./WatchDemo"
import Marquee from "./Marquee"
import ProductHuntBadge from "@/components/ProductHuntBadge";

interface HeroShowcaseProps {
  heading?: string
  description?: string
}

export function HeroShowcase({}: HeroShowcaseProps) {
  return (
    <main className="relative max-md:pt-4 bg-gradient-to-b from-background to-background/50" id="Hero">
      <div className='absolute inset-0'>
        <div className='absolute w-[50px] h-[50px] top-[285px] left-[124px] rounded-full bg-[#543CF3] opacity-[9%]'></div>
        <div className='absolute w-[100px] h-[100px] top-[120px] left-[184px] rounded-full bg-[#543CF3] opacity-[12%]'></div>
        <div className='absolute w-20 h-20 top-[180px] left-[1122px] rounded-full bg-[#543CF3] opacity-[15%]'></div>
        <div className='absolute w-20 h-20 top-[350px] left-[1008px] rounded-full bg-[#543CF3] opacity-[15%]'></div>
      </div>

      <section className="relative overflow-visible max-md:justify-center">
        {/* Background image for mobile */}
        {/* <div className="absolute top-[-50px] left-0 w-full h-full z-0 pointer-events-none lg:hidden flex items-center justify-center">
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
        </div> */}

        <div className="mx-auto flex text-center max-w-5xl z-20 max-md:py-2 items-center gap-10 px-6 py-10 lg:grid-cols-2 lg:gap-20">
          <div className="mx-auto flex flex-col items-center justify-center text-center md:ml-auto lg:max-w-3xl order-2 lg:order-1">
            <h1 className="my-6 flex text-4xl text-center font-bold text-pretty animate-in fade-in duration-1000 ease-out slide-in-from-bottom lg:text-6xl xl:text-7xl">
              Build beautiful Mobile UIs, effortlessly.
            </h1>

            <p className="text-foreground/70 mb-8 max-w-xl lg:text-xl motion-opacity-in-0 motion-duration-800 motion-delay-700">
              Transform Text to UI with an Advanced AI Mobile UI Generator
            </p>

            {/* <div className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((starNumber) => (
                  <Star
                    key={`star-${starNumber}`}
                    className="size-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div> */}

            <div className="flex w-full flex-col justify-center items-center gap-2 sm:flex-row max-md:gap-4">
              <SignUp />
              <WatchDemo />
              <ProductHuntBadge/>
            </div>
          </div>

          {/* <div className="hidden lg:flex sm:static sm:z-auto order-1 lg:order-2">
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
          </div> */}
        </div>

        {/* Mobile */}
        <div className="sm:hidden">
          <Marquee />
        </div>

        {/* Desktop */}
        <div className="hidden sm:flex items-center justify-center gap-4 px-6 pb-12">
          <Marquee />
        </div>
      </section>
    </main>
  )
}
