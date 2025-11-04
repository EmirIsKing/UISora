"use client"
import React, {useState} from 'react'
import { Button } from '@heroui/button'
import JSZip from "jszip";
import { saveAs } from "file-saver";


const AssetExport = ({assets}:{assets: string[]}) => {

  const [isloading, setIsloading] = useState(false)

  const handleExport = async () => {
    if (!assets || assets.length === 0) return;
    setIsloading(true)

    const zip = new JSZip();
    // @ts-expect-error or undefined
    const urls : string[] = assets.map(str => (str.match(/https?:\/\/[^\s]+/g) || [])[0])
    console.log(urls)

    for (let i = 0; i < assets.length; i++) {
      const url = urls[i];
      const name = `asset${i+1}.jpeg`;

      const response = await fetch(url);
      const blob = await response.blob();
      zip.file(name, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "assets.zip");
    setIsloading(false)
  };


  return (
    <Button onPress={handleExport} className='flex text-black flex-col !px-4 !py-9 items-center justify-center border border-black rounded-md
      cursor-pointer active:opacity-70 hover:shadow-md transition-all duration-300'>
      <span className={`text-sm font-bold text-nowrap ${isloading? "hidden":""}`}>Export Assets</span>
      <span className={`text-sm text-gray-500 ${isloading? "hidden":""}`}>type: Zip</span>
      <span className={`loader ${isloading ? "":"!hidden"}`}></span>
    </Button>
  )
}

export default AssetExport