import OpenAI from "openai";

type UIComponent = {
    screen: {
        name: string;
        width: number;
        height: number;
    };
    component: string;
};

export default async function GenerateSingleScreen(
    screenPrompt: string,
    screenName: string,
    imageHolder: string[],
    previousUI: string,
    subHelper: string,
    allScreens: UIComponent[] = []
): Promise<{ screen: UIComponent; creditUsed: number }> {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const systemMessage: string = `You are an expert mobile app ui/ux developer/designer.
Always keep in mind the dimensions of content on the screen cause this is only for mobile phones (contents should not overlap each other or move out of their containers).
Generate a single mobile app UI/UX screen based on the user's prompt.
${subHelper}

The UI must be visually appealing and well-structured. Use modern design styles, spacing, typography, color usage, and layout flow. The default mobile screen size is width 375px and minimum height 500px.

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
- Minimum width: 270px; minimum height: 500px.
- Make the screen tall enough to contain content—avoid overflow when possible.

Return the final result **only** as JSON in the following format:

Example output:
 { "ui": 
	 [
		 { 
			"screen": { "name": "${screenName}", "width": 375, "height": 500 }, 
			"component": "<div id='unique-id' class='container' style='font-weight:bold'><h2 id='unique-id'>Screen Title</h2></div>" 
		 } 
	 ]
 }

The "component" string must contain valid HTML and inline CSS only. 
Do not return any explanation, description, or markdown — only the JSON.
`;

        const messages: OpenAI.ChatCompletionMessageParam[] = [
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

        const response = await openai.chat.completions.create({
            model: "gpt-5-mini-2025-08-07",
            messages,
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "mobile_ui_generator_schema",
                    schema: {
                        type: "object",
                        properties: {
                            ui: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        screen: {
                                            type: "object",
                                            properties: {
                                                name: { type: "string" },
                                                width: { type: "number" },
                                                height: { type: "number" }
                                            },
                                            required: ["name", "width", "height"]
                                        },
                                        component: { type: "string" }
                                    },
                                    required: ["screen", "component"],
                                    additionalProperties: false
                                }
                            }
                        },
                        required: ["ui"],
                        additionalProperties: false
                    }
                }
            },
            reasoning_effort: "minimal",
            
        });

        // Log response structure for debugging
        console.log("OpenAI Response:", JSON.stringify(response, null, 2));
        console.log("Response choices:", response.choices);
        console.log("First choice:", response.choices[0]);
        console.log("Message:", response.choices[0]?.message);

        // Check for content in various possible locations
        const message = response.choices[0]?.message;
        let content = message?.content;
        
        // Sometimes content might be null but there's a refusal or other field
        if (!content) {
            // Check if there's a refusal reason
            if (message?.refusal) {
                console.error("OpenAI refused the request:", message.refusal);
                throw new Error(`OpenAI refused the request: ${message.refusal}`);
            }
            
            // Log the full response to help debug
            console.error("No content in response. Full response:", JSON.stringify(response, null, 2));
            console.error("Message object:", JSON.stringify(message, null, 2));
            
            throw new Error(`No content returned from OpenAI. Response structure: ${JSON.stringify({
                choicesLength: response.choices?.length,
                firstChoice: response.choices?.[0],
                message: message,
                hasRefusal: !!message?.refusal
            })}`);
        }
        
        const creditUsed = response?.usage?.total_tokens ?? 0;

        const parsed = JSON.parse(content);

        if (!parsed.ui || !Array.isArray(parsed.ui) || parsed.ui.length === 0) {
            throw new Error("Invalid response format from OpenAI");
        }

        const screen: UIComponent = {
            screen: parsed.ui[0].screen,
            component: parsed.ui[0].component
        };

        return { screen, creditUsed };

    } catch (error) {
        console.error("Error generating single screen:", error);
        throw error;
    }
}

