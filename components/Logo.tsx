import React from 'react'
import Image from 'next/image';

interface logoprops {
    variant: "black" | "white" | "gradient";
}

const Logo = ({variant}:logoprops) => {
  return (
    <div className='flex justify-center items-center gap-2'>
        <div>
        {variant === "white" && <Image width={50} height={50} src={'/DesignForgewhitenoBg.png'} alt='white logo Design Forge'/> }
        {variant === "black" && <Image width={50} height={50} src={'/DesignForgeBlackNobg.png'} alt='white logo Design Forge'/>}
        {variant === "gradient" && <Image width={50} height={50} src={'/DesignForgeNobgGradient.png'} alt='white logo Design Forge'/>}
        </div>
        <span className={`max-md:hidden font-bold ${variant !== "gradient" ? "bg-${variant}" : "bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"}`}>DesignForge</span>
    </div>
  )
}

export default Logo