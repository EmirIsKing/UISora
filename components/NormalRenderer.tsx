import React from 'react'
import {HtmlElement} from "@/types/types";
import {renderElement} from "@/components/RenderElement";
import {Rnd} from "react-rnd";

const NormalRenderer = ({index, processedAttributes, type, content}:{index:number|undefined, processedAttributes:Record<string, any>, content:(string | HtmlElement)[], type:string}) => {
    // Handle form elements that need value/defaultValue instead of children
    if (type === 'textarea' || type === 'input' || type === 'select') {
        const elementValue = content.length > 0 ? content[0] : '';
        return (
            <div>
                {React.createElement(
                    type,
                    {
                        key: index,
                        ...processedAttributes,
                        defaultValue: elementValue
                    }
                )}
            </div>
        );
    }

    return (
        <div>
            {
                React.createElement(
                    type,
                    {
                        key: index,
                        ...processedAttributes,
                    },
                    content.map((child, i) => renderElement(child, i))
                )
            }
        </div>
    )
};

export default NormalRenderer
