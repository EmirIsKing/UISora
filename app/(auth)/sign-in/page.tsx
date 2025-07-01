'use client'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import {useSignInWithEmailAndPassword, useAuthState} from "react-firebase-hooks/auth";
import {auth} from '@/utils/firebase'



const Page = () => {
    const router = useRouter();
    const [signInUserWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [user]= useAuthState(auth);

    useEffect(() => {
        if (user) {
            router.push("/dashboard/projects")
        }
    }, [user]);


    const onSubmit = async () => {
        await signInUserWithEmailAndPassword(email, password);
        router.push("/dashboard/projects")

    }

    return (
        <div className={'bg-white flex flex-col items-center justify-center'}>
            <h1>Sign in</h1>
            <input
                type={'text'}
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                placeholder={'Email'}
                className={'text-xl px-4 py-2 rounded-md border border-gray-300 mb-4'}
            />
            <input
                type={'password'}
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                placeholder={'Password'}
                className={'text-xl px-4 py-2 rounded-md border border-gray-300 mb-4'}
            />
            <button className={'bg-yellow-500 text-black px-4 py-2 rounded-md font-bold'}
                    onClick={onSubmit}
            >
                Sign In
            </button>
        </div>
    )
}
export default Page
