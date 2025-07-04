'use client'
import React, {useState} from 'react'
import {  Dropdown,  DropdownTrigger,  DropdownMenu, DropdownItem} from "@heroui/dropdown";
import {Ellipsis} from 'lucide-react'
import {Button} from "@heroui/button";
import {ProjectSettings} from "@/types/types";
import {useRouter} from "next/navigation";
import {deleteProject} from "@/actions/deleteProject";
import { auth } from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {getProjectDetails} from "@/actions/getProjectDetails";


const ProjectItem = ({project, allProjects, setProjects}:{project:{id:string; settings: ProjectSettings}; allProjects:any; setProjects:any}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)


    const handleClick = () => {
        router.push(`/project/${project.id}`);
    }



    const handleDelete = async (projectId: string) => {

        const user = auth.currentUser;
        if (!user) return console.error("Not logged in");

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    setLoading(true)
                    await deleteProject(user.uid, projectId);
                    const updatedProjectsArray = allProjects.filter((project:any) => project.id !== projectId);
                    setProjects(updatedProjectsArray);
                    setLoading(false)
                    alert("Project deleted!");
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.error("User not authenticated");
            }
        });

        return () => unsubscribe();
    };

    return (
        <div onClick={()=>handleClick()}  className={`flex flex-col w-[190px] h-[150px] shadow-xl border border-slate-400/60 rounded-sm bg-white px-1 py-3 cursor-pointer`}>
            <div className="flex justify-end">
                <Dropdown className={'bg-black/80 rounded-lg w-30'}>
                    <DropdownTrigger asChild>
                        <Button className={'rounded-sm border h-6 px-1 flex justify-center items-center border-slate-400/70 cursor-pointer'}>
                            <Ellipsis />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                            key="delete"
                            className={`w-full text-white flex items-center gap-2 px-1 py-1 hover:bg-red-800/70 bg-red-800/80 
                            rounded-md transition-all`}
                            color="danger"
                            onPress={()=>handleDelete(project.id)}
                        >
                            <span className="text-sm font-medium leading-none">{loading ?'loading...':'Delete'}</span>
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
