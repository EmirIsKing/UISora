"use client"
import React, { useRef, useEffect, useState } from 'react';
//import {Rnd} from "react-rnd";
import InputBox from "@/components/projectPage/InputBox";
import {X} from 'lucide-react'

type props = {
    children:React.ReactNode;
    screen: { name:string; width: number; height: number; };
    prompt?:string;
    setPrompt?:(e:string)=>void;
    locked?:boolean;
    generating?:boolean;
    handleSubmit?:(e: React.FormEvent<Element>) => void;
    setHideMainInput?:(e:boolean) => void;
    hideNonExport?: boolean;
    hideEdit?:boolean;
}

const Screen =
                ({ children, screen, prompt, setPrompt, locked, generating, handleSubmit,setHideMainInput, hideNonExport , hideEdit}:props) => {
    const screenRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        width: 270,
        height: 500
    });
    const [edit, setEdit] = useState(true);

    useEffect(() => {
        if (screenRef.current) {
            //const children = screenRef.current.children;

            // Apply minimum dimensions
            setDimensions({
                width: screen.width,
                height: screen.height
            });
        }
    }, [children, screen.height, screen.width]);

                    return (

        <div className={`flex flex-col gap-10 max-md:gap-2`}
             onClick={(e)=>{
            e.stopPropagation();
        }}
             onDoubleClick={(e)=>{
                 e.stopPropagation();
             }} >
            <div>
                <span className={'flex justify-between text-white items-center'}>
                    <h4 className={`font-semibold text-4xl dark:text-white text-black ${hideNonExport?"text-black":""}`}>{screen.name}</h4>
                    <button hidden={hideNonExport || hideEdit} onClick={()=> {
                        setEdit(!edit);
                        if (setHideMainInput) {
                            setHideMainInput(edit)
                        }
                    }}
                            className={`bg-black/80 hover:bg-black/30 active:scale-[0.98] cursor-pointer px-3 py-2 rounded-sm ${edit?"":"bg-red-800/80! hover:bg-red-800/50!"}`}>
                        {edit?"Edit":<X/>}
                    </button>
                </span>
            </div>
                <div
                    ref={screenRef}
                    className={`relative rounded-lg bg-[#252525] border border-black dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.5)] shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden transform-gpu`}
                    style={{
                        width: `${dimensions.width}px`,
                        height: `auto`,
                        minHeight: `${dimensions.height}px`,
                    }}

                    onClick={(e)=>{
                        e.stopPropagation();
                    }}
                    onDoubleClick={(e)=>{
                        e.stopPropagation();
                    }}
                >
                    {children}
                </div>
            <div hidden={edit || hideNonExport || hideEdit}>
                <InputBox
                    classname={'p-0 max-md:block! '}
                    styleSelectorHidden={true}  generating={generating || false} handleSubmit={handleSubmit || (() => {})} prompt={prompt || ""} setPrompt={setPrompt || (() => {})} locked={locked || false}/>
            </div>
        </div>
    );
};

export default Screen;