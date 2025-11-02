'use client'
import React from 'react'
//import DashboardTabs from "@/components/DashboardTabs";
import UserProfile from "@/components/auth/UserProfile";
import FeedbackButton from './FeedbackButton';
import { SimpleThemeToggle } from '@/components/ThemeToggle';
import Notification from './Notification';


const DashboardNavigationBar = () => {
    return (
        <div className={'flex w-full py-2 px-2 items-center justify-center'}>
            <div className={`w-[80%] flex justify-center items-center`}>
                {/* <DashboardTabs/> */}
            </div>
            <div className={'w-auto flex gap-3 max-md:gap-1 justify-end items-center'}>
                <Notification/>
                <SimpleThemeToggle />
                <FeedbackButton/>
                <UserProfile />
            </div>
        </div>
    )
}
export default DashboardNavigationBar
