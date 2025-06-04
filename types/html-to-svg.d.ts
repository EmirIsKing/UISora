declare module '@tooooools/html-to-svg' {
    interface HtmlToSvgOptions {
        scale?: number
        width?: number
        height?: number
        backgroundColor?: string
        fonts?: {
            loadSystemFonts?: boolean
            googleFonts?: boolean
            fontMappings?: Array<{ from: string; to: string }>
        }
        imageTimeout?: number
        ignoreElements?: (element: Element) => boolean
    }

    export function htmlToSvg(
        element: HTMLElement,
        options?: HtmlToSvgOptions
    ): Promise<string>
}