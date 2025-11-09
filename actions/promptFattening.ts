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
            Make sure to always keep in mind the dimensions of the screen.
            Always remember that beauty of the design is main objective.
            You elaborate more on the users prompt and fatten it, make sure all components are aligned well.
            Always add a splash and atleast one onboarding screen.
            
            **Example output:**
            {
                "ui": [
                    {
                        title: "short title for ui",
                        ui:[
                            "splash: how splash should be",
                            "onboarding: how oonboarding should be",
                            etc
                        ],
                        message: "describing the ui screen by screen in markdown format no title and make spacing between screen mesage tight.",
                        splashImagePrompt: "An image of a coffee shop for a splash screen",
                        otherImagesPrompt: "An image of coffee in a cup"
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
            model: 'chatgpt-4o-latest',
            messages,
            store: true,
            response_format: { type: "json_object" }
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