import {NextResponse} from "next/server";
import {HTMLToJSON} from "html-to-json-parser";


export default async function HtmlToJson(html:string) {
    try {

        let result = await HTMLToJSON(html, true);

        return result;
    } catch (error:any){
        console.error(error);
        return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
    }
}
