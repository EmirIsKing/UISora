import { Mistral } from "@mistralai/mistralai";

type UIComponent = {
    screen: {
        name: string;
        width: number;
        height: number;
    };
    component: string;
    styleGuide?: unknown;
};

type MistralMessage = {
    role: "system" | "user" | "assistant" | "tool";
    content: string;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function enforceRootDivDimensions(html: string, widthPx: number, heightPx: number): string {
    if (!html || typeof html !== "string") return html;
    // Ensure we only modify the very first <div ...> tag (root container)
    const divOpenTagRegex = /<div\b([^>]*)>/i;
    const match = html.match(divOpenTagRegex);
    if (!match) return html;

    const fullMatch = match[0];
    const attrs = match[1] || "";

    const styleAttrRegex = /\sstyle\s*=\s*"(.*?)"/i;
    const styleMatch = attrs.match(styleAttrRegex);

    const enforcedStyles = `width:${widthPx}px;min-width:${Math.min(widthPx, 370)}px;height:${heightPx}px;min-height:${heightPx}px;`;

    let newAttrs: string;
    if (styleMatch) {
        const originalStyle = styleMatch[1];
        const mergedStyle = `${originalStyle.trim()}${originalStyle.trim().endsWith(";") ? "" : ";"}${enforcedStyles}`;
        newAttrs = attrs.replace(styleAttrRegex, ` style="${mergedStyle}"`);
    } else {
        newAttrs = `${attrs} style="${enforcedStyles}"`;
    }

    const newOpenTag = `<div${newAttrs}>`;
    return html.replace(fullMatch, newOpenTag);
}

export default async function GenerateSingleScreen(
    screenPrompt: string,
    screenName: string,
    imageHolder: string[],
    previousUI: string,
    subHelper: string,
    allScreens: UIComponent[] = [],
    styleGuide?: unknown
): Promise<{ screen: UIComponent; creditUsed: number }> {
    try {
        const apiKey = process.env.MISTRAL_API_KEY;
        if (!apiKey) {
            throw new Error("Missing MISTRAL_API_KEY environment variable.");
        }
        const mistralClient = new Mistral({ apiKey: apiKey });

        const systemMessage: string = `You are an expert mobile app ui/ux developer/designer.
Always keep in mind the dimensions of content on the screen cause this is only for mobile phones (contents should not overlap each other or move out of their containers).
Generate a single mobile app UI/UX screen based on the user's prompt.
${subHelper}

The UI must be visually appealing and well-structured. Use modern design styles, spacing, typography, color usage, and layout flow. The default mobile screen size is minimum width 375px and minimum height 500px.

Rules:
- Use pure HTML with inline CSS styles.
- Generate ONLY ONE screen.
- Each element must have a unique id.
- Wrap the screen in one root <div>.
- Use camelCase for SVG attributes.
- No comments.
- make the screen concise to reduce output tokens.
- Do not over style the screen, keep it simple and minimalistic.
- Do not over scope the design.
- ui should be clean, neat, simple and minimalistic.
- Do not emit escape characters (like backslashes).
- Do not use <Image>. Instead, simulate images with shapes or backgrounds.
- Use animations minimally, only through CSS transitions (no keyframes required).
- Use absolute positioning carefully; do not use fixed.
- Minimum width: 370px; minimum height: 700px.
- Make the screen tall enough to contain content—avoid overflow when possible.

Return the final result **only** as JSON in the following format:

Example output:
 { "ui": 
	 [
		 { 
			"screen": { "name": "${screenName}", "width": 375, "height": 700 }, 
			"component": "<div id='unique-id' class='container' style='font-weight:bold'><h2 id='unique-id'>Screen Title</h2></div>" 
		 } 
	 ]
 }

The "component" string must contain valid HTML and inline CSS only. 
Do not return any explanation, description, or markdown — only the JSON.
`;

        const messages: MistralMessage[] = [
            {
                role: "system",
                content: systemMessage
            }
        ];

        if (previousUI && previousUI.length > 0) {
            messages.push({
                role: "user",
                content: `Here is the current UI state:\n${JSON.stringify(previousUI, null, 2)}`
            });
        }

        // Include context about other screens if available
        // if (allScreens.length > 0) {
        //     messages.push({
        //         role: "user",
        //         content: `Here are the screens already generated:\n${JSON.stringify(allScreens.map(s => ({ name: s.screen.name })), null, 2)}`
        //     });
        // }

        messages.push({
            role: "user",
            content: `Generate the "${screenName}" screen. ${screenPrompt} Do not use placeholder images; use the images below: ${imageHolder.join(', ')}`
        });
        if (styleGuide) {
            messages.push({
                role: "user",
                content: `Use this style guide strictly for design consistency:\n${JSON.stringify(styleGuide, null, 2)}`
            });
        }

        // enforce 2s interval between generations
        await sleep(2000);

        const response = await mistralClient.chat.complete({
            model: "codestral-latest",
            messages,
            temperature: 0.7,
            responseFormat: { type: "json_object" },
          });

        // Log response structure for debugging
        console.log("Mistral Response:", JSON.stringify(response, null, 2));
        console.log("Response choices:", response?.choices);
        console.log("First choice:", response?.choices?.[0]);
        console.log("Message:", response?.choices?.[0]?.message);

        // Extract message/content safely
        const firstChoice = response?.choices?.[0];
        const message = firstChoice?.message;
        const rawContent = message?.content as unknown;
        const content: string | undefined = Array.isArray(rawContent)
            ? (rawContent as any[]).map((c: any) => (typeof c === "string" ? c : c?.text ?? "")).join("")
            : (rawContent as string | undefined);

        if (!content || content.trim().length === 0) {
            console.error("No content in response. Full response:", JSON.stringify(response, null, 2));
            throw new Error("No content returned from Mistral.");
        }

        const creditUsed = (response as any)?.usage?.totalTokens ?? 0;

        const parsed = JSON.parse(content);

        if (!parsed.ui || !Array.isArray(parsed.ui) || parsed.ui.length === 0) {
            throw new Error("Invalid response format from Mistral");
        }

        // Normalize dimensions and enforce on root component
        const parsedScreen = parsed.ui[0].screen || {};
        const normalizedWidth = Math.max(370, Number(parsedScreen.width) || 375);
        const normalizedHeight = Math.max(500, Number(parsedScreen.height) || 500);
        const adjustedComponent = enforceRootDivDimensions(parsed.ui[0].component, normalizedWidth, normalizedHeight);

        const screen: UIComponent = {
            screen: { name: parsedScreen.name || screenName, width: normalizedWidth, height: normalizedHeight },
            component: adjustedComponent,
            styleGuide: styleGuide
        };

        return { screen, creditUsed };

    } catch (error) {
        console.error("Error generating single screen:", error);
        throw error;
    }
}

