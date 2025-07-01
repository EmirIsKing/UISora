'use client'
import React from 'react'
import {  Dropdown,  DropdownTrigger,  DropdownMenu, DropdownItem} from "@heroui/dropdown";
import {Ellipsis} from 'lucide-react'
import {Button} from "@heroui/button";
import {ProjectSettings} from "@/types/types";
import {useRouter} from "next/navigation";


const ProjectItem = ({project}:{project:{id:string; settings: ProjectSettings}}) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/projects/${project.id}`);
    }

    return (
        <div onClick={()=>handleClick()}  className={`flex flex-col w-[190px] h-[150px] shadow-xl border border-slate-400/60 rounded-sm bg-white px-1 py-3 cursor-pointer`}>
            <div className="flex justify-end">
                <Dropdown className={'bg-black/80 rounded-lg w-30'}>
                    <DropdownTrigger asChild>
                        <Button className={'rounded-sm border px-1 border-slate-400/70 cursor-pointer'}>
                            <Ellipsis />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                            key="delete"
                            className={`w-full text-white flex items-center gap-2 px-1 py-1 hover:bg-red-800/70 bg-red-800/80 
                            rounded-md transition-all`}
                            color="danger"
                        >
                            <span className="text-sm font-medium leading-none">Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div>
                <h1 className={`text-xl font-semibold text-wrap truncate`}>
                    {project.settings.projectName ? project.settings.projectName : "No name"}
                </h1>
                <p className={`text-wrap truncate`}>{project.settings.description ? project.settings.description : "No Description"}</p>
            </div>
        </div>
    )
}
export default ProjectItem
