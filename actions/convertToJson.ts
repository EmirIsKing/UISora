import OpenAI from 'openai';
import {NextResponse} from "next/server";
import {Meta_Schema} from "@/utils/OpenAiSchema";

export default async function convertToJson(UIPrompt: string) {
    const prompt = UIPrompt;
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY_UICONVERTER,
        });

        if (!prompt) {
            return NextResponse.json(
                { message: 'Prompt is required' },
                { status: 400 }
            );
        }

        //Image Generation
        const systemMessage: OpenAI.ChatCompletionMessageParam = {
            role: 'system',
            content: `Convert each element exactly as it is to json structure.
            Animations are not compulsory if the html element does not have it.
                        in the format:
{
    ui: [
        {
  "type": "div",
  "style": {
    "width": "270px",
    "height": "500px",
    "backgroundImage": "url('https://v3.fal.media/files/elephant/0za1GIgP6c68aAjMUpVvK.png')",
    "backgroundSize": "cover",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "children": [
    {
      "type": "div",
      "style": {
        "fontFamily": "Arial, sans-serif",
        "fontSize": "28px",
        "color": "#fff",
        "marginBottom": "15px"
      },
      "children": ["ShopName"]
    },
    {
      "type": "div",
      "style": {
        "width": "30px",
        "height": "30px",
        "border": "3px solid #fff",
        "borderTop": "3px solid transparent",
        "borderRadius": "50%",
        "animation": "spin 1s linear infinite"
      },
      "children": []
    }
  ],
  "animations": {
    "@keyframes spin": {
      "from": { "transform": "rotate(0deg)" },
      "to": { "transform": "rotate(360deg)" }
    }
  }
}
    ]

}
`}
        const messages: OpenAI.ChatCompletionMessageParam[] = [systemMessage];


        // Add the user's prompt
        messages.push({ role: 'user', content: prompt });

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: 'o3-mini',
            messages,
            store: true,
            response_format: { type: "json_object",}
        });


        const content = response.choices[0].message.content ?? '{}';
        const generatedUI = JSON.parse(content);
        return {
            ui: generatedUI.ui,
        };

    } catch (error:any){
        console.error(error);
        return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
    }
}
