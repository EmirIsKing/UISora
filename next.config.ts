import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.experiments = { asyncWebAssembly: true, layers: true }; // ✅ Enable WASM

        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.('.svg'),
        )

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
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i


        return config;
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes
                source: "/api/:path*", // Match all API routes
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*", // Allow all origins (replace with your Figma plugin's origin for production)
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "POST", // Allow only POST requests
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type", // Allow only Content-Type header
                    },
                ],
            },
        ];
    },
};

export default nextConfig;