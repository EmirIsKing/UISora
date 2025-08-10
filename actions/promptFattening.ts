import OpenAI from 'openai';
import {NextResponse} from "next/server";

export default async function PromptFattening(prompt: string) {

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY_FATTENING,
        });

        const systemMessage: OpenAI.ChatCompletionMessageParam = {
            role: 'system',
            content: `You are a ui/ux developer. You use modern techniques and design to design beautiful mobile ui/ux.
            Ui structure and description should be in detail.
            Always use a design technique to make the ui/ux look beautiful unless the user asks for a specific design.
            Respond only with a valid JSON object .
            Make sure to always keep in mind the dimensions of the screen.
            You elaborate more on the users prompt and fatten it, make sure all components are aligned well.
            You can create any number of screens, always add a splash and atleast one onboarding screen and 5 other screens
            
            **Example output:**
{
  "ui": [
    {
        ui:" All UI Structure & Description goes here(ui is a string not an object)",
        splashImagePrompt: "An image of a coffee shop for a splash screen",
        otherImagesPrompt: "An image of coffee in a cup"
    }
  ],
  "message": "This login screen uses a modern, minimalistic design with a gradient background for a stylish effect. The background gradient gives a soft, welcoming feel, while the 'Login' text is clear and easy to read in the center of the screen. The screen is responsive, ensuring accessibility and usability."
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