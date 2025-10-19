import React from "react";
import Image from "next/image";

const HeroExampleCards = ({image}:{image:string}) => {
  return (
    <div className="min-w-[240px] h-[200px] flex items-center bg-white px-1 justify-center rounded-xl border border-border bg-card shadow-lg text-lg font-semibold">
      <Image src={image} alt={image} width={240} height={200} className="object-cover"/>
    </div>
  );
};

export default HeroExampleCards;
