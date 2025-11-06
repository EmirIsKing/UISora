import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "15mb", // ✅ limit increased
        },
    },

    images: {
        remotePatterns: [
           {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "lnxcwetddttciyo1.public.blob.vercel-storage.com",
            },
            {
                protocol: "https",
                hostname: "example.com",
            },
        ],
    },

    webpack: (config) => {
        config.experiments = { asyncWebAssembly: true, layers: true };

        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.(".svg")
        );

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
                use: ["@svgr/webpack"],
            }
        );

        // Modify the file loader rule to ignore *.svg
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },

    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "POST, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
