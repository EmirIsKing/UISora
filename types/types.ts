// types.ts
import {CSSProperties} from "react";
import React from 'react';

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
    } | string;
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
