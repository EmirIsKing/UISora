import {JsonToHtmlRendererProps} from "@/types/types";

export async function loadUiJsonFromUrl(url: string): Promise<JsonToHtmlRendererProps> {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load uiJson');
    return res.json();
}
