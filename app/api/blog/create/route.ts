import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // must use service role to insert server-side
    );

    const { data, error } = await supabase.from("blog_posts").insert({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      tags: body.tags,
      og_image: body.ogImage,
      backlinks: body.backlinks,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
