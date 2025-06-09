import React, { useRef, useEffect, useState } from 'react';
import {Rnd} from "react-rnd";


const Screen = ({ children, screen }:{children:React.ReactNode; screen: { name:string; width: number; height: number; }}) => {
    const screenRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        width: 270,
        height: 500
    });

    useEffect(() => {
        if (screenRef.current) {
            const children = screenRef.current.children;

            // Apply minimum dimensions
            setDimensions({
                width: screen.width,
                height: screen.height
            });
        }
    }, [children]);

    return (

        <div className={'flex flex-col gap-10'} >
            <div>
                <span>
                    <h4 className={'font-semibold'}>{screen.name}</h4>
                </span>
            </div>
            <div
                ref={screenRef}
                className="relative rounded-lg border-black overflow-hidden border-4"
                style={{
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`,
                }}

            >
                {children}
            </div>
        </div>
    );
};

export default Screen;