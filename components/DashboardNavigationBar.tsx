import React from 'react'
import DashboardTabs from "@/components/DashboardTabs";

const DashboardNavigationBar = () => {
    return (
        <div className={'flex w-full py-2 px-2 items-center justify-center'}>
            <DashboardTabs/>
        </div>
    )
}
export default DashboardNavigationBar
