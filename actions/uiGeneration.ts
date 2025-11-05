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
        const systemMessage: string = `
You are an expert UI/UX designer.
Generate a mobile app UI/UX based on the user's prompt,
${subHelper},
ensuring that it includes the necessary backgrounds, colors, layouts, fonts,
paddings, and other elements to create a visually appealing design.
The default mobile screen size is 375 width and minimum height 500px.
Use inline styles to make the screens look beautiful.
You can add as much content as needed to each screen, ensuring the interface is intuitive and user-friendly.
Always style text appropriately and elegantly.
Use modern design styles, techniques, and trends to enhance the visual appeal.
Feel free to add animations to the HTML components, but do not include animations in ReactFigma.
You can create any number of screens, and you are encouraged to do so.
Use colors skillfully and keep the scrollbar small with a transparent background.
Add any components that will enhance the UI/UX.
Always properly position absolute elements and do not use fixed.
use camelCase for SVG attributes.
You are free to add any detail or modifications to the UI.
Always add simple animations to elements like buttons to identify clicks.
Each element must have a unique id.
Do not add comments.
Each screen gets its own component object; do not combine screens into one overflow.
Return an array of objects in JSON format with the following structure:
{ "ui": [ { "screen": { "name": "Home", "width": 250, "height": 500 }, "component": "<>pure html and css code</>" } ], "message": "..." }
Make the screen long or wide enough to fit the content.
Minimum height: 500px; minimum width: 270px.
Do not use the <Image> tag. Instead, create a rectangle or shape and use CSS background.
Do not add line breaks inside tags—only break text between tags.
For linear backgrounds in ReactFigma, use: backgroundColor: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'
The "component" field should be a valid HTML string.
Example output:
{ "ui": [ { "screen": { "name": "login", "width": 250, "height": 500 }, "component": "<div id='unique-id' class='container' style='font-weight:bold'><h2 id='unique-id'>Login</h2></div>" } ], "message": "..." }
Ensure:
- The primary objective is a beautiful UI.
- Each element has a unique id.
- Maintain existing UI structure while applying modifications.
- Response must be a valid JSON array.
- "component" must be a string containing valid HTML.
- Do not emit escape characters (like backslashes).
- Return a "message" explaining design choices, colors, layouts, and UI elements (include emojis if desired).
- Make sure Message is clear and readable to the reader(spacious and friendly).
- Write styles as strings, not JS objects.
- Wrap each screen component in a single root <div>.
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
                type: "json_schema",
                json_schema: {
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
                            },
                            "message": { "type": "string" }
                        },
                        "required": ["ui", "message"],
                        "additionalProperties": false
                    }
                }
            }

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

