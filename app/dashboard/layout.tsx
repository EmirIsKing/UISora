import type { Metadata} from "next";
import '../globals.css'
import React from "react";
import DashboardNavigationBar from "@/components/DashboardNavigationBar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";


export const metadata: Metadata = {
    title: "Dashboard",
    description: "Manage projects, credits, and generate new UIs.",
    robots: { index: false, follow: false },
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRoute>
            <section
                className={`antialiased h-screen flex flex-col flex-1`}
            >
                <DashboardNavigationBar/>
            <div className={`flex flex-1 h-screen w-screen justify-center`}>
                {children}
            </div>
            </section>
        </ProtectedRoute>
    );
}
