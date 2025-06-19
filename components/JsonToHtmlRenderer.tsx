'use client'
import React from 'react';
import { HtmlElement } from "@/types/types";
import parse from 'style-to-object'

interface JsonToHtmlRendererProps {
    data: HtmlElement;
}

// List of void elements that can't have children
const VOID_ELEMENTS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr',
    'img', 'input', 'link', 'meta', 'param',
    'source', 'track', 'wbr'
]);

const JsonToHtmlRenderer: React.FC<JsonToHtmlRendererProps> = ({ data }) => {
    const renderElement = (element: string | HtmlElement, index?: number): React.ReactNode => {
        if (typeof element === 'string') {
            return element;
        }

        const { type, attributes = {}, content = [] } = element;

        // Convert style string to object if needed
        const processedAttributes = { ...attributes };
        if (typeof processedAttributes.style === 'string') {
            processedAttributes.style = parse(processedAttributes.style);
        }

        // Handle void elements (no children allowed)
        if (VOID_ELEMENTS.has(type)) {
            return React.createElement(
                type,
                {
                    key: index,
                    ...processedAttributes,
                    className: processedAttributes.class || processedAttributes.className
                }
                // No children for void elements
            );
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