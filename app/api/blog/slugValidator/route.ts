import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { slug } = await req.json();

        // 1️⃣ Check if slug exists
        const { data: existing, error } = await supabase
            .from("blog_posts")
            .select("slug")
            .eq("slug", slug)
            .maybeSingle();

        if (error) {
            console.error("Supabase fetch error:", error);
            return NextResponse.json({ error }, { status: 500 });
        }

        let finalSlug = slug;

        // 2️⃣ If exists, append a 5-character UUID
        if (existing) {
            const randomId = crypto.randomUUID().slice(0, 5); // 5 chars
            finalSlug = `${slug}-${randomId}`;
        }

        return NextResponse.json({ slug: finalSlug }, { status: 200 });
    } catch (err) {
        console.error("Route error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
