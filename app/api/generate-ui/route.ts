import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import ImageGeneration from "@/actions/imageGen";
import PromptFattening from "@/actions/promptFattening";
import UiGeneration from "@/actions/uiGeneration";
import GetImages from "@/actions/getImages";
import convertToJson from "@/actions/convertToJson";
import HtmlToJson from "@/actions/HtmlToJson";

type UIComponent = {
    screen: {
        name: string;
        width: number;
        height: number;
    };
    component: string;
    message: string;
};

interface HtmlNode {
    type: string;
    attributes?: {
        [key: string]: string;
    };
    content?: Array<HtmlNode | string>;
}

export async function POST(request: Request) {
    try {
        const { prompt, previousUI, imageHolder  } = await request.json();

        const FattenedPromptResponse = await PromptFattening(prompt);

        if (!FattenedPromptResponse) {
            return NextResponse.json(
                { message: 'PromptFattening did not return a response' },
                { status: 500 }
            );
        }
        const FattenedPromptJson = await FattenedPromptResponse.json();

        // console.log(FattenedPromptJson.ui);
        // console.log(FattenedPromptJson.ui[0].splashImagePrompt);
        let ImageContainer: string[] = [];

        if (imageHolder.length === 0) {

            const SplashImage = await ImageGeneration(FattenedPromptJson.ui[0].splashImagePrompt, 1);
            if (!SplashImage) {
                return NextResponse.json(
                    { message: 'SplashImageGeneration did not return a response' },
                    { status: 500 }
                );
            }
            const  SplashImageJson = await SplashImage.json()
            // console.log(SplashImageJson);
            const SplashImageString: string = SplashImageJson.images[0].url + ' - Image of ' + SplashImageJson.prompt;
            ImageContainer.push(SplashImageString);

            const OtherImage = await ImageGeneration(FattenedPromptJson.ui[0].otherImagesPrompt, 4);
            if (!OtherImage) {
                return NextResponse.json(
                    { message: 'OtherImageGeneration did not return a response' },
                    { status: 500 }
                );
            }
            const  OtherImageJson = await OtherImage.json()
           // console.log(OtherImageJson);
            let count = 0;
            while (count != 4) {
                const OtherImageString: string = OtherImageJson.images[count].url + ' - Image of ' + OtherImageJson.prompt;
                ImageContainer.push(OtherImageString);
                count++;
            }

           // console.log(ImageContainer);
        } else {
            ImageContainer = imageHolder;
        }

        const fattenedPrompt = FattenedPromptJson.ui[0].ui;
        const Response = await UiGeneration(fattenedPrompt, ImageContainer, previousUI);
        const Data = await Response.json();
        const uiData: UIComponent[] = Data.ui;
        console.log(uiData);

// Use Promise.all to handle async operations in map
        const convertedUI = await Promise.all(
            uiData.map(async (item, index) => {
                // 1. Convert component HTML to JSON
                const componentData = await HtmlToJson(item.component);

                // 2. Get screen data (assuming Data.screen[index] is an object)
                const screenData = item.screen

                // 3. Return the structured object
                return {
                    screen: screenData, // e.g., { name: "Home", width: 250, height: 500 }
                    component: JSON.parse(componentData), // Parsed component data
                };
            })
        );

// Now you can use convertedUI
        const compose = {
            ui: convertedUI,
            message: Data.message,
            imageHolder: ImageContainer
        };
        console.log(convertedUI);

        console.log(compose);
        return NextResponse.json(compose);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Error generating UI' },
            { status: 500 }
        );
    }
}