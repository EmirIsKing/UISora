'use client'
import React, {useState, useEffect} from 'react'
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {PanelLeftCloseIcon, PanelLeftOpen} from "lucide-react";
import {Button} from "@heroui/button";
import {useExportModal} from "@/store/store";
import {useRouter} from "next/navigation";
import ProjectSettings from "@/components/ProjectSettings";
import {getProjectDetails, ProjectSettingsWithId} from "@/actions/getProjectDetails";
import { auth } from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserCredits } from '@/actions/getUserCredit';


const ProjectPageNavigation = ({sidebarToggle, setSidebarToggle, projectId}:{sidebarToggle: boolean; setSidebarToggle: (open: boolean) => void; projectId: string;}) => {

    const router = useRouter();
    const [toggleProject, setToggleProject] = useState(false);
    const [projectDetails, setProjectDetails] = useState<ProjectSettingsWithId | null>(null)
    const [projectName, setProjectName] = useState<string>('Loading...');
    const [credits, setCredits] = useState<number | null>(0);
    const user = auth.currentUser;

    const toggleExportModal = () => {
        useExportModal.getState().setExportModal(!useExportModal.getState().exportModal);
        console.log(useExportModal.getState().exportModal)
    }

    useEffect(() => {
        if (projectDetails?.settings.projectName) {
            setProjectName(projectDetails.settings.projectName);
        }
    }, [projectDetails]);

    useEffect(() => {
        getUserCredits().then((credits) => {
            setCredits(credits);
        });
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const temp = await getProjectDetails(user?.uid, projectId);
                    setProjectDetails(temp);
                } catch (error) {
                    console.error("Error fetching project:", error);
                }
            } else {
                console.error("User not authenticated");
            }
        });

        return () => unsubscribe(); // cleanup on unmount
    }, [projectId]);





    const handleGotoDashboard = () => {
        router.push(`/dashboard/projects`);
    }

    const handleProjectSettings = () => {
        setToggleProject(!toggleProject)
    }


    return (
        <div className={'h-12  flex items-center text-white bg-[#303030] px-4 z-[3000] shadow-lg'}>
            <div className={'flex'}>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <button className="px-4 flex py-2 rounded-md outline-0 hover:opacity-75 transition-all cursor-pointer">
                                {projectName ? <span className='truncate w-40 max-md:w-20 overflow-hidden whitespace-nowrap block'>{projectName}</span> :'Loading...'} ∨
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent  className="w-56 bg-slate-900 border opacity-100 z-[4000] border-slate-100/90 text-slate-100/90">
                            <DropdownMenuItem disabled={true}>
                                Credits remaining: 
                                <span className='font-bold text-green-500'>{credits}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100/90 h-px" />
                            <DropdownMenuItem  onClick={()=>handleProjectSettings()} className="hover:bg-slate-800/90 bg-slate-900">
                                Project Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={()=>handleGotoDashboard()} className="hover:bg-slate-800/90">
                                Go to Dashboard
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                <button
                    className={'p-1 hover:bg-slate-100/25 rounded-md transition-all cursor-pointer'}
                    onClick={()=>setSidebarToggle(!sidebarToggle)}>{sidebarToggle ? (<PanelLeftCloseIcon />) : (<PanelLeftOpen/>)}
                </button>
            </div>
            <div className={'flex justify-end flex-1 items-end'}>
                    <Button onPress={()=>toggleExportModal()} className={'border border-white text-white rounded-full px-2 cursor-pointer hover:px-3 transition-all ease-in-out duration-300'}>
                        Export
                    </Button>
            </div>
            {
                toggleProject && (
                    <ProjectSettings toggleSettings={handleProjectSettings} setProjectNameOptimistic={setProjectName} projectDetails={projectDetails}/>
                )
            }

        </div>
    )
}
export default ProjectPageNavigation
