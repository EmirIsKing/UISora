import React from 'react';

const VoidRenderer = ({index, processedAttributes, type,}:{index:number|undefined, processedAttributes:Record<string, unknown>, type:string}) => {

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