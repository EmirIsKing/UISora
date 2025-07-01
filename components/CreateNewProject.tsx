'use client'
import React from 'react'
import {Plus} from 'lucide-react'
import {Button} from "@heroui/button";
import { v4 as uuidv4 } from 'uuid';
import {useRouter} from "next/navigation";
import {createNewProject} from '@/actions/createNewProject'

const CreateNewProject = () => {
    const router = useRouter();

    const handleCreateProject  = async () => {
        const newProjectId = await createNewProject();
        console.log('New Project ID:', newProjectId);
        router.push(`/project/${newProjectId}`);
    };


    return (
        <Button onPress={()=>handleCreateProject()} className={`flex flex-col justify-center items-center w-[190px] h-[150px]
        rounded-sm bg-purple-blue p-3 cursor-pointer text-white hover:bg-purple-blue/90
        transition-all duration-300 shadow-lg max-md:w-full max-md:h-[70px]`}>
            <div className={`w-8 h-8 border-2 rounded-full flex justify-center items-center border-dashed 
            border-white
            `}>
                <Plus/>
            </div>
            <span>Create New Project</span>
        </Button>
    )
}
export default CreateNewProject
