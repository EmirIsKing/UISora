import React, { useRef, useEffect, useState } from 'react';

const Screen = ({ children, screen }:{children:React.ReactNode; screen: string}) => {
    const screenRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        width: 270,
        height: 500
    });

    useEffect(() => {
        if (screenRef.current) {
            const children = screenRef.current.children;
            let maxRight = 0;
            let maxBottom = 0;

            // Calculate the farthest points of all children
            Array.from(children).forEach((child: HTMLElement) => {
                const rect = child.getBoundingClientRect();
                const right = rect.right - screenRef.current!.getBoundingClientRect().left;
                const bottom = rect.bottom - screenRef.current!.getBoundingClientRect().top;

                maxRight = Math.max(maxRight, right);
                maxBottom = Math.max(maxBottom, bottom);
            });

            // Apply minimum dimensions
            setDimensions({
                width: Math.max(270, maxRight + 20), // +20 for padding
                height: Math.max(500, maxBottom + 20)
            });
        }
    }, [children]);

    return (
        <div className={'flex flex-col gap-10'} >
            <div>
                <span>
                    <h4 className={'font-semibold'}>{screen}</h4>
                </span>
            </div>
            <div
                ref={screenRef}
                className="relative rounded-lg border-black overflow-hidden border-4"
                style={{
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`,
                    minWidth: '270px',
                    minHeight: '500px'
                }}

            >
                {children}
            </div>
        </div>
    );
};

export default Screen;