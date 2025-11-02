import React from 'react'
import Image from 'next/image';

interface LogoProps {
  variant?: "black" | "white" | "gradient" | "auto";
  image?: boolean;
  textHidden?: boolean;
  className?: string;
}

const Logo = ({ variant = "auto", image = true, textHidden = false, className }: LogoProps) => {

  // TEXT STYLES
  const textClass = {
    black: "text-black",
    white: "text-white",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent",
    auto: "text-black dark:text-white" // theme aware
  }[variant];

  // IMAGE SOURCES
  const staticLogoSrc = {
    black: "/uisora-black.png",
    white: "/uisora-white-nobg.png",
    gradient: "/uisora-gradient.png"
  };

  const autoLight = "/uisora-black.png";
  const autoDark = "/uisora-white-nobg.png";

  return (
    <div className="flex justify-center items-center gap-2">
      {image && (
        <>
          {variant !== "auto" && (
            <Image
              width={40}
              height={40}
              src={staticLogoSrc[variant]}
              alt={`UISora ${variant} logo`}
              className={className}
            />
          )}

          {variant === "auto" && (
            <>
              {/* Light mode */}
              <Image
                width={40}
                height={40}
                src={autoLight}
                alt="UISora logo light"
                className={`${className} dark:hidden`}
              />

              {/* Dark mode */}
              <Image
                width={40}
                height={40}
                src={autoDark}
                alt="UISora logo dark"
                className={`${className} hidden dark:block`}
              />
            </>
          )}
        </>
      )}

      {!textHidden && (
        <span className={`max-md:hidden font-bold ${textClass}`}>
          UiSora
        </span>
      )}
    </div>
  )
}

export default Logo
