import OpenAI from 'openai';
import {NextResponse} from "next/server";
import {Meta_Schema} from "@/utils/OpenAiSchema";

export default async function UiGeneration(fattenedPrompt: string, imageHolder: string[], previousUI: string) {
        const prompt = fattenedPrompt;
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        if (!prompt) {
            return NextResponse.json(
                { message: 'Prompt is required' },
                { status: 400 }
            );
        }

        //Image Generation
        let updatedImageHolder = imageHolder;

        const systemMessage: OpenAI.ChatCompletionMessageParam = {
            role: 'system',
            content: `You are an expert UI/UX designer.
Generate a mobile app UI/UX based on the user's prompt, ensuring that it includes the necessary backgrounds, colors, layouts, fonts, paddings, and other elements to create a visually appealing design.
The default mobile screen size is 270 width 500px minimum height, Extend width and height as much as you want.
You can add as much content as needed to each screen, ensuring the interface is intuitive and user-friendly, You are encouraged to do so.
Always style text appropriately and elegantly.
Use modern design styles, techniques, and trends to enhance the visual appeal.
You can create any number of screens, always add a splash and atleast one onboarding screen and 5 other screens.
Make sure all components are aligned well.
Add images to the onboarding.
Use colors skillfully and keep the scrollbar small with a transparent background.
Add any components that will enhance the UI/UX.
You are free to add any detail or modifications to the ui
Return an array of objects in JSON format with the following structure:

  {
    ui: [
        {screen: "Home",
        component:  [ {
            id: "dynamic-id",
            type: "text",
            x: 20,
            y: 80,
            width: 280,
            height: 40,
            content: "Sign In",
            style: {
                fontSize: "28px",
                fontWeight: "bold",
                textAlign: "center",
                color: "#fff",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }
        },
        }
    ]
  }
  
The "component" field should be a valid html component.

**Example output:**
{
  "ui": [
    {
      "screen": {
                    name: "Login",
                    width: 280,
                    height: 540,
                },
      "component": [ {
            id: "dynamic id",
            type: "text",
            x: 20,
            y: 80,
            width: 280,
            height: 40,
            content: "Sign In",
            style: {
                fontSize: "28px",
                fontWeight: "bold",
                textAlign: "center",
                color: "#fff",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }
        },
        {
            "id": "splash-bg",
            "type": "image",
            "x": 0,
            "y": 0,
            "width": 270,
            "height": 500,
            "source": "https://v3.fal.media/files/rabbit/RUho3iHajhlLAAm-qupxK.png",
            "style": {
                "objectFit": "cover"
            }
        },
        {
            id: "input-2",
            type: "input",
            x: 20,
            y: 150,
            width: 280,
            height: 50,
            placeholder: "Email",
            value: "",
            style: {
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "0 15px",
                fontSize: "16px",
                backgroundColor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(2px)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }
        },
        {
            id: "input-3",
            type: "input",
            x: 20,
            y: 220,
            width: 280,
            height: 50,
            placeholder: "Password",
            value: "",
            secureTextEntry: true,
            style: {
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "0 15px",
                fontSize: "16px",
                backgroundColor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(2px)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }
        },
        {
            id: "button-4",
            type: "button",
            x: 20,
            y: 300,
            width: 280,
            height: 50,
            content: "Sign In",
            style: {
                backgroundColor: "#4285F4",
                color: "white",
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            },
            hoverStyle: {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 8px rgba(0,0,0,0.15)"
            }
        },
        {
            id: "text-5",
            type: "text",
            x: 20,
            y: 370,
            width: 280,
            height: 20,
            content: "Don't have an account? Sign Up",
            style: {
                textAlign: "center",
                fontSize: "14px",
                color: "rgba(255,255,255,0.9)",
                cursor: "pointer",
                textDecoration: "underline"
            }
        }],
    }
  ],
  "message": "This login screen uses a modern, minimalistic login design. "
}


these images are generated dynamically in case you need image sources
and if you do use make sure you choose one that aligns with the context.
${updatedImageHolder}

Ensure:
The primary objective is to create a beautiful UI, so focus on making the design visually appealing.
Maintain the existing UI structure while making necessary modifications based on the new prompt.
The response should be a valid JSON array.
The "component" field should be an array of objects.
Do not use escape characters (e.g., slashes) in the output.
The response must include a "message" field that explains your design choices, including why specific colors, layouts, and UI elements were used.
Prioritize providing a detailed "message" that explains your design decisions.
Ensure all styles align with global design standards.
Double-check the code before responding to ensure everything is correct.
`}
        const messages: OpenAI.ChatCompletionMessageParam[] = [systemMessage];

        // Include previous UI state if provided
        if (previousUI && previousUI.length > 0) {
            messages.push({
                role: 'user',
                content: `Here is the current UI state:\n${JSON.stringify(previousUI, null, 2)}`
            });
        }

        // Add the user's prompt
        messages.push({ role: 'user', content: prompt });

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: 'o3-mini',
            messages,
            store: true,
            response_format: { type: "json_schema",  json_schema: Meta_Schema }
        });


        const content = response.choices[0].message.content ?? '{}';
        const generatedUI = JSON.parse(content);
        return {
            ui: generatedUI.ui,
            message: fattenedPrompt,
            imageHolder
        };

    } catch (error:any){
        console.error(error);
        return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
    }
}
