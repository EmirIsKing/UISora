'use client'
import React, {useEffect, useState} from 'react'
import DashboardTabs from "@/components/DashboardTabs";
import UserProfile from "@/components/auth/UserProfile";


const DashboardNavigationBar = () => {
    return (
        <div className={'flex w-full py-2 px-2 items-center justify-center'}>
            <div className={`w-[80%] flex justify-center items-center`}>
                <DashboardTabs/>
            </div>
            <div className={'w-auto justify-end items-center'}>
                <UserProfile />
            </div>
        </div>
    )
}
export default DashboardNavigationBar
