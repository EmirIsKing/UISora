'use client'
import React from 'react';
import { HtmlElement } from "@/types/types";
import parse from 'style-to-object'
import EditableText from "@/components/EditableText";
import camelcaseKeys from 'camelcase-keys';
import VoidRenderer from "@/components/VoidRenderer";


interface JsonToHtmlRendererProps {
    data: HtmlElement;
}

// List of void elements that can't have children
const VOID_ELEMENTS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr',
    'img', 'input', 'link', 'meta', 'param',
    'source', 'track', 'wbr'
]);

const handleSave = (data: any) => {

}

const JsonToHtmlRenderer: React.FC<JsonToHtmlRendererProps> = ({ data }) => {
    const renderElement = (element: string | HtmlElement, index?: number): React.ReactNode => {
        if (typeof element === 'string') {
            return (<EditableText key={index} text={element} onSave={handleSave}/>)
        }

        const { type, attributes = {}, content = [] } = element;

        // Convert style string to object if needed
        const processedAttributes = { ...attributes };
        if (typeof processedAttributes.style === 'string') {
            const temp = parse(processedAttributes.style);
            processedAttributes.style = camelcaseKeys(temp as Record<string, unknown>);
            // console.log(processedAttributes.style)
        }

        // Handle void elements (no children allowed)
        if (VOID_ELEMENTS.has(type)) {
            return <VoidRenderer key={index} index={index} processedAttributes={processedAttributes} type={type}/>

        }

        // Normal elements with children
        return React.createElement(
            type,
            {
                key: index,
                ...processedAttributes,
                className: processedAttributes.class || processedAttributes.className
            },
            content.map((child, i) => renderElement(child, i))
        );
    };

    return <>{renderElement(data)}</>;
};

export default JsonToHtmlRenderer;