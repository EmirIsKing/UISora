import { HtmlElement } from "@/types/types";
import React from 'react';
import parse from 'style-to-object'
import EditableText from "@/components/EditableText";
import camelcaseKeys from 'camelcase-keys';
import NormalRenderer from "@/components/NormalRenderer";
import VoidRenderer from "@/components/VoidRenderer";
import { cleanStyleConflicts } from "@/utils/styleUtils";

const VOID_ELEMENTS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr',
    'img', 'input', 'link', 'meta', 'param',
    'source', 'track', 'wbr'
]);

const handleSave = (data: any) => {

}

export const renderElement = (element: string | HtmlElement, index?: number): React.ReactNode => {
    if (typeof element === 'string') {
        return (<EditableText key={index} text={element} onSave={handleSave}/>)
    }

    const { type, attributes = {}, content = [] } = element;

    // Filter out event handlers and convert HTML attributes to React format
    const processedAttributes: Record<string, any> = {};
    for (const [key, value] of Object.entries(attributes)) {
        // Skip event handlers (onclick, onClick, onchange, etc.)
        if (key.toLowerCase().startsWith('on')) {
            continue;
        }
        // Convert class to className
        if (key === 'class') {
            processedAttributes.className = value;
        } else {
            processedAttributes[key] = value;
        }
    }
    
    if (typeof processedAttributes.style === 'string') {
        const temp = parse(processedAttributes.style);
        const camelCaseStyle = camelcaseKeys(temp as Record<string, unknown>);
        processedAttributes.style = cleanStyleConflicts(camelCaseStyle);
        console.log(processedAttributes.style)
    }

    // Handle void elements (no children allowed)
    if (VOID_ELEMENTS.has(type)) {
        return <VoidRenderer key={index} index={index} processedAttributes={processedAttributes} type={type}/>
    }

    // Handle form elements that need value/defaultValue instead of children
    if (type === 'textarea' || type === 'input' || type === 'select') {
        const elementValue = content.length > 0 ? content[0] : '';
        return React.createElement(
            type,
            {
                key: index,
                ...processedAttributes,
                defaultValue: elementValue
            }
        );
    }

    // Handle style tags - they contain CSS text as content
    if (type === 'style') {
        const cssContent = content.length > 0 && typeof content[0] === 'string' ? content[0] : '';
        return React.createElement(
            type,
            {
                key: index,
                ...processedAttributes
            },
            cssContent
        );
    }

    // Normal elements with children
    return <NormalRenderer content={content} key={index} index={index} processedAttributes={processedAttributes} type={type}/>
};
