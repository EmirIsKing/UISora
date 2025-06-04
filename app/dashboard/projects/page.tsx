import React from 'react'
import CreateNewProject from "@/components/CreateNewProject";
import ProjectItem from "@/components/ProjectItem";
import {Spinner} from '@heroui/spinner'

const Page = () => {
    return (
        <div className={`w-[90%] max-md:w-full rounded-t-lg border-t border-l 
        border-r border-slate-500/20 h-full px-7  max-md:px-2 pt-4 flex flex-col gap-4`}
        >
            <h1 className={'font-semibold text-2xl'}>Projects</h1>
            <div className={`flex`}>
                <CreateNewProject />
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r
            from-white from-30% via-black via-40% to-white to-70% "></div>
            <div className={`w-full gap-2 flex flex-wrap overflow-y-auto pb-3`}>
                <ProjectItem/>
               <ProjectItem/>
                <ProjectItem/>
                <ProjectItem/>
            </div>

        </div>
    )
}
export default Page
