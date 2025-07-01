import React from 'react'
import {HtmlElement} from "@/types/types";
import {renderElement} from "@/components/RenderElement";
import {Rnd} from "react-rnd";

const NormalRenderer = ({index, processedAttributes, type, content}:{index:number|undefined, processedAttributes:{
        class?: string
        style?: string | Record<string, unknown>
        id?: string
    }, content:(string | HtmlElement)[], type:string}) => {
    return (
        <div>
            {
                React.createElement(
                    type,
                    {
                        key: index,
                        ...processedAttributes,
                        className: processedAttributes.class || processedAttributes.className
                    },
                    content.map((child, i) => renderElement(child, i))
                )
            }
        </div>
    )
};

export default NormalRenderer
