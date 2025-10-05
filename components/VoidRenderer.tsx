import React, { useEffect, useRef } from 'react';

const VoidRenderer = ({index, processedAttributes, type,}:{index:number|undefined, processedAttributes:Record<string, any>, type:string}) => {

    return (
        <div>
            {
                React.createElement(
                    type,
                    {
                        key: index,
                        ...processedAttributes,
                    },
                )
            }
        </div>
    )
};

export default VoidRenderer;