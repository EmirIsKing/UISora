import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uisora.com";

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cookie-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/sign-in`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/sign-up`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    // Fetch blog posts for dynamic routes
    let blogRoutes: MetadataRoute.Sitemap = [];
    
    try {
        if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
            const supabase = createClient(
                process.env.SUPABASE_URL,
                process.env.SUPABASE_SERVICE_ROLE_KEY
            );

            // Use the same query as the API route
            const { data: blogPosts, error } = await supabase
                .from("blog_posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Supabase fetch error in sitemap:", error);
            } else if (blogPosts && Array.isArray(blogPosts)) {
                blogRoutes = blogPosts
                    .filter((post) => post.slug) // Only include posts with a slug
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map((post: any) => {
                        // Handle date - use updated_at if available, otherwise created_at, otherwise current date
                        let lastModified = new Date();
                        if (post.updated_at) {
                            lastModified = new Date(post.updated_at);
                        } else if (post.created_at) {
                            lastModified = new Date(post.created_at);
                        }

                        return {
                            url: `${baseUrl}/blog/${post.slug}`,
                            lastModified,
                            changeFrequency: "weekly" as const,
                            priority: 0.7,
                        };
                    });
            }
        } else {
            console.warn("Supabase credentials not found, skipping blog routes in sitemap");
        }
    } catch (error) {
        console.error("Error fetching blog posts for sitemap:", error);
        // Continue without blog routes if there's an error
    }

    return [...staticRoutes, ...blogRoutes];
}