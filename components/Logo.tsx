import React from 'react'
import Image from 'next/image';

interface logoprops {
    variant: "black" | "white" | "gradient";
    image?: boolean;
}

const Logo = ({variant, image}:logoprops) => {
  return (
    <div className='flex justify-center items-center gap-2'>
        <div>
        {variant === "white" && <Image width={40} height={40} src={'/DesignForgewhitenoBg.png'} alt='white logo Design Forge' className={`${image === false ? "hidden" : ""}`}/> }
        {variant === "black" && <Image width={40} height={40} src={'/DesignForgeBlackNobg.png'} alt='white logo Design Forge' className={`${image === false ? "hidden" : ""}`}/>}
        {variant === "gradient" && <Image width={40} height={40} src={'/DesignForgeNobgGradient.png'} alt='white logo Design Forge' className={`${image === false ? "hidden" : ""}`}/>}
        </div>
        <span className={`max-md:hidden font-bold ${variant !== "gradient" ? "bg-${variant}" : "bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"}`}>UiSora</span>
    </div>
  )
}

export default Logo