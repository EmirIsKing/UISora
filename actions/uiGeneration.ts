import OpenAI from 'openai';
import {NextResponse} from "next/server";

type UIComponent = {
    screen: string;
    component: string;
    message: string;
};

type UISuccessResponse = {
    ui: UIComponent[];
    message: string;
    imageHolder: string[];
};

type UIReturn = {
    ui: UIComponent[];
}

export default async function UiGeneration(
    fattenedPrompt: string,
    imageHolder: string[],
    previousUI: string
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
                    imageHolder: []
                },
                { status: 400 }
            );
        }

        // Rest of your system message and setup...
        const systemMessage: OpenAI.ChatCompletionMessageParam = {
            role: 'system',
            content: `You are an expert UI/UX designer.
             Generate a mobile app UI/UX based on the user's prompt,
             ensuring that it includes the necessary backgrounds, colors, layouts, fonts, 
             paddings, and other elements to create a visually appealing design.
             The default mobile screen size is 270 width 500px minimum height. 
             Use inline styles to make the screens look beautiful.
              You can add as much content as needed to each screen, ensuring the interface is intuitive and user-friendly. 
              Always style text appropriately and elegantly.
               Use modern design styles, techniques, and trends to enhance the visual appeal. 
               Feel free to add animations to the HTML components, but do not include animations in ReactFigma. 
               You can create any number of screens, and you are encouraged to do so. 
               Use colors skillfully and keep the scrollbar small with a transparent background.
                Add any components that will enhance the UI/UX. 
                You are free to add any detail or modifications to the ui.
                Always add simple animations to elements like buttons to identify clicks.
                Each element has a unique id.
                Return an array of objects in JSON format with the following structure: 
                { ui: [ {screen: {name: "Home", width: 250, height: 500}, component: "<>pure html and css code</>"} ] } ,
                Make the screen long enough or wise enough to fit the content.
                Freely change the size of the screen but make the minimum height be 500px and minimum width be 270px.
                  Do not use the <Image> tag as it may not function properly.
                   Instead, create a rectangle or a similar shape and use the background style property. 
                   Do not add line breaks inside tags—only break the text itself. 
                   To create a linear background in ReactFigma, use the following format: backgroundColor: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)' 
                   The "component" field should be a valid html component.
                    **Example output:** { "ui": [ { "screen": {name: "login", width: 250, height: 500}, "component": "<div id="unique-id" class="container" style={{fontSize:bold}}><h2 id="unique-id">Login</h2></div>", "message": "This login screen uses a modern, minimalistic design with a gradient background for a stylish effect. The background gradient gives a soft, welcoming feel, while the 'Login' text is clear and easy to read in the center of the screen.
                    The screen is responsive, ensuring accessibility and usability." } 
                    
                    dont use placeholder images use the images below
                     these images are generated dynamically incase you need image sources and if you do use make sure you choose one that aligns with the context.
                     
                     ${imageHolder}
                     
                     Ensure: 
                   The primary objective is to create a beautiful UI, so focus on making the design visually appealing.
                   Each element has a unique id.
                    Maintain the existing UI structure while making necessary modifications based on the new prompt. 
                   The response should be a valid JSON array. 
                   The "component" field should be a string containing valid HTML.
                    Do not use escape characters (e.g., slashes) in the output. 
                    The response must include a "message" field that explains your design choices, including why specific colors, layouts, and UI elements were used.
                     Prioritize providing a detailed "message" that explains your design decisions.
                      Styles should be written as strings, not JavaScript objects. 
                   Ensure all styles align with global design standards. 
                   Double-check the code before responding to ensure everything is correct. 
                   Wrap everything in a <div> tag. 
                   Every element and style must be implemented precisely and specifically for it to work correctly.
`
        };

        const messages: OpenAI.ChatCompletionMessageParam[] = [systemMessage];

        if (previousUI && previousUI.length > 0) {
            messages.push({
                role: 'user',
                content: `Here is the current UI state:\n${JSON.stringify(previousUI, null, 2)}`
            });
        }

        messages.push({ role: 'user', content: prompt });

        const response = await openai.chat.completions.create({
            model: 'o3-mini',
            messages,
            store: true,
            response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content ?? '{}';
        const generatedUI: UIReturn = JSON.parse(content);

        // Validate the UI components structure
        if (!generatedUI.ui || !Array.isArray(generatedUI.ui)) {
            throw new Error("Invalid UI response format from OpenAI");
        }

        // Validate each UI component
        const validatedUI = generatedUI.ui.map(component => {
            if (!component.screen || !component.component || !component.message) {
                throw new Error("Invalid UI component structure");
            }
            return {
                screen: component.screen,
                component: component.component,
                message: component.message
            } as UIComponent;
        });

        return NextResponse.json({
            ui: validatedUI,
            message: fattenedPrompt,
            imageHolder
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                ui: [],
                message: error.message || "Unknown error",
                imageHolder: []
            },
            { status: 500 }
        );
    }
}