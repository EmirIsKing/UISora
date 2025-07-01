import React, { useEffect, useRef } from 'react';

const VoidRenderer = ({index, processedAttributes, type,}:{index:number|undefined, processedAttributes:{
        class?: string
        style?: string | Record<string, unknown>
        id?: string
    }, type:string}) => {

    return (
        <div>
            {
                React.createElement(
                    type,
                    {
                        key: index,
                        ...processedAttributes,
                        className: processedAttributes.class || processedAttributes.className,
                    },
                )
            }
        </div>
    )
};

export default VoidRenderer;