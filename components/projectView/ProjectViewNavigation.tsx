'use client';

import React, { useState, useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { PanelLeftCloseIcon, PanelLeftOpen } from 'lucide-react';
import { Button } from '@heroui/button';
import { useExportModal } from '@/store/store';
import { useRouter } from 'next/navigation';
import { getProjectViewDetails } from '@/components/projectView/actions/getProjectViewDetails';

interface ProjectSettingsMod {
    id: string;
    settings: { description: string; projectName: string; visibility: string };
    blobUrl: string;
}

interface ProjectViewNavigationProps {
    sidebarToggle: boolean;
    setSidebarToggle: (open: boolean) => void;
    projectId: string;
}

const ProjectViewNavigation = ({
                                   sidebarToggle,
                                   setSidebarToggle,
                                   projectId,
                               }: ProjectViewNavigationProps) => {
    const router = useRouter();
    const [projectDetails, setProjectDetails] = useState<ProjectSettingsMod | { error: string }>();
    const [projectName, setProjectName] = useState<string>('Loading...');
    const [error, setError] = useState<string | null>(null);

    const toggleExportModal = () => {
        const current = useExportModal.getState().exportModal;
        useExportModal.getState().setExportModal(!current);
    };

    // Update project name when details are fetched
    useEffect(() => {
        // Check if projectDetails exists and isn't an error object
        if (!projectDetails || "error" in projectDetails) return;

        if (projectDetails.settings?.projectName) {
            setProjectName(projectDetails.settings.projectName);
        }
    }, [projectDetails]);


    // Fetch project details
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const temp = await getProjectViewDetails(projectId);

                if (!temp) {
                    setError('Project not found.');
                    setProjectName('Not Found');
                    router.push("/sign-in")
                    return;
                }

                if (!temp || "error" in temp) {
                    setError("Project not found or could not be loaded.");
                    setProjectName("Private Project");
                    router.push("/sign-in")
                    return;
                }

                if (temp.settings?.visibility !== "public" && !temp.blobUrl) {
                    setError("Project is private or cannot be viewed.");
                    setProjectName("Private Project");
                    router.push("/sign-in")
                    return;
                }


                setProjectDetails(temp);
            } catch (err) {
                console.error('Error fetching project:', err);
                setError('Failed to load project.');
                setProjectName('Error Loading');
                router.push("/sign-in")
            }
        };

        if (projectId) fetchProject();
    }, [projectId]);

    const handleGotoDashboard = () => {
        router.push(`/dashboard/projects`);
    };

    return (
        <div className="h-12 flex items-center text-white bg-[#303030] px-4 z-[3000] shadow-lg">
            <div className="flex">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="px-4 flex py-2 rounded-md outline-0 hover:opacity-75 transition-all cursor-pointer">
              <span className="truncate w-40 max-md:w-20 overflow-hidden whitespace-nowrap block">
                {projectName}
              </span>{' '}
                            ∨
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-slate-900 border opacity-100 z-[4000] border-slate-100/90 text-slate-100/90">
                        <DropdownMenuItem
                            onClick={handleGotoDashboard}
                            className="hover:bg-slate-800/90"
                        >
                            Go to Dashboard
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <button
                    className="p-1 hover:bg-slate-100/25 rounded-md transition-all cursor-pointer"
                    onClick={() => setSidebarToggle(!sidebarToggle)}
                >
                    {sidebarToggle ? <PanelLeftCloseIcon /> : <PanelLeftOpen />}
                </button>
            </div>

            <div className="flex justify-end flex-1 items-end">
                <Button
                    onPress={toggleExportModal}
                    className="border border-white text-white rounded-full px-2 cursor-pointer hover:px-3 transition-all ease-in-out duration-300"
                    isDisabled={!!error}
                >
                    Export
                </Button>
            </div>
        </div>
    );
};

export default ProjectViewNavigation;
