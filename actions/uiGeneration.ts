import OpenAI from "openai";
import {NextResponse} from "next/server";

type UIComponent = {
    screen: string;
    component: string;
};

type UISuccessResponse = {
    ui: UIComponent[];
    message: string;
    imageHolder: string[];
    creditUsed: number;
};

type UIReturn = {
    ui: UIComponent[];
    message: string;
}

export default async function UiGeneration(
    fattenedPrompt: string,
    imageHolder: string[],
    previousUI: string,
    subHelper:string
): Promise<NextResponse<UISuccessResponse>> {
    const prompt = fattenedPrompt;
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        if (!prompt) {
            return NextResponse.json(
                {
                    ui: [],
                    message: 'Prompt is required',
                    imageHolder: [],
                    creditUsed: 0,
                },
                { status: 400 }
            );
        }

        // Rest of your system message and setup...
        // ensure imageHolder is a string variable defined earlier
        const systemMessage: string = `You are an expert UI/UX designer.

Generate a mobile app UI/UX based on the user's prompt.
${subHelper}

The UI must be visually appealing and well-structured. Use modern design styles, spacing, typography, color usage, and layout flow. The default mobile screen size is width 375px and minimum height 500px. Create additional screens when helpful. 

Rules:
- Use pure HTML with inline CSS styles.
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


        const messages =[];

        if (previousUI && previousUI.length > 0) {
            messages.push({
                role: 'user',
                content: `Here is the current UI state:\n${JSON.stringify(previousUI, null, 2)}`
            });
        }

        messages.push({ role: 'user', content: prompt });

        const response = await openai.chat.completions.create({
            model: 'gpt-5-mini-2025-08-07',
            messages: [
                {
                    role: "system",
                    content: systemMessage
                },
                {
                    role: "user",
                    content: prompt + ` Do not use placeholder images; use the images below: ${imageHolder}`
                }
            ],
            response_format: {
                                "type": "json_schema",
                                "json_schema": {
                                    "name": "mobile_ui_generator_schema",
                                    "schema": {
                                    "type": "object",
                                    "properties": {
                                        "ui": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                            "screen": {
                                                "type": "object",
                                                "properties": {
                                                "name": { "type": "string" },
                                                "width": { "type": "number" },
                                                "height": { "type": "number" }
                                                },
                                                "required": ["name", "width", "height"]
                                            },
                                            "component": { "type": "string" }
                                            },
                                            "required": ["screen", "component"],
                                            "additionalProperties": false
                                        }
                                        }
                                    },
                                    "required": ["ui"],
                                    "additionalProperties": false
                                    }
                                }
                            }
                                ,
            reasoning_effort: "low",

        });


        console.log(response);
        const content = response.choices[0].message.content;
        //console.log(content);
        const creditUsed = response?.usage?.total_tokens ?? 0;
        const generatedUI: UIReturn = JSON.parse(content as string);

        // Validate the UI components structure
        if (!generatedUI.ui || !Array.isArray(generatedUI.ui)) {
            throw new Error("Invalid UI response format from OpenAI");
        }

        // Validate each UI component
        const validatedUI = generatedUI.ui.map(component => {
            if (!component.screen || !component.component) {
                throw new Error("Invalid UI component structure");
            }
            return {
                screen: component.screen,
                component: component.component,
            } as UIComponent;
        });


        return NextResponse.json({
            ui: validatedUI,
            message: generatedUI.message,
            imageHolder,
            creditUsed,
        });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                ui: [],
                message: error.message || "Unknown error",
                imageHolder: [],
                creditUsed: 0
            },
            { status: 500 }
        );
    }
}

