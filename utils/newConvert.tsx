import { JSDOM } from 'jsdom';

export function htmlToFigma(htmlString: string): FigmaNode {
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;
    const rootElement = document.body.firstElementChild as HTMLElement;

    if (!rootElement) {
        throw new Error('No valid HTML element found');
    }

    return convertElementToFigma(rootElement);
}

function parseColor(colorString: string): FigmaColor {
    // Handle hex color
    if (colorString.startsWith('#')) {
        const hex = colorString.substring(1);
        return {
            r: parseInt(hex.substring(0, 2), 16) / 255,
            g: parseInt(hex.substring(2, 4), 16) / 255,
            b: parseInt(hex.substring(4, 6), 16) / 255,
            a: 1
        };
    }

    // Handle rgba color
    if (colorString.startsWith('rgba')) {
        const matches = colorString.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (matches) {
            return {
                r: parseInt(matches[1]) / 255,
                g: parseInt(matches[2]) / 255,
                b: parseInt(matches[3]) / 255,
                a: parseFloat(matches[4])
            };
        }
    }

    // Handle rgb color
    if (colorString.startsWith('rgb')) {
        const matches = colorString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (matches) {
            return {
                r: parseInt(matches[1]) / 255,
                g: parseInt(matches[2]) / 255,
                b: parseInt(matches[3]) / 255,
                a: 1
            };
        }
    }

    return { r: 0, g: 0, b: 0, a: 1 };
}

function parseStyles(element: HTMLElement): Partial<FigmaNode> {
    const node: Partial<FigmaNode> = {};
    const style = element.getAttribute('style') || '';

    // Parse style string
    const styleMap = new Map<string, string>();
    style.split(';').forEach(rule => {
        const [key, value] = rule.split(':').map(s => s.trim());
        if (key && value) {
            styleMap.set(key, value);
        }
    });

    // Parse dimensions
    const width = parseFloat(styleMap.get('width') || '');
    const height = parseFloat(styleMap.get('height') || '');
    if (!isNaN(width) && !isNaN(height)) {
        node.width = width;
        node.height = height;
    }

    // Parse position
    const x = parseFloat(styleMap.get('left') || '');
    const y = parseFloat(styleMap.get('top') || '');
    if (!isNaN(x) && !isNaN(y)) {
        node.x = x;
        node.y = y;
    }

    // Parse background
    const backgroundColor = styleMap.get('background');
    if (backgroundColor && backgroundColor !== 'transparent') {
        node.fills = [{
            type: 'SOLID',
            color: backgroundColor
        }];
    }

    // Parse border radius
    const borderRadius = parseFloat(styleMap.get('border-radius') || '');
    if (!isNaN(borderRadius)) {
        node.borderRadius = borderRadius;
    }

    // Parse text styles
    if (element.tagName.toLowerCase() === 'text') {
        const fontSize = parseFloat(styleMap.get('font-size') || '');
        if (!isNaN(fontSize)) {
            node.fontSize = fontSize;
        }

        node.color = styleMap.get('color');
        node.textAlign = styleMap.get('text-align') as 'left' | 'center' | 'right';

        const lineHeight = parseFloat(styleMap.get('line-height') || '');
        if (!isNaN(lineHeight)) {
            node.lineHeight = lineHeight;
        }
    }

    return node;
}

function convertElementToFigma(element: HTMLElement): FigmaNode {
    const node: FigmaNode = {
        type: element.tagName.toLowerCase() === 'text' ? 'text' : 'layer',
        name: element.tagName,
        children: []
    };

    // Parse styles
    const styleProps = parseStyles(element);
    Object.assign(node, styleProps);

    // Parse content
    if (element.tagName.toLowerCase() === 'text') {
        node.content = element.textContent || '';
    }

    // Parse children
    Array.from(element.children).forEach(child => {
        if (child instanceof HTMLElement) {
            node.children?.push(convertElementToFigma(child));
        }
    });

    return node;
}