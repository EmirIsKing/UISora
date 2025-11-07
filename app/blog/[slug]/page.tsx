"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

type BlogPost = {
  title: string;
  content: string;
  excerpt?: string;
  og_image?: string;
  created_at?: string;
};

const Page = () => {
  const { slug } = useParams();
  const [data, setData] = useState<BlogPost | null>(null);

  const fetchBlogData = async (slug: string) => {
    const res = await fetch(`/api/blog/${slug}`, { cache: "no-store" });
    const json = await res.json();
    setData(json);
    console.log(json)
  };

  useEffect(() => {
    if (slug) fetchBlogData(slug as string);
  }, [slug]);

  if (!data) return <p className="flex items-center justify-center py-20">
    <Spinner className="size-14"/>
  </p>;

  return (
    <div className="max-w-full mx-[300px] max-md:mx-auto md:mx-auto py-10 px-5">
      {/* Back */}
      <div className="mb-10">
        <Link href="/blog" className="flex items-center gap-2 text-sm">
          <MoveLeft size={18} />
          Back to Blog
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-4">{data.title}</h1>

      {/* OG Image */}
      {data.og_image && (
        <Image
          src={data.og_image}
          alt={data.title}
          width={800}
          height={350}
          className="rounded-xl my-6 mx-auto"
        />
      )}

      {/* Markdown Content */}
      <div className="prose prose-gray dark:prose-invert prose-neutral max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {data.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Page;
