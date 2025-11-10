import React from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

async function getBlogData(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog/${slug}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page({ params }: {params: Promise<{ slug: string }>}) {
  const {slug} = await params
  const data = await getBlogData(slug);

  return (
    <div className="max-w-full mx-[300px] max-md:mx-auto md:mx-auto lg:mx-[300px] py-10 px-5">
      
      <div className="mb-10">
        <Link href="/blog" className="flex items-center gap-2 text-sm">
          <MoveLeft size={18} />
          Back to Blog
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-4">{data.title}</h1>

      {data.og_image && (
        <Image
          src={data.og_image}
          alt={data.title}
          width={800}
          height={350}
          className="rounded-xl my-6 mx-auto"
        />
      )}

      <div className="prose prose-gray dark:prose-invert prose-neutral max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {data.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
