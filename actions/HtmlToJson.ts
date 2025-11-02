import {NextResponse} from "next/server";
import {HTMLToJSON} from "html-to-json-parser";


export default async function HtmlToJson(html:string) {
    try {

        const result = await HTMLToJSON(html, true);

        return result;
    } catch (error){
        console.error(error);
        return NextResponse.json({ error: error || "Unknown error" }, { status: 500 });
    }
}
