"use client"
import React,{useEffect} from 'react'
import Link from 'next/link';
import SignedIn from "@/components/SignedIn";
import {auth} from "@/utils/firebase";
import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import {IconFidgetSpinner} from '@tabler/icons-react'
import SignedOut from "@/components/Signed-out";
import { useRouter } from 'next/navigation'



const Page = () => {

    const router = useRouter();
    const [user, loading]   = useAuthState(auth);
    const [signOut] = useSignOut(auth)


    return (
        <div className={'bg-white h-screen flex flex-col items-center justify-center'}>
            <h1>Sign in here!!!!!</h1>
            {loading ? (
                <IconFidgetSpinner className={'animate-spin w-12 h-12 mx-auto'}/>
            ):(
                <>
                    <SignedIn>
                        <div className="flex flex-col text-primary-500">
                            <h1 className={'text-3xl font-bold'}>Signed in as</h1>
                            {user?.isAnonymous ? (
                                <p>Anonymous</p>
                            ) : (
                                <>
                                    <p>{user?.email}</p>
                                    <p>
                                        Email verified: {""}
                                        {user?.emailVerified ? (
                                            <span className={'text-green-500'}>Verified</span>
                                        ) : (
                                            <span className={'text-red-500'}>Not Verified</span>
                                        )}
                                    </p>
                                </>
                            )}
                            <button className={'text-red-500 font-bold'} onClick={signOut}>
                                Sign out
                            </button>
                        </div>
                    </SignedIn>
                </>
            )

            }
            <SignedOut>
            <Link href={'/sign-in'} className={'mr-4 underline'}>
                Sign In
            </Link>
                <Link href={'/sign-up'}  className={'mr-4 underline'}>
                    Create Account
                </Link>
            </SignedOut>
        </div>
    )
}
export default Page
