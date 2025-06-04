import { JSDOM } from "jsdom";

export function convertHtmlToOpenDesign(html: string) {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const root = document.body.firstElementChild as HTMLElement;
    if (!root) throw new Error("No valid root element found in HTML");

    function parseElement(element: HTMLElement) {
        const styles = element.style;

        const node: any = {
            type: element.tagName.toLowerCase() === "div" ? "layer" : "text",
            name: element.tagName,
            width: parseFloat(styles.width) || element.clientWidth || 0,
            height: parseFloat(styles.height) || element.clientHeight || 0,
            x: element.offsetLeft,
            y: element.offsetTop,
            fills: [],
            children: [],
        };

        if (styles.backgroundColor && styles.backgroundColor !== "rgba(0, 0, 0, 0)") {
            node.fills.push({ type: "SOLID", color: styles.backgroundColor });
        }

        const backgroundUrl = styles.backgroundImage.match(/url\((['"]?)(.*?)\1\)/);
        if (backgroundUrl) {
            node.fills.push({
                type: "IMAGE",
                url: backgroundUrl[2],
                size: styles.backgroundSize.toUpperCase(),
            });
        }

        if (["p", "h2"].includes(element.tagName.toLowerCase())) {
            node.content = element.textContent || "";
            node.fontSize = parseFloat(styles.fontSize) || 16;
            node.color = styles.color || "#000000";
            node.textAlign = styles.textAlign || "left";
        }

        for (const child of element.children) {
            node.children.push(parseElement(child as HTMLElement));
        }

        return node;
    }

    return {
        type: "document",
        children: [parseElement(root)],
    };
}
