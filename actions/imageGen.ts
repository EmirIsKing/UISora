import { fal } from "@fal-ai/client";
import {NextResponse} from "next/server";

export default async function ImageGeneration(ImagePrompt: string, numImages: number) {
try {
    const result = await fal.subscribe("fal-ai/flux/schnell", {
        input: {
            prompt: ImagePrompt,
            num_images: numImages,
            image_size: "landscape_4_3"
        },
        logs: true,
        onQueueUpdate: (update) => {
            if (update.status === "IN_PROGRESS") {
                update.logs.map((log) => log.message).forEach(console.log);
            }
        },
    });
    console.log(result.requestId);
    return NextResponse.json(result.data);
} catch (error:any) {
    console.error(error);
}
}