'use client'
import React, {useState, useEffect} from 'react'
import DashboardTabs from "@/components/DashboardTabs";
import {auth} from '@/utils/firebase'
import {useAuthState} from "react-firebase-hooks/auth";
import Image from "next/image"
import {IconFidgetSpinner} from '@tabler/icons-react'




const DashboardNavigationBar = () => {

    const [user, loading] = useAuthState(auth);

    return (
        <div className={'flex w-full py-2 px-2 items-center justify-center'}>
            <div className={`w-[80%] flex justify-center items-center`}>
                <DashboardTabs/>
            </div>
            {
                loading ? (<div
                        className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"
                        aria-label="Loading..."
                        role="status"
                    />):
                    (
                        <div className={'w-auto justify-end items-center'}>
                            {
                                user?.photoURL ?
                                    (<button>
                                        <Image alt={'profile'} src={user?.photoURL} width={24} height={24} className={'object-cover'}/>
                                    </button>) : (
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 text-white text-xl font-medium hover:cursor-default">
                                            {user?.email?.[0]?.toUpperCase()}
                                        </div>
                                    )
                            }
                        </div>
                    )
            }
        </div>
    )
}
export default DashboardNavigationBar
