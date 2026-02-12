import OpenAI from 'openai';
import {NextResponse} from "next/server";

export default async function PromptFattening(prompt: string, subHelper: string) {

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY_FATTENING,
        });

        const systemMessage: OpenAI.ChatCompletionMessageParam = {
            role: 'system',
            content: `You are an expert mobile app ui/ux developer. You use modern techniques and design to design beautiful mobile ui.
            Always keep in mind the dimensions of content on the screen cause this is only for mobile phones.
            Ui structure and description should be in detail.
            Always use a design technique to make the ui/ux look beautiful especially for the background of the screens make them colourful and visually appealing.
            Respond only with a valid JSON object .
            ${subHelper}
            Make sure to always keep in mind the dimensions of the screens, they are for mobile phones idealy 375 width and 700 height.
            Add a message describing all screens in markdown format no title and make spacing between screen mesage tight. make it look just like how it looks on chatgpt response
            Always remember that beauty of the design is main objective.
            You elaborate more on the users prompt and fatten it, make sure all components are aligned well.
            Always add a splash and atleast one onboarding screen.
            
            **Example output:**
            {
                "ui": [
                    {
                        title: "short title for ui",
                        style_guide: {
                            "theme": "Modern minimal finance dashboard",
                            "colors": {
                                "primary": "#4A8EFF",
                                "accent": "#FFD66B",
                                "background": "#FFFFFF",
                                "text_primary": "#1C1C1C"
                            },
                            "typography": {
                                "header": "Inter, SemiBold, 22px",
                                "body": "Inter, Regular, 16px"
                            },
                            "layout_rules": [
                                "Use spacing of 16px for padding",
                                "Rounded corners = 12px",
                                "Shadow soft",
                                "Buttons full-width"
                            ],
                            "component_library": {
                                "button": {},
                                "navbar": {},
                                "card": {}
                            }
                        },
                        ui:[
                            "splash: detailed description of splash screen",
                            "onboarding: detailed description of onboarding screen",
                            etc
                        ],
                        message: "describing the ui screen by screen and some spacing between screen messages for readability.",
                        splashImagePrompt: "simple prompt for a splashscreen in context",
                        otherImagesPrompt: "simple prompt for general supporting images in context"
                    }
                ],
            }

            just one ui object with all the ui structure and description.
            `}


        const messages: OpenAI.ChatCompletionMessageParam[] = [systemMessage];

        // Add the user's prompt
        messages.push({ role: 'user', content: prompt });

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL!,
            messages,
            store: true,
            response_format: { type: "json_object" },
            temperature: 0.7,
        });


        const content = response.choices[0].message.content ?? '{}'
        const generatedUI = JSON.parse(content);
        return NextResponse.json({
            ui: generatedUI.ui,
            usage: response.usage
        });

    } catch (error:any){
        console.error(error);
    }

}