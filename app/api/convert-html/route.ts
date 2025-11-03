import { NextResponse } from "next/server";
//import {htmlToFigma} from "@/utils/newConvert";
export async function POST(req: Request) {
    try {
        const { html } = await req.json();
        if (!html) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Convert HTML to OpenDesign JSON
        //const openDesignJSON = htmlToFigma(html);
        const openDesignJSON = "here";

        return NextResponse.json({ success: true, openDesignJSON });
    } catch (error: unknown) {
        return NextResponse.json({ error: error || "Failed to process request" }, { status: 500 });
    }
}

// // Helper function to generate a UUID (if needed)
// function generateUuid() {
//     return crypto.randomUUID();
// }
