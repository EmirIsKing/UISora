'use client'

import React, { useEffect } from 'react';
import { HtmlElement } from "@/types/types";
import parse from 'style-to-object';
import EditableText from "@/components/EditableText";
import camelcaseKeys from 'camelcase-keys';
import VoidRenderer from "@/components/VoidRenderer";
import { cleanStyleConflicts } from "@/utils/styleUtils";

interface JsonToHtmlRendererProps {
  data: HtmlElement;
  setHTMLData?: React.Dispatch<React.SetStateAction<string[]>>;
  HTMLData?: string[];
  screen?: string;
}

// Void HTML elements (self-closing)
const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr',
  'img', 'input', 'link', 'meta', 'param',
  'source', 'track', 'wbr'
]);

//const handleSave = (data: any) => {};

// ✅ Convert JSON → HTML string
const elementToHTML = (element: string | HtmlElement): string => {
  if (typeof element === "string") return element;

  const { type, attributes = {}, content = [] } = element;
  if (!type || type === "#comment") return "";

  const attrString = Object.entries(attributes)
    .map(([k, v]) => (k === "class" ? `class="${v}"` : `${k}="${v}"`))
    .join(" ");

  const openTag = attrString ? `<${type} ${attrString}>` : `<${type}>`;

  // Void tags: <img src="...">
  if (VOID_ELEMENTS.has(type)) return openTag;

  // Normal tags
  return `${openTag}${content.map(elementToHTML).join("")}</${type}>`;
};

const JsonToHtmlRenderer: React.FC<JsonToHtmlRendererProps> = ({ data, setHTMLData, screen = "" }) => {

  // ✅ Save the HTML result ONCE per screen change
  useEffect(() => {
    if (!setHTMLData || !screen || !data) return;

    const htmlString = elementToHTML(data);
    const entry = `${screen} - ${htmlString}`;

    setHTMLData(prev => {
      if (prev.includes(entry)) return prev; // avoid duplicates
      return [...prev, entry];
    });

  }, [data, screen, setHTMLData]);

  // ✅ React Renderer (keeps editable content)
  const renderElement = (element: string | HtmlElement, index?: number): React.ReactNode => {
    if (typeof element === 'string') {
      return (<EditableText key={index} text={element}/>);
    }

    const { type, attributes = {}, content = [] } = element;
    if (!type || type === "#comment") return null;

    const processedAttributes: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(attributes)) {
      if (key.toLowerCase().startsWith('on')) continue; // remove event handlers
      if (key === 'class') processedAttributes.className = value;
      else processedAttributes[key] = value;
    }

    if (typeof processedAttributes.style === 'string') {
      const temp = parse(processedAttributes.style);
      const camelCaseStyle = camelcaseKeys(temp as Record<string, unknown>);
      processedAttributes.style = cleanStyleConflicts(camelCaseStyle);
    }

    // Void element
    if (VOID_ELEMENTS.has(type)) {
      return <VoidRenderer key={index} index={index} processedAttributes={processedAttributes} type={type}/>;
    }

    // Form elements use defaultValue
    if (['textarea', 'input', 'select'].includes(type)) {
      const value = content.length > 0 ? content[0] : '';
      return React.createElement(type, { key: index, ...processedAttributes, defaultValue: value });
    }

    // Style tag (raw CSS)
    if (type === 'style') {
      const cssText = typeof content[0] === 'string' ? content[0] : '';
      return React.createElement(type, { key: index, ...processedAttributes }, cssText);
    }

    // Regular nodes
    return React.createElement(
      type,
      { key: index, ...processedAttributes },
      content.map((child, i) => renderElement(child, i))
    );
  };

  return <>{renderElement(data)}</>;
};

export default JsonToHtmlRenderer;
