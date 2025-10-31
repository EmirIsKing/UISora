'use client'
import React from 'react';
import { HtmlElement } from "@/types/types";
import parse from 'style-to-object'
import EditableText from "@/components/EditableText";
import camelcaseKeys from 'camelcase-keys';
import VoidRenderer from "@/components/VoidRenderer";
import { cleanStyleConflicts } from "@/utils/styleUtils";

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

        if (!type || type === "#comment") {
            return null;
        }

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
            const parsed = parse(processedAttributes.style) || {};
            const base: Record<string, unknown> = (parsed && typeof parsed === 'object') ? parsed as Record<string, unknown> : {};
            const camelCaseStyle: Record<string, unknown> = camelcaseKeys(base) || {};

            const normalizeVendorKey = (key: string): string => {
                if (key.startsWith('webkit')) return 'Webkit' + key.slice(6);
                if (key.startsWith('moz')) return 'Moz' + key.slice(3);
                if (key.startsWith('ms')) return 'ms' + key.slice(2).replace(/^./, (c) => c.toUpperCase());
                if (key.startsWith('o')) return 'O' + key.slice(1);
                return key;
            };

            const normalizedStyle: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(camelCaseStyle)) {
                normalizedStyle[normalizeVendorKey(k)] = v;
            }

            processedAttributes.style = cleanStyleConflicts(normalizedStyle);
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
        return React.createElement(
            type,
            {
                key: index,
                ...processedAttributes
            },
            content.map((child, i) => renderElement(child, i))
        );
    };

    return <>{renderElement(data)}</>;
};

export default JsonToHtmlRenderer;