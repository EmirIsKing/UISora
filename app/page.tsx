"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import NavBar from '@/components/landingPage/NavBar'
import Hero from '@/components/landingPage/Hero'

const Page = () => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) {
           // router.push('/dashboard/projects');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return null; // Will redirect to dashboard
    }

    return (
        <div className="min-h-screen">
        <NavBar/>
        <Hero/>
        
        </div>
    );
}

export default Page
