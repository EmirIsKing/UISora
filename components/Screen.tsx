"use client"
import React, { useRef, useEffect, useState } from 'react';
//import {Rnd} from "react-rnd";

const Screen = ({ children, screen }:{children:React.ReactNode; screen: { name:string; width: number; height: number; }}) => {
    const screenRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        width: 270,
        height: 500
    });

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

        <div className={'flex flex-col gap-10'}
             onClick={(e)=>{
            e.stopPropagation();
        }}
             onDoubleClick={(e)=>{
                 e.stopPropagation();
             }} >
            <div>
                <span>
                    <h4 className={'font-semibold text-white'}>{screen.name}</h4>
                </span>
            </div>
                <div
                    ref={screenRef}
                    className={`relative rounded-lg bg-[#252525] border border-black shadow-[5px_5px_0px_0px_rgba(255,255,255,0.5)] overflow-hidden transform-gpu h-auto min-h-[${dimensions.height}px]`}
                    style={{
                        width: `${dimensions.width}px`,
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
        </div>
    );
};

export default Screen;