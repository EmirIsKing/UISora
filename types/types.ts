// types.ts
import {CSSProperties} from "react";
import React from 'react';

///new test//

// types/components.ts
export type ComponentStyle = {
    position?: string;
    width?: string | number;
    height?: string | number;
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
    backgroundColor?: string;
    color?: string;
    fontSize?: string | number;
    fontFamily?: string;
    fontWeight?: string | number;
    textAlign?: string;
    margin?: string | number;
    marginTop?: string | number;
    marginBottom?: string | number;
    marginLeft?: string | number;
    marginRight?: string | number;
    padding?: string | number;
    border?: string;
    borderRadius?: string | number;
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    flex?: number | string;
    transform?: string;
    objectFit?: string;
    opacity?: string | number;
    overflowX?: string;
    overflowY?: string;
    boxShadow?: string;
    animation?: string;
    cursor?: string;
    [key: string]: any;
};

export type ComponentBase = {
    id: string;
    type: string;
    style?: ComponentStyle;
};

export type ContainerComponent = ComponentBase & {
    type: 'container';
    children?: Component[];
};

export type TextComponent = ComponentBase & {
    type: 'text';
    content: string;
};

export type ImageComponent = ComponentBase & {
    type: 'image';
    source: string;
    alt?: string;
};

export type ButtonComponent = ComponentBase & {
    type: 'button';
    content: string;
    onClick?: () => void;
};

export type InputComponent = ComponentBase & {
    type: 'input';
    placeholder?: string;
    value?: string;
    secureTextEntry?: boolean;
};

export type Component =
    | ContainerComponent
    | TextComponent
    | ImageComponent
    | ButtonComponent
    | InputComponent;

export type Screen = {
    screen: {
        name: string;
        width: number;
        height: number;
    };
    component: Component[];
};
export interface JsonToHtmlRendererProps {

    ui: {
        screen: {
            height: number;
            width: number;
            name: string;
        },
        component: HtmlElement;
    }[]
}

export interface ProjectSettings {
    projectName: string;
    createdBy?: string; // UID or email
    visibility: 'private' | 'public' | 'unlisted';
    theme?: 'light' | 'dark';
    autosave?: boolean;
    lastOpened?: string; // ISO string or Date
    description?: string;
    tags?: string[];
    framework?: 'react' | 'vue' | 'svelte' | 'none';
    platform?: 'mobile' | 'web' | 'desktop';
}



export interface HtmlElement {
    type: string;
    attributes?: {
        class?: string;
        style?: string | Record<string, unknown>;
        id?: string;
    }
    content?: Array<string | HtmlElement>;
}



interface FigmaColor {
    r: number;
    g: number;
    b: number;
    a?: number;
}

interface FigmaGradientStop {
    position: number;
    color: FigmaColor;
}

interface FigmaFill {
    type: 'SOLID' | 'GRADIENT_LINEAR' | 'IMAGE';
    color?: string;
    gradientTransform?: number[][];
    gradientStops?: FigmaGradientStop[];
    imageHash?: string;
    scaleMode?: 'FILL' | 'FIT';
}



interface FigmaEffect {
    type: 'LAYER_BLUR';
    visible: boolean;
    radius: number;
}

export interface RDEmetadata {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    src?: string;
    source?: string;
    children?: RDEmetadata[];
    type: string;
    placeholder?: string;
    value?: string;
    secureTextEntry?: boolean;
    content?: {
        title?: string;
        subtitle?: string;
    } | string | null;
    style: React.CSSProperties;  // Using React's built-in type
    hoverStyle?: React.CSSProperties;
}

interface FigmaNode {
    type: 'document' | 'layer' | 'text';
    name: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    fills?: FigmaFill[];
    borderRadius?: number;
    effects?: FigmaEffect[];
    children?: FigmaNode[];
    content?: string;
    fontSize?: number;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    lineHeight?: number;
    scrollable?: boolean;
}

export interface htmltype {
    screen: string;
    component: string;
}