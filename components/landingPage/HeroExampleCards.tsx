import React from "react";
import Image from "next/image";

const HeroExampleCards = ({image}:{image:string}) => {
  return (
    <div className="min-w-[240px] h-[200px] flex items-center p-4 justify-center rounded-xl border border-gray-200 bg-white shadow-lg text-lg font-semibold">
      <Image src={image} alt={image} width={240} height={200}/>
    </div>
  );
};

export default HeroExampleCards;
