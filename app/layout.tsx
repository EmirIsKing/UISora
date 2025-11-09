import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "UISora – AI Mobile UI Generator",
    template: "%s | UISora",
  },
  description:
    "Generate beautiful mobile app UIs from plain English. Create flows, export code and assets, and iterate fast with AI.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "UISora – AI Mobile UI Generator",
    description:
      "Generate beautiful mobile app UIs from plain text. Create flows, export code and assets, and iterate fast with AI.",
    siteName: "UISora",
    images: [
      { url: "/uisora-og.png", width: 1200, height: 630, alt: "UISora" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UISora – AI Mobile UI Generator",
    description:
      "Generate beautiful mobile app UIs from plain English. Create flows, export code and assets, and iterate fast with AI.",
    images: ["/uisora-og.png"],
    creator: "@uisora",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased h-screen`}
      >
        <Analytics/>
        <SpeedInsights/>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
          <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-8VN6NBHB2E`}
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8VN6NBHB2E', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <AnalyticsProvider/>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
