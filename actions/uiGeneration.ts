import OpenAI from "openai";
import { NextResponse } from "next/server";

type UIComponent = {
    screen: {
        name: string;
        width: number;
        height: number;
    };
    component: string;
};

type UISuccessResponse = {
    ui: UIComponent[];
    imageHolder: string[];
    creditUsed: number;
};

export default async function UiGeneration(
    fattenedPrompt: string,
    imageHolder: string[],
    previousUI: string,
    subHelper: string
): Promise<NextResponse<UISuccessResponse>> {

    try {
        if (!fattenedPrompt) {
            return NextResponse.json(
                { ui: [], imageHolder: [], creditUsed: 0 },
                { status: 400 }
            );
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const systemMessage: string = `You are an expert mobile app ui/ux developer/designer.

Generate a mobile app UI based on the user's prompt.
${subHelper}
Always keep in mind the dimensions of content on the screen cause this is only for mobile phones (contents should not overlap each other or move out of their containers).
The UI must be visually appealing and well-structured. Use modern design styles, spacing, typography, color usage, and layout flow. The default mobile screen size is width 375px and minimum height 500px. Create additional screens when helpful.
Rules:
- Use pure HTML with inline CSS styles.
- keep each screen concise to limit output tokens.
- Each screen is returned separately; do not combine screens.
- Each element must have a unique id.
- Wrap each screen in one root <div>.
- Use camelCase for SVG attributes.
- No comments.
- Do not emit escape characters (like backslashes).
- Do not use <Image>. Instead, simulate images with shapes or backgrounds.
- Use animations minimally, only through CSS transitions (no keyframes required).
- Use absolute positioning carefully; do not use fixed.
- Minimum width: 270px; minimum height: 500px.
- Make the screen tall enough to contain content—avoid overflow when possible.
Return the final result **only** as JSON in the following format:
Example output:
 { "ui": 
	 [
		 { 
			"screen": { "name": "login", "width": 375, "height": 500 }, 
			"component": "<div id='unique-id' class='container' style='font-weight:bold'><h2 id='unique-id'>Login</h2></div>" 
		 } 
	 ]
 }

The "component" string must contain valid HTML and inline CSS only. 
Do not return any explanation, description, or markdown — only the JSON.
`;

        const messages = [];

        if (previousUI && previousUI.length > 0) {
            messages.push({
                role: "user",
                content: `Here is the current UI state:\n${JSON.stringify(previousUI, null, 2)}`
            });
        }

        const response = await openai.responses.create({
            model: "gpt-5-mini-2025-08-07",
            input: [
                {
                    role: "system",
                    content: systemMessage
                },
                {
                    role: "user",
                    content: fattenedPrompt + ` Do not use placeholder images; use the images below: ${imageHolder}`
                }
            ],
            max_output_tokens: 1500,
            reasoning: {effort: "medium"},
        });

        const content = response.output_text;
        const creditUsed = response?.usage?.total_tokens ?? 0;

        const parsed = JSON.parse(content as string);

        const validatedUI: UIComponent[] = parsed.ui.map((item: any) => ({
            screen: item.screen,
            component: item.component
        }));

        return NextResponse.json({
            ui: validatedUI,
            imageHolder,
            creditUsed
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { ui: [], imageHolder: [], creditUsed: 0 },
            { status: 500 }
        );
    }
}
