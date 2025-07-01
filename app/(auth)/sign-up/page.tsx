'use client'
import React, {useEffect, useState} from 'react'
import {auth} from '@/utils/firebase'
import { useRouter } from 'next/navigation'
import {useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification} from "react-firebase-hooks/auth";

const Page = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [createUser] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const [user]= useAuthState(auth);


    useEffect(() => {
        if (user) {
            router.push("/dashboard/projects")
        }
    }, [user]);

    const onSubmit = async () => {
        await createUser(email, password);
        await sendEmailVerification();
        router.push("/dashboard/projects")

    }

    return (
        <div className={'bg-white flex flex-col items-center justify-center'}>
            <h1>Create Account</h1>
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
                Sign Up
            </button>
        </div>
    )
}
export default Page
