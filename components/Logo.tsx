import React from 'react'
import Image from 'next/image';

interface logoprops {
    variant: "black" | "white" | "gradient";
    image?: boolean;
    textHidden?: boolean;
    className?: string;
}

const Logo = ({variant, image, textHidden, className}:logoprops) => {
  return (
    <div className={`flex justify-center items-center gap-2`}>
        <div className={``}>
        {variant === "white" && <Image width={40} height={40} src={'/DesignForgewhitenoBg.png'} alt='white logo Design Forge' className={`${className} ${image === false ? "hidden" : ""}`}/> }
        {variant === "black" && <Image width={40} height={40} src={'/DesignForgeBlackNobg.png'} alt='white logo Design Forge' className={`${className} ${image === false ? "hidden" : ""}`}/>}
        {variant === "gradient" && <Image width={40} height={40} src={'/DesignForgeNobgGradient.png'} alt='white logo Design Forge' className={`${className} ${image === false ? "hidden" : ""}`}/>}
        </div>
        <span className={`max-md:hidden ${textHidden===true?"hidden":""} font-bold ${variant !== "gradient" ? "bg-${variant}" : "bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"}`}>UiSora</span>
    </div>
  )
}

export default Logo