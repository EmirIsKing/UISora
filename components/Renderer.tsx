import React from "react";
import { Rnd } from "react-rnd";
import { cleanStyleConflicts } from "@/utils/styleUtils";

interface Node {
    type: string;
    attributes: { [key: string]: string | undefined };
    children?: Array<Node | string>;
}

interface RendererProps {
    node: Node;
}

// List of self-closing HTML tags that cannot have children
const voidTags = new Set([
    "area", "base", "br", "col", "embed", "hr", "img",
    "input", "link", "meta", "param", "source", "track", "wbr"
]);



function parseStyleString(styleString?: string): React.CSSProperties {
    if (!styleString) return {};
    const parsed = styleString.split(";").reduce((acc, stylePair) => {
        const [key, value] = stylePair.split(":").map(s => s.trim());
        if (key && value) {
            const camelKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
            acc[camelKey] = value;
        }
        return acc;
    }, {} as React.CSSProperties);
    
    return cleanStyleConflicts(parsed);
}

export function Renderer({ node }: RendererProps) {
    const { type, attributes, children = [] } = node;
    const style = parseStyleString(attributes.style);

    // Copy attributes, rename 'class' to 'className', skip event handlers
    const reactAttrs: { [key: string]: any } = {};
    for (const key in attributes) {
        if (key === "class") {
            reactAttrs["className"] = attributes[key];
        } else if (key.toLowerCase().startsWith('on')) {
            // Skip event handlers
            continue;
        } else if (key !== "style") {
            reactAttrs[key] = attributes[key];
        }
    }

    // Parse width/height for default Rnd size fallback
    const width = style.width ? parseInt(style.width.toString()) : 200;
    const height = style.height ? parseInt(style.height.toString()) : 100;

    // For void tags, no children allowed in React.createElement
    const isVoid = voidTags.has(type.toLowerCase());

    // Handle style tags specially - they contain CSS text
    if (type === 'style') {
        const cssContent = children.length > 0 && typeof children[0] === 'string' ? children[0] : '';
        return (
            <Rnd
                bounds="parent"
                default={{
                    x: left,
                    y: top,
                    width,
                    height,
                }}
                style={{ ...style, border: "1px solid #ddd", padding: 8, boxSizing: "border-box" }}
            >
                {React.createElement(type, reactAttrs, cssContent)}
            </Rnd>
        );
    }

    // Recursively render children if not void tag
    const renderedChildren = isVoid
        ? undefined
        : children.map((child, index) =>
            typeof child === "string" ? child : <Renderer key={index} node={child} />
        );

    const top = parseInt(style.top?.toString() || "0");
    const left = parseInt(style.left?.toString() || "0");


    return (
        <Rnd
            bounds="parent"
            default={{
                x: left,
                y: top,
                width,
                height,
            }}
            style={{ ...style, border: "1px solid #ddd", padding: 8, boxSizing: "border-box" }}
        >
            {React.createElement(type, reactAttrs, renderedChildren)}
        </Rnd>
    );
}
